'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Question = {
  id: string
  sentence: string        // 'Я иду в ___ (магазин)'
  blankHint: string       // hint in parens, shown in sentence
  options: string[]       // 4 choices
  correctIndex: number
  explanation: string     // shown after answer
}

type TopicData = {
  title: string
  icon: string
  questions: Question[]
}

const gameData: Record<string, TopicData> = {
  'gender-nouns': {
    title: 'İsimlerin Cinsiyeti',
    icon: '⚧',
    questions: [
      {
        id: 'g1',
        sentence: '___ (стол) стоит у окна.',
        blankHint: 'стол',
        options: ['Новый', 'Новая', 'Новое', 'Новые'],
        correctIndex: 0,
        explanation: '«стол» — eril isim, eril sıfat «новый» kullanılır.',
      },
      {
        id: 'g2',
        sentence: '___ (книга) лежит на столе.',
        blankHint: 'книга',
        options: ['Красивый', 'Красивая', 'Красивое', 'Красивые'],
        correctIndex: 1,
        explanation: '«книга» — dişil isim, dişil sıfat «красивая» kullanılır.',
      },
      {
        id: 'g3',
        sentence: '___ (окно) открыто.',
        blankHint: 'окно',
        options: ['Большой', 'Большая', 'Большое', 'Большие'],
        correctIndex: 2,
        explanation: '«окно» — nötr isim, nötr sıfat «большое» kullanılır.',
      },
      {
        id: 'g4',
        sentence: '___ (день) был длинным.',
        blankHint: 'день',
        options: ['Трудный', 'Трудная', 'Трудное', 'Трудные'],
        correctIndex: 0,
        explanation: '«день» — -ь ile biter ama erildir, «трудный» kullanılır.',
      },
      {
        id: 'g5',
        sentence: '___ (кошка) спит на диване.',
        blankHint: 'кошка',
        options: ['Пушистый', 'Пушистая', 'Пушистое', 'Пушистые'],
        correctIndex: 1,
        explanation: '«кошка» — dişil isim, «пушистая» kullanılır.',
      },
    ],
  },
  'genitive': {
    title: 'İlgi Hâli',
    icon: '②',
    questions: [
      {
        id: 'r1',
        sentence: 'У меня нет ___ (книга).',
        blankHint: 'книга → ?',
        options: ['книга', 'книги', 'книге', 'книгу'],
        correctIndex: 1,
        explanation: 'нет + ilgi hâli: книга → книги (dişil, -а → -ы)',
      },
      {
        id: 'r2',
        sentence: 'Стакан ___ (вода) стоит на столе.',
        blankHint: 'вода → ?',
        options: ['вода', 'воды', 'воде', 'воду'],
        correctIndex: 1,
        explanation: 'bir şeyin bardağı → ilgi hâli: вода → воды',
      },
      {
        id: 'r3',
        sentence: 'Много ___ (студент) в библиотеке.',
        blankHint: 'студент → ?',
        options: ['студент', 'студента', 'студенте', 'студентов'],
        correctIndex: 3,
        explanation: 'много + ilgi hâli çoğul: студент → студентов',
      },
      {
        id: 'r4',
        sentence: 'Без ___ (друг) скучно.',
        blankHint: 'друг → ?',
        options: ['друг', 'друга', 'другу', 'другом'],
        correctIndex: 1,
        explanation: 'без + ilgi hâli: друг → друга (eril, + -а)',
      },
      {
        id: 'r5',
        sentence: 'Я боюсь ___ (темнота).',
        blankHint: 'темнота → ?',
        options: ['темнота', 'темноты', 'темноте', 'темноту'],
        correctIndex: 1,
        explanation: 'бояться + ilgi hâli: темнота → темноты',
      },
    ],
  },
  'accusative': {
    title: 'Belirtme Hâli',
    icon: '④',
    questions: [
      {
        id: 'a1',
        sentence: 'Я читаю ___ (книга).',
        blankHint: 'книга → ?',
        options: ['книга', 'книги', 'книге', 'книгу'],
        correctIndex: 3,
        explanation: 'читать + belirtme hâli: книга → книгу (dişil -а → -у)',
      },
      {
        id: 'a2',
        sentence: 'Мы идём в ___ (школа).',
        blankHint: 'школа → ?',
        options: ['школа', 'школы', 'школе', 'школу'],
        correctIndex: 3,
        explanation: 'в + yön (belirtme hâli): школа → школу',
      },
      {
        id: 'a3',
        sentence: 'Я вижу ___ (брат).',
        blankHint: 'брат → ?',
        options: ['брат', 'брата', 'брату', 'братом'],
        correctIndex: 1,
        explanation: 'видеть + canlı eril belirtme: брат → брата',
      },
      {
        id: 'a4',
        sentence: 'Она любит ___ (музыка).',
        blankHint: 'музыка → ?',
        options: ['музыка', 'музыки', 'музыке', 'музыку'],
        correctIndex: 3,
        explanation: 'любить + belirtme hâli: музыка → музыку',
      },
      {
        id: 'a5',
        sentence: 'Дети смотрят ___ (фильм).',
        blankHint: 'фильм → ?',
        options: ['фильм', 'фильма', 'фильме', 'фильму'],
        correctIndex: 0,
        explanation: 'Cansız eril belirtme hâli yalın hâl ile aynı: фильм',
      },
    ],
  },
  'verb-conjugation': {
    title: 'Fiil Çekimi',
    icon: '▶',
    questions: [
      {
        id: 'v1',
        sentence: 'Я ___ (читать) книгу каждый день.',
        blankHint: 'читать → я',
        options: ['читаю', 'читаешь', 'читает', 'читаем'],
        correctIndex: 0,
        explanation: 'я + читать → читаю (1. tekil şahıs)',
      },
      {
        id: 'v2',
        sentence: 'Ты ___ (говорить) по-русски?',
        blankHint: 'говорить → ты',
        options: ['говорю', 'говоришь', 'говорит', 'говорим'],
        correctIndex: 1,
        explanation: 'ты + говорить → говоришь (2. tekil şahıs)',
      },
      {
        id: 'v3',
        sentence: 'Они ___ (работать) в офисе.',
        blankHint: 'работать → они',
        options: ['работаю', 'работаешь', 'работает', 'работают'],
        correctIndex: 3,
        explanation: 'они + работать → работают (3. çoğul şahıs)',
      },
      {
        id: 'v4',
        sentence: 'Мы ___ (учиться) каждый день.',
        blankHint: 'учиться → мы',
        options: ['учусь', 'учишься', 'учится', 'учимся'],
        correctIndex: 3,
        explanation: 'мы + учиться → учимся (1. çoğul şahıs)',
      },
      {
        id: 'v5',
        sentence: 'Она ___ (писать) письмо.',
        blankHint: 'писать → она',
        options: ['пишу', 'пишешь', 'пишет', 'пишем'],
        correctIndex: 2,
        explanation: 'она + писать → пишет (3. tekil şahıs)',
      },
    ],
  },
  'pronouns': {
    title: 'Kişi Zamirleri',
    icon: '👤',
    questions: [
      {
        id: 'p1',
        sentence: '___ студент и учусь в университете.',
        blankHint: 'Ben',
        options: ['Я', 'Ты', 'Он', 'Мы'],
        correctIndex: 0,
        explanation: '«Ben» → Я',
      },
      {
        id: 'p2',
        sentence: '___ говоришь по-турецки?',
        blankHint: 'Sen',
        options: ['Я', 'Ты', 'Она', 'Они'],
        correctIndex: 1,
        explanation: '«Sen» → Ты',
      },
      {
        id: 'p3',
        sentence: '___ живём в Стамбуле.',
        blankHint: 'Biz',
        options: ['Я', 'Вы', 'Мы', 'Они'],
        correctIndex: 2,
        explanation: '«Biz» → Мы',
      },
      {
        id: 'p4',
        sentence: '___ — мой друг. Его зовут Алекс.',
        blankHint: 'O (erkek)',
        options: ['Он', 'Она', 'Оно', 'Они'],
        correctIndex: 0,
        explanation: '«O» (erkek) → Он',
      },
      {
        id: 'p5',
        sentence: '___ работают в больнице.',
        blankHint: 'Onlar',
        options: ['Мы', 'Вы', 'Они', 'Он'],
        correctIndex: 2,
        explanation: '«Onlar» → Они',
      },
    ],
  },
}

const FALLBACK: TopicData = {
  title: 'Genel Alıştırma',
  icon: '🎮',
  questions: [
    {
      id: 'f1',
      sentence: 'Привет! Как ___ (дела)?',
      blankHint: 'дела',
      options: ['твой', 'твои', 'твоя', 'твоё'],
      correctIndex: 1,
      explanation: '«дела» çoğul nötr → «твои»',
    },
  ],
}

type AnswerState = 'idle' | 'correct' | 'wrong'

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.topicId as string

  const topic = gameData[topicId] ?? FALLBACK
  const questions = topic.questions

  const [current, setCurrent] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [score, setScore] = useState(0)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const q = questions[current]

  const handleAnswer = useCallback(
    (idx: number) => {
      if (answerState !== 'idle') return

      setSelectedIndex(idx)
      const isCorrect = idx === q.correctIndex

      if (isCorrect) {
        setAnswerState('correct')
        setScore((s) => s + 10)
      } else {
        setAnswerState('wrong')
        setHearts((h) => {
          const next = h - 1
          if (next <= 0) {
            setTimeout(() => setGameOver(true), 900)
          }
          return next
        })
      }
      setShowExplanation(true)
    },
    [answerState, q]
  )

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setAnswerState('idle')
      setSelectedIndex(null)
      setShowExplanation(false)
    }
  }, [current, questions.length])

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleAnswer(parseInt(e.key) - 1)
      }
      if (e.key === 'Enter' && answerState !== 'idle') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleAnswer, handleNext, answerState])

  const bgClass =
    answerState === 'correct'
      ? 'bg-green-950/30'
      : answerState === 'wrong'
      ? 'bg-red-950/30'
      : ''

  if (gameOver) {
    return <EndScreen type="gameover" score={score} topicId={topicId} total={questions.length} />
  }
  if (finished) {
    return <EndScreen type="win" score={score} topicId={topicId} total={questions.length} />
  }

  return (
    <div className={`min-h-full transition-colors duration-300 ${bgClass}`}>
      {/* Top bar */}
      <header className="glass border-b border-white/8 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/library" className="text-slate-500 hover:text-white transition-colors text-sm">
            ← Çık
          </Link>

          {/* Hearts */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`text-xl transition-all duration-300 ${
                  i < hearts ? 'opacity-100 scale-100' : 'opacity-20 scale-90 grayscale'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>

          {/* Score */}
          <div className="bg-yellow-100 text-yellow-700 font-bold text-sm px-3 py-1 rounded-full">
            ⭐ {score}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-white/6">
        <div
          className="h-full bg-violet-500 transition-all duration-500"
          style={{ width: `${((current + (answerState !== 'idle' ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Topic label */}
        <div className="text-center">
          <span className="text-2xl">{topic.icon}</span>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{topic.title}</p>
          <p className="text-gray-300 text-xs mt-0.5">
            {current + 1} / {questions.length}
          </p>
        </div>

        {/* Sentence card */}
        <div
          className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
            answerState === 'correct'
              ? 'border-green-500/50 bg-green-950/20'
              : answerState === 'wrong'
              ? 'border-red-500/50 bg-red-950/20'
              : 'border-white/8 bg-white/4 backdrop-blur-md'
          }`}
        >
          <p className="text-center text-gray-500 text-xs uppercase tracking-wide mb-3">
            Boşluğu doldurun
          </p>
          <SentenceDisplay sentence={q.sentence} answerState={answerState} selectedOption={selectedIndex !== null ? q.options[selectedIndex] : null} correctOption={q.options[q.correctIndex]} />

          {/* Feedback flash */}
          {answerState !== 'idle' && (
            <div
              className={`mt-4 text-center text-lg font-bold animate-bounce-once ${
                answerState === 'correct' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {answerState === 'correct' ? '✓ Doğru!' : '✗ Yanlış!'}
            </div>
          )}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`rounded-xl px-4 py-3 text-sm text-center transition-all border ${
              answerState === 'correct'
                ? 'bg-green-950/30 border-green-500/20 text-green-300'
                : 'bg-red-950/30 border-red-500/20 text-red-300'
            }`}
          >
            💡 {q.explanation}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt, idx) => {
            let style =
              'glass glass-hover border-white/10 text-slate-300 hover:text-white'

            if (answerState !== 'idle') {
              if (idx === q.correctIndex) {
                style = 'bg-green-500/80 border-2 border-green-400 text-white shadow-lg shadow-green-900/40 scale-105'
              } else if (idx === selectedIndex && selectedIndex !== q.correctIndex) {
                style = 'bg-red-500/80 border-2 border-red-400 text-white animate-shake'
              } else {
                style = 'bg-white/3 border-white/5 text-slate-600 cursor-default'
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={answerState !== 'idle'}
                className={`relative rounded-xl py-4 px-3 font-semibold text-base transition-all duration-200 ${style}`}
              >
                <span className="absolute top-1.5 left-2.5 text-xs opacity-40 font-normal">
                  {idx + 1}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Next button */}
        {answerState !== 'idle' && (
          <button
            onClick={handleNext}
            className="w-full bg-violet-600/80 hover:bg-violet-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-violet-900/40"
          >
            {current + 1 >= questions.length ? 'Bitir →' : 'Devam Et →'}
            <span className="ml-2 text-xs opacity-60">(Enter)</span>
          </button>
        )}
      </div>
    </div>
  )
}

function SentenceDisplay({
  sentence,
  answerState,
  selectedOption,
  correctOption,
}: {
  sentence: string
  answerState: AnswerState
  selectedOption: string | null
  correctOption: string
}) {
  const parts = sentence.split('___')
  const before = parts[0]
  const after = parts[1] ?? ''

  const blankContent =
    answerState === 'idle' ? (
      <span className="inline-block border-b-2 border-dashed border-slate-500 w-20 mx-1 align-bottom" />
    ) : (
      <span
        className={`inline-block font-bold px-2 py-0.5 rounded mx-1 transition-all ${
          answerState === 'correct'
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300 line-through'
        }`}
      >
        {selectedOption}
        {answerState === 'wrong' && (
          <span className="ml-2 text-green-700 no-underline line-through-0 font-bold">
            → {correctOption}
          </span>
        )}
      </span>
    )

  return (
    <p className="text-xl text-center text-slate-100 leading-relaxed font-medium">
      {before}
      {blankContent}
      {after}
    </p>
  )
}

function EndScreen({
  type,
  score,
  topicId,
  total,
}: {
  type: 'win' | 'gameover'
  score: number
  topicId: string
  total: number
}) {
  const isWin = type === 'win'
  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="glass border border-white/10 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">{isWin ? '🏆' : '💔'}</div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {isWin ? 'Tebrikler!' : 'Oyun Bitti'}
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          {isWin
            ? `${total} soruyu tamamladınız!`
            : 'Canlarınız bitti. Tekrar deneyin!'}
        </p>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl py-4 mb-6">
          <p className="text-yellow-500/70 text-xs font-medium uppercase tracking-widest">Toplam Puan</p>
          <p className="text-4xl font-bold text-yellow-400 mt-1">⭐ {score}</p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/game/${topicId}`}
            className="block w-full bg-violet-600/80 hover:bg-violet-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Tekrar Oyna
          </Link>
          <Link
            href="/library"
            className="block w-full glass glass-hover text-slate-400 hover:text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Kitaplığa Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
