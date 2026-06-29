import { NextRequest, NextResponse } from 'next/server'

// ElevenLabs voice ID — "Matilda" (eleven_multilingual_v2, natural feminine Russian)
// You can swap this for any ElevenLabs voice that handles Russian well.
const VOICE_ID = 'XrExE9yKIg1WjnnlVkGX'

export async function POST(req: NextRequest) {
  const { text } = await req.json() as { text: string }

  if (!text?.trim()) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ELEVENLABS_API_KEY not set' }, { status: 500 })
  }

  const elRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    }
  )

  if (!elRes.ok) {
    const err = await elRes.text()
    return NextResponse.json({ error: err }, { status: elRes.status })
  }

  const audioBuffer = await elRes.arrayBuffer()
  return new NextResponse(audioBuffer, {
    status: 200,
    headers: { 'Content-Type': 'audio/mpeg' },
  })
}
