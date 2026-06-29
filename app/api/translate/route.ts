import { NextRequest, NextResponse } from 'next/server'

const FREE_MODELS = [
  'google/gemma-4-31b-it:free',
  'openai/gpt-oss-120b:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
]

const SYSTEM_PROMPT = `Sen Türk öğrenciler için profesyonel bir Rusça AI öğretmenisin. Görevin metni çevirmek ve gramerini analiz etmek.

YALNIZCA aşağıdaki formatta saf JSON döndür (markdown veya açıklama olmadan):
{
  "translatedText": "tam çevrilmiş metin",
  "words": [
    {
      "original": "kelime",
      "translated": "kelimenin Türkçe çevirisi",
      "pos": "konuşma bölümü (isim/fiil/sıfat/zamir/edat/zarf/bağlaç)",
      "analysis": "Bu kelimenin bu bağlamda neden bu formda olduğunun Türkçe açıklaması. Rusça grammatik kural belirt.",
      "libraryRef": "Blok X.X"
    }
  ]
}

libraryRef için kılavuz: Blok 1 (isimler, cinsiyet), Blok 2 (durumlar/падежи), Blok 3 (sıfatlar), Blok 4 (zamirler), Blok 5 (fiiller, çekim), Blok 6 (sözdizimi).`

async function callOpenRouter(apiKey: string, model: string, userPrompt: string): Promise<Response> {
  return fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Novgorod Gokay',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 2048,
    }),
  })
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Sunucu yapılandırma hatası: API anahtarı eksik.' }, { status: 500 })
  }

  let body: { text: string; direction: 'tr-ru' | 'ru-tr' }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 })
  }

  const { text, direction } = body
  if (!text?.trim()) {
    return NextResponse.json({ error: 'Metin boş olamaz.' }, { status: 400 })
  }

  const dirLabel = direction === 'tr-ru' ? 'Türkçe → Rusça' : 'Rusça → Türkçe'
  const userPrompt = `Yön: ${dirLabel}\nMetin: "${text.trim()}"\n\nMetni çevir ve her kelimeyi gramer açısından Türkçe analiz et. Sadece JSON döndür.`

  // Try each model in order; skip on 429
  let lastError = 'Tüm modeller meşgul. Lütfen 30 saniye sonra tekrar deneyin.'
  for (const model of FREE_MODELS) {
    let res: Response
    try {
      res = await callOpenRouter(apiKey, model, userPrompt)
    } catch (err) {
      console.error(`[translate] fetch error (${model}):`, err)
      continue
    }

    if (res.status === 429) {
      console.log(`[translate] ${model} rate-limited, trying next...`)
      continue
    }

    if (!res.ok) {
      const errText = await res.text()
      console.error(`[translate] ${model} error ${res.status}:`, errText)
      try {
        const parsed = JSON.parse(errText)
        const msg = parsed?.error?.message ?? ''
        if (msg.includes('rate-limit') || msg.includes('rate limited')) continue
        lastError = msg || lastError
      } catch {}
      continue
    }

    const data = await res.json()

    // Check if provider returned 429 inside a 200
    if (data?.error?.code === 429) {
      console.log(`[translate] ${model} inner 429, trying next...`)
      continue
    }

    const raw: string = data?.choices?.[0]?.message?.content ?? ''
    if (!raw) {
      lastError = 'Boş yanıt alındı.'
      continue
    }

    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    try {
      console.log(`[translate] success with ${model}`)
      return NextResponse.json(JSON.parse(cleaned))
    } catch {
      console.error(`[translate] JSON parse failed (${model}):`, raw.slice(0, 200))
      lastError = 'Yanıt işlenemedi. Tekrar deneyin.'
      continue
    }
  }

  return NextResponse.json({ error: lastError }, { status: 503 })
}
