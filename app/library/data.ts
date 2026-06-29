export type Example = {
  russian: string
  turkish: string
  note?: string
  association?: string  // mnemonic hint in Turkish
}

export type QuizQuestion = {
  question: string
  options: string[]
  correct: number
  type?: 'stress' | 'ending'  // default = multiple-choice
  stressWord?: string          // for type 'stress': the Russian word
}

export type Topic = {
  id: string
  number: string
  title: string
  explanation: string
  examples: Example[]
  quiz?: QuizQuestion[]
  specialComponent?: 'motionVerbs'
}

export type Block = {
  id: string
  level: string
  title: string
  topics: Topic[]
}

export const grammarBlocks: Block[] = [
  {
    id: 'blok1',
    level: 'A1.1',
    title: 'Temel Başlangıç',
    topics: [
      {
        id: '1-1',
        number: '1.1',
        title: 'Kiril Alfabesi ve Fonetik',
        explanation: `Rusça, Kiril alfabesini kullanır. Bu alfabe 33 harften oluşur: 10 sesli, 21 ünsüz ve 2 işaret harfi (ъ ve ь).

**Sesli harfler ve çift okuma:**
Rusçada sesli harfler çift çalışır: sert sesli (а, э, о, у, ы) ile yumuşak sesli (я, е, ё, ю, и). Bir ünsüzden sonra gelen я, е, ё, ю harfleri o ünsüzü "yumuşatır" — bu, Türkçede olmayan bir kavramdır.

**Akan (Аканье) kuralı:**
Vurgulanmayan О harfi А gibi okunur. Yani "молоко" (süt) kelimesi ağızdan "малако" gibi çıkar. Bu, Rusçanın en temel telaffuz kurallarından biridir ve kulağı alışmadan anlaşılmasını zorlaştırır.

**Ünsüzlerin sağırlaşması (Оглушение):**
Kelime sonunda veya sağır bir ünsüzden önce gelen sesli ünsüzler, sağır karşılaştırmalarına dönüşür:
• б → п (хлеб [хл'эп] — ekmek)
• в → ф (кровь [кроф'] — kan)
• г → к (друг [друк] — arkadaş)
• д → т (год [гот] — yıl)
• з → с (мороз [марос] — don, ayaz)
• ж → ш (нож [нош] — bıçak)

**Yumuşatma işareti (ь):**
Ь harfi okunmaz; sadece kendinden önceki ünsüzü yumuşatır. "Дверь" (kapı) kelimesinde son Р harfi yumuşak çıkar.

**Sertleştirme işareti (ъ):**
Ъ harfi ise sözcüğün içinde bir "duraklama" yaratır ve yumuşatma işlemini engeller. Ön ekli fiillerde sıkça görülür: "объяснить" (açıklamak).`,
        examples: [
          { russian: 'молоко', turkish: 'süt', note: '[малако] — О, А gibi okunur', association: '💡 "Mo-la-ko" — süt içince mola ver; O\'lar A\'ya akar!' },
          { russian: 'хлеб', turkish: 'ekmek', note: '[хл\'эп] — б sona gelince п olur', association: '💡 HLEP — son ses "b→p" sertleşir, ekmek gibi sert!' },
          { russian: 'друг', turkish: 'arkadaş', note: '[друк] — г kelime sonunda к', association: '💡 "Drug" ≠ ilaç! Arkadaş drog gibi bağımlılık yapar 😄' },
          { russian: 'год', turkish: 'yıl', note: '[гот] — д kelime sonunda т' },
          { russian: 'нож', turkish: 'bıçak', note: '[нош] — ж kelime sonunda ш' },
          { russian: 'дверь', turkish: 'kapı', note: 'ь → son р yumuşak okunur', association: '💡 "Dver" → kapıdan "d-ver" gibi gir; ь son sesi yumuşatır' },
          { russian: 'объяснить', turkish: 'açıklamak', note: 'ъ → yumuşatmayı engeller' },
          { russian: 'яблоко', turkish: 'elma', note: '[яблака] — iki О da akıyor', association: '💡 "Yablako" — elma ya da "Ya-bla-ko" şeklinde akar' },
        ],
        quiz: [
          { question: '"хлеб" kelimesi nasıl okunur?', options: ['[хлэб]', '[хлэп]', '[клэп]', '[хлэф]'], correct: 1 },
          { question: 'Hangi sesli harf vurgusuz pozisyonda А gibi okunur?', options: ['А', 'У', 'О', 'Э'], correct: 2 },
          { question: '"дверь" kelimesinde ь harfi ne işe yarar?', options: ['Оkunmaz ama R\'yi yumuşatır', 'D\'yi sertleştirir', 'Ayrı bir sesli harf üretir', 'Kelimeyi çoğul yapar'], correct: 0 },
        ],
      },
      {
        id: '1-2',
        number: '1.2',
        title: 'Vurgu ve Tonlama',
        explanation: `Rusçada vurgu (ударение), sözcüğün anlamını doğrudan değiştirebilir ve kurallı bir yeri yoktur — ezberlemek gerekir.

**Vurgu anlam farkı yaratır:**
Aynı harflerden oluşan kelimeler, vurgunun yerine göre tamamen farklı anlama gelir. Bu, Türkçede hemen hemen hiç rastlanmayan bir durumdur.

**Vurgunun sesliler üzerindeki etkisi:**
Vurgulu sesli harf uzun ve net okunur. Vurgusuz О ise "а" ya kayar (аканье). Vurgusuz Е ve Я da zayıflar: "е" → [и] gibi duyulur.

**Cümle tonlaması (Интонация):**
Rusçada cümle vurgusu da önemlidir. Soru cümlelerinde vurgu genellikle soru olan kelimeye düşer ve ses yükselir:
• Это Анна. (Bu Anna.) — düz ses
• Это Анна? (Bu Anna mı?) — Anna'da ses yükselir`,
        examples: [
          { russian: 'за́мок', turkish: 'kale, şato', note: 'vurgu birinci hecede', association: '💡 ZÁ-mok: vurgu BAŞTA → büyük şato, uzakta görünür!' },
          { russian: 'замо́к', turkish: 'kilit', note: 'vurgu ikinci hecede', association: '💡 za-MÓK: vurgu SONDA → kilit küçük, yakın bakman lazım' },
          { russian: 'а́тлас', turkish: 'atlas (harita kitabı)', note: 'vurgu а\'da' },
          { russian: 'атла́с', turkish: 'atlas (kumaş)', note: 'vurgu а\'da (sonda)' },
          { russian: 'мука́', turkish: 'un', note: 'vurgu sonda', association: '💡 mu-KÁ: vurgu SONDA → un ağır, yavaş yavaş akar' },
          { russian: 'му́ка', turkish: 'ıstırap, acı', note: 'vurgu başta', association: '💡 MÚ-ka: vurgu BAŞTA → acı hemen baş vurur!' },
          { russian: 'хо́ром', turkish: 'koronun, bütün sesin', note: 'vurgu başta' },
          { russian: 'хором́', turkish: 'hep bir ağızdan', note: 'zarfsal kullanım' },
        ],
        quiz: [
          { question: '"за́мок" ne anlama gelir?', options: ['Kilit', 'Kale, şato', 'Kapı', 'Pencere'], correct: 1 },
          { question: '"замо́к" ne anlama gelir?', options: ['Kale', 'Kapı', 'Kilit', 'Anahtar'], correct: 2 },
          { question: 'Rusçada vurgu hakkında hangisi doğrudur?', options: ['Her zaman ilk hecede', 'Her zaman son hecede', 'Sabit bir yeri yoktur', 'Sıfatlarda değişir'], correct: 2 },
          { question: 'Vurgulu sesliyi bul:', options: [], correct: 1, type: 'stress', stressWord: 'Москва' },
          { question: 'Vurgulu sesliyi bul:', options: [], correct: 2, type: 'stress', stressWord: 'молоко' },
          { question: 'Vurgulu sesliyi bul:', options: [], correct: 0, type: 'stress', stressWord: 'замок' },
        ],
      },
      {
        id: '1-3',
        number: '1.3',
        title: 'İsimlerde Cinsiyet',
        explanation: `Rusçada her ismin bir cinsiyeti vardır: eril (мужской род), dişil (женский род) veya nötr (средний род). Cinsiyet, sıfatları, zamirleri ve fiil çekimlerini doğrudan etkiler.

**Genel kural (son harfe bakılır):**

Eril isimler (Мужской род):
• Ünsüzle biten: стол (masa), дом (ev), брат (erkek kardeş)
• -й ile biten: трамвай (tramvay), музей (müze)
• -ь ile biten (erkil): день (gün), словарь (sözlük)

Dişil isimler (Женский род):
• -а ile biten: книга (kitap), сестра (kız kardeş), мама (anne)
• -я ile biten: неделя (hafta), семья (aile)
• -ь ile biten (dişil): ночь (gece), дверь (kapı), мать (anne)

Nötr isimler (Средний род):
• -о ile biten: окно (pencere), слово (kelime), молоко (süt)
• -е ile biten: море (deniz), поле (tarla)
• -мя ile biten: время (zaman), имя (isim)

**İstisnalar — dikkat!**
Biyolojik cinsiyeti olan kelimeler her zaman ona göre çekilir:
• папа (baba) → -а biter ama ERİL
• дядя (amca) → -я biter ama ERİL
• дедушка (büyükbaba) → -а biter ama ERİL
• мужчина (erkek) → -а biter ama ERİL`,
        examples: [
          { russian: 'стол', turkish: 'masa', note: 'ERİL — ünsüzle biter' },
          { russian: 'книга', turkish: 'kitap', note: 'DİŞİL — -а ile biter' },
          { russian: 'окно', turkish: 'pencere', note: 'NÖTR — -о ile biter' },
          { russian: 'день', turkish: 'gün', note: 'ERİL — -ь istisnası' },
          { russian: 'ночь', turkish: 'gece', note: 'DİŞİL — -ь istisnası' },
          { russian: 'папа', turkish: 'baba', note: 'ERİL — -а ama biyolojik erkek' },
          { russian: 'дядя', turkish: 'amca, dayı', note: 'ERİL — -я ama biyolojik erkek' },
          { russian: 'время', turkish: 'zaman', note: 'NÖTR — -мя grubu' },
        ],
        quiz: [
          { question: '"книга" kelimesinin cinsiyeti nedir?', options: ['Eril', 'Dişil', 'Nötr', 'Belirsiz'], correct: 1 },
          { question: '"папа" (baba) kelimesi hangi cinsiyettedir?', options: ['Dişil — -а ile biter', 'Nötr', 'Eril — biyolojik erkek', 'Çoğul'], correct: 2 },
          { question: '-о ile biten isimler hangi cinsiyettedir?', options: ['Eril', 'Dişil', 'Nötr', 'Değişir'], correct: 2 },
        ],
      },
      {
        id: '1-4',
        number: '1.4',
        title: 'Kişi ve İyelik Zamirleri',
        explanation: `Rusçada kişi zamirleri (личные местоимения) özne konumunda kullanılır. İyelik zamirleri (притяжательные местоимения) ise bir şeyin kime ait olduğunu gösterir ve ismin cinsiyetine göre değişir.

**Kişi zamirleri:**
| Türkçe | Rusça | Okunuş |
|---|---|---|
| Ben | я | ya |
| Sen | ты | tı |
| O (erkek) | он | on |
| O (dişil) | она | ana |
| O (nötr) | оно | ano |
| Biz | мы | mı |
| Siz | вы | vı |
| Onlar | они | ani |

Not: "Вы" büyük harfle yazıldığında (Вы) tek kişiye saygı zamiridir — Türkçedeki "siz" gibi.

**İyelik zamirleri (yalın hâlde):**
Benim/Benin: мой (eril), моя (dişil), моё (nötr), мои (çoğul)
Senin: твой / твоя / твоё / твои
Onun (eril/nötr): его — değişmez
Onun (dişil): её — değişmez
Bizim: наш / наша / наше / наши
Sizin: ваш / ваша / ваше / ваши
Onların: их — değişmez`,
        examples: [
          { russian: 'Я студент.', turkish: 'Ben öğrenciyim.', note: 'eril' },
          { russian: 'Она врач.', turkish: 'O doktordur.', note: 'dişil özne' },
          { russian: 'Мой дом большой.', turkish: 'Benim evim büyük.', note: 'мой — eril isim' },
          { russian: 'Моя книга здесь.', turkish: 'Benim kitabım burada.', note: 'моя — dişil isim' },
          { russian: 'Моё окно чистое.', turkish: 'Benim pencerem temiz.', note: 'моё — nötr isim' },
          { russian: 'Его машина новая.', turkish: 'Onun arabası yeni.', note: 'его değişmez' },
          { russian: 'Наш город красивый.', turkish: 'Bizim şehrimiz güzel.', note: 'наш — eril' },
          { russian: 'Ваша сестра дома?', turkish: 'Sizin kız kardeşiniz evde mi?', note: 'ваша — dişil' },
        ],
        quiz: [
          { question: '"Benim kitabım" Rusçada nasıl söylenir?', options: ['Мой книга', 'Моя книга', 'Моё книга', 'Мои книга'], correct: 1 },
          { question: '"Его машина" ifadesinde "его" neden değişmez?', options: ['Eril zamiri olduğu için', '3. tekil iyelik zamiri değişmez', 'Dişil isimle uyuştuğu için', 'Kural istisnasıdır'], correct: 1 },
          { question: '"Biz" zamiri Rusçada nedir?', options: ['Вы', 'Они', 'Мы', 'Вам'], correct: 2 },
        ],
      },
      {
        id: '1-5',
        number: '1.5',
        title: '"Bu kim? Bu ne?" Yapısı',
        explanation: `Rusçada şimdiki zamanda "to be" fiili (быть) kullanılmaz. Bu, Türkçe ile ortak bir özelliktir ve başlangıç için avantajlıdır — ama dikkat etmek gereken ince noktalar vardır.

**Temel yapı:**
Türkçe: "Bu bir kitaptır." → Rusça: "Это книга." (kelime kelime: "Bu kitap.")
Fiil yok! Özne + yüklem doğrudan yan yana gelir.

**Это vs. Этот/Эта/Это:**
• "Это" (Bu) — her cinsiyetten ismi tanıtmak için kullanılır, değişmez:
  Это стол. / Это книга. / Это окно.
• "Этот/Эта/Это" — bir ismi nitelendirirken cinsiyete göre değişir:
  Этот стол новый. (Bu masa yeni.)
  Эта книга интересная. (Bu kitap ilginç.)

**Soru cümleleri:**
Soru işareti ve tonlama ile yapılır, ek bir fiil gerekmez:
• Кто это? — Bu kim?
• Что это? — Bu ne?
• Где книга? — Kitap nerede?

**Olumsuz cümleler:**
"Не" edatı yüklemi olumsuz yapar:
• Это не книга. — Bu kitap değil.
• Я не студент. — Ben öğrenci değilim.`,
        examples: [
          { russian: 'Это книга.', turkish: 'Bu bir kitap.', note: 'fiil yok' },
          { russian: 'Кто это?', turkish: 'Bu kim?', note: 'soru tonlaması' },
          { russian: 'Что это?', turkish: 'Bu ne?', note: 'nesne için' },
          { russian: 'Я студент.', turkish: 'Ben öğrenciyim.', note: 'sıfır kopula' },
          { russian: 'Она врач.', turkish: 'O bir doktor.', note: 'dişil' },
          { russian: 'Это не стол.', turkish: 'Bu masa değil.', note: 'не ile olumsuz' },
          { russian: 'Где мой телефон?', turkish: 'Benim telefonum nerede?', note: 'где — nerede' },
          { russian: 'Этот дом большой.', turkish: 'Bu ev büyük.', note: 'этот — eril sıfat' },
        ],
        quiz: [
          { question: '"Bu bir kitap." Rusçada nasıl denir?', options: ['Это есть книга.', 'Это книга.', 'Есть книга.', 'Книга это.'], correct: 1 },
          { question: '"Bu kim?" sorusu Rusçada nasıl sorulur?', options: ['Что это?', 'Где это?', 'Кто это?', 'Как это?'], correct: 2 },
          { question: '"Это не стол." cümlesinin anlamı nedir?', options: ['Bu masa.', 'Bu bir sandalye.', 'Bu masa değil.', 'Masam yok.'], correct: 2 },
        ],
      },
      {
        id: '1-6',
        number: '1.6',
        title: 'Düzenli Çoğul Yapma',
        explanation: `Rusçada çoğul, ismin son harfine ve cinsiyetine göre farklı eklerle yapılır. Temel kurallar öğrenilebilir, ancak önemli istisnalar da mevcuttur.

**Temel çoğul ekleri:**

1) -ы eki (en yaygın):
Ünsüzle biten eril isimler ve -а ile biten dişil isimler alır:
• стол → столы (masalar)
• книга → книги (kitaplar) — *г,к,х,ж,ш,щ,ч sonrası -и!*

2) -и eki:
• -й, -ь ile biten isimler: музей → музеи, словарь → словари
• Bazı -а/-я bitenler: неделя → недели
• Yumuşatma kuralı sonrası (г,к,х,ж,ш,щ,ч): книга → книги

3) -а / -я eki (nötr ve bazı eril):
• Nötr -о: окно → окна, слово → слова
• Nötr -е: море → моря
• Bazı eril istisnalar: город → города, дом → дома, глаз → глаза

**7 harf kuralı (важно!):**
г, к, х, ж, ш, щ, ч harflerinden sonra ASLA -ы yazılmaz, -и yazılır:
книга → книги, кошка → кошки, задача → задачи

**Düzensiz çoğullar (ezber):**
• человек → люди (insan → insanlar)
• ребёнок → дети (çocuk → çocuklar)
• друг → друзья (arkadaş → arkadaşlar)`,
        examples: [
          { russian: 'стол → столы', turkish: 'masa → masalar', note: 'eril + -ы' },
          { russian: 'книга → книги', turkish: 'kitap → kitaplar', note: '-га sonrası -и' },
          { russian: 'окно → окна', turkish: 'pencere → pencereler', note: 'nötr -о → -а' },
          { russian: 'море → моря', turkish: 'deniz → denizler', note: 'nötr -е → -я' },
          { russian: 'словарь → словари', turkish: 'sözlük → sözlükler', note: '-ь → -и' },
          { russian: 'город → города', turkish: 'şehir → şehirler', note: 'düzensiz -а' },
          { russian: 'человек → люди', turkish: 'insan → insanlar', note: 'tamamen düzensiz' },
          { russian: 'ребёнок → дети', turkish: 'çocuk → çocuklar', note: 'tamamen düzensiz' },
        ],
        quiz: [
          { question: '"книга" kelimesinin çoğulu nedir?', options: ['книгы', 'книги', 'книгов', 'книге'], correct: 1 },
          { question: '"окно" kelimesinin çoğulu nedir?', options: ['окны', 'окни', 'окна', 'окнов'], correct: 2 },
          { question: '"insan" kelimesinin çoğulu olan "люди" hangi tür çoğuldur?', options: ['Düzenli -ы eki', 'Düzenli -и eki', 'Tamamen düzensiz', '-а eki'], correct: 2 },
        ],
      },
    ],
  },
  {
    id: 'blok2',
    level: 'A1.2',
    title: 'Temel Yapılar',
    topics: [
      {
        id: '2-1',
        number: '2.1',
        title: 'Fiil Çekimine Giriş (1. ve 2. Tip)',
        explanation: `Rusçada fiiller şimdiki zamanda iki ana gruba göre çekilir. Hangi gruba girdiğini anlamak için mastar (sözlük) haline bakılır.

**1. Tip Çekim (-ать / -ять / -еть / -ить fiilleri):**
Örnek: читать (okumak)
• я читаю — ben okuyorum
• ты читаешь — sen okuyorsun
• он/она читает — o okuyor
• мы читаем — biz okuyoruz
• вы читаете — siz okuyorsunuz
• они читают — onlar okuyorlar

**2. Tip Çekim (-ить / -еть fiilleri):**
Örnek: говорить (konuşmak)
• я говорю — ben konuşuyorum
• ты говоришь — sen konuşuyorsun
• он/она говорит — o konuşuyor
• мы говорим — biz konuşuyoruz
• вы говорите — siz konuşuyorsunuz
• они говорят — onlar konuşuyorlar

**Hangi tip olduğunu nasıl anlarız?**
Genel kural: mastar -ать ile bitiyorsa çoğunlukla 1. tip; -ить ile bitiyorsa 2. tip. Ama istisnalar çoktur — хотеть (istemek), дать (vermek) gibi fiiller karma çekilir.

**Önemli düzensiz fiiller:**
• быть (olmak) — şimdiki zamanda kullanılmaz (sıfır kopula)
• есть (yemek / var olmak) — iki farklı fiil!
• идти (gitmek, yaya) — иду, идёшь, идёт...`,
        examples: [
          { russian: 'Я читаю книгу.', turkish: 'Ben kitap okuyorum.', note: '1. tip: читать' },
          { russian: 'Ты говоришь по-русски?', turkish: 'Sen Rusça biliyor musun?', note: '2. tip: говорить' },
          { russian: 'Она работает в офисе.', turkish: 'O ofiste çalışıyor.', note: '1. tip: работать' },
          { russian: 'Мы учимся каждый день.', turkish: 'Biz her gün ders çalışıyoruz.', note: 'учиться — dönüşlü' },
          { russian: 'Они живут в Москве.', turkish: 'Onlar Moskova\'da yaşıyorlar.', note: 'жить — 1. tip, düzensiz' },
          { russian: 'Я хочу кофе.', turkish: 'Ben kahve istiyorum.', note: 'хотеть — karma çekim' },
          { russian: 'Вы понимаете меня?', turkish: 'Beni anlıyor musunuz?', note: 'понимать — 1. tip' },
          { russian: 'Он любит музыку.', turkish: 'O müziği seviyor.', note: 'любить — 2. tip' },
        ],
        quiz: [
          { question: '"читать" fiilinin "я" ile çekimi hangisidir?', options: ['я читаю', 'я читаешь', 'я читает', 'я читаю'], correct: 0 },
          { question: '"говорить" hangi tip çekime girer?', options: ['1. tip', '2. tip', 'Düzensiz', 'Karma'], correct: 1 },
          { question: '"Ты говоришь по-русски?" ne anlama gelir?', options: ['Rusça yazıyor musun?', 'Rusça anlıyor musun?', 'Rusça biliyor musun?', 'Rusçayı seviyor musun?'], correct: 2 },
        ],
      },
      {
        id: '2-2',
        number: '2.2',
        title: 'İsmin Kalma Hali (Предложный падеж)',
        explanation: `Предложный падеж (Öneri/Bulunma Hali) Rusçanın 6 halinden biridir. "Nerede?" (Где?) sorusuna cevap verir ve yalnızca edatlarla birlikte kullanılır — asla edatsız olmaz!

**Kullanılan edatlar:**
• в (içinde, -de/-da): в школе (okulda), в Москве (Moskova'da)
• на (üzerinde, -de/-da): на столе (masada), на работе (işte)
• о/об (hakkında): о книге (kitap hakkında), об этом (bu hakkında)

**Tekil hal ekleri:**
• Eril (ünsüz sonu): + -е → стол → на столе
• Eril (-й sonu): -й → -е → музей → в музее
• Eril (-ь sonu): -ь → -е → словарь → в словаре
• Dişil (-а): -а → -е → школа → в школе
• Dişil (-я): -я → -е → неделя → о неделе
• Dişil (-ь): -ь → -и → ночь → о ночи
• Nötr (-о): -о → -е → окно → об окне
• Nötr (-е): değişmez → море → в море

**в vs. на farkı:**
• в — kapalı bir yer: в школе, в магазине, в России
• на — açık alan veya iş/etkinlik: на улице, на работе, на концерте
Bu ayrım her zaman mantıkla açıklanamaz — ezber gerekir!`,
        examples: [
          { russian: 'Книга на столе.', turkish: 'Kitap masanın üzerinde.', note: 'стол → на столе' },
          { russian: 'Я живу в Москве.', turkish: 'Ben Moskova\'da yaşıyorum.', note: 'Москва → в Москве' },
          { russian: 'Она работает в школе.', turkish: 'O okulda çalışıyor.', note: 'школа → в школе' },
          { russian: 'Мы говорим о книге.', turkish: 'Biz kitap hakkında konuşuyoruz.', note: 'книга → о книге' },
          { russian: 'Телефон в сумке.', turkish: 'Telefon çantada.', note: 'сумка → в сумке' },
          { russian: 'Он на работе.', turkish: 'O işte (işyerinde).', note: 'работа → на работе' },
          { russian: 'Дети в парке.', turkish: 'Çocuklar parkta.', note: 'парк → в парке' },
          { russian: 'Я думаю о тебе.', turkish: 'Ben seni düşünüyorum.', note: 'ты → о тебе' },
        ],
        quiz: [
          { question: '"в школе" ne anlama gelir?', options: ['Okula', 'Okuldan', 'Okulda', 'Okul hakkında'], correct: 2 },
          { question: '"школа" kelimesi Предложный падежde nasıl olur?', options: ['школу', 'школе', 'школы', 'школой'], correct: 1 },
          { question: '"в" ve "на" edatlarından hangisi kapalı mekânlar için kullanılır?', options: ['на', 'в', 'İkisi de', 'Hiçbiri'], correct: 1 },
        ],
      },
      {
        id: '2-3',
        number: '2.3',
        title: 'Sıfatların Yalın Hali',
        explanation: `Rusçada sıfatlar, nitelendirdikleri ismin cinsiyetine, sayısına ve haline göre çekilir. Bu, Türkçede olmayan bir yapıdır.

**Yalın hâlde (Именительный падеж) sıfat ekleri:**

Eril isimlerle:
• Sert sıfatlar: -ый → новый дом (yeni ev)
• Yumuşak sıfatlar: -ий → синий цвет (mavi renk)
• г,к,х,ж,ш,щ,ч sonrası: -ий → хороший день (iyi gün)

Dişil isimlerle:
• Sert: -ая → новая книга (yeni kitap)
• Yumuşak: -яя → синяя ручка (mavi kalem)

Nötr isimlerle:
• Sert: -ое → новое окно (yeni pencere)
• Yumuşak: -ее → синее море (mavi deniz)

Çoğul (tüm cinsiyetler):
• Sert: -ые → новые книги
• Yumuşak: -ие → синие глаза

**7 harf kuralı sıfatlarda da geçerli:**
г,к,х,ж,ш,щ,ч sonrası -ый değil -ий yazılır:
• хороший (iyi), русский (Rusça/Rus), большой (büyük)`,
        examples: [
          { russian: 'новый дом', turkish: 'yeni ev', note: 'eril -ый' },
          { russian: 'новая книга', turkish: 'yeni kitap', note: 'dişil -ая' },
          { russian: 'новое окно', turkish: 'yeni pencere', note: 'nötr -ое' },
          { russian: 'новые друзья', turkish: 'yeni arkadaşlar', note: 'çoğul -ые' },
          { russian: 'хороший день', turkish: 'iyi gün', note: 'х → -ий' },
          { russian: 'красивая девушка', turkish: 'güzel kız', note: 'dişil -ая' },
          { russian: 'интересный фильм', turkish: 'ilginç film', note: 'eril -ый' },
          { russian: 'синее небо', turkish: 'mavi gökyüzü', note: 'nötr yumuşak -ее' },
        ],
        quiz: [
          { question: '"новый дом" ifadesinde sıfat eki nedir?', options: ['-ая', '-ое', '-ый', '-ие'], correct: 2 },
          { question: '"yeni kitap" Rusçada nasıl denir? (книга — dişil)', options: ['новый книга', 'новая книга', 'новое книга', 'новые книга'], correct: 1 },
          { question: '7 harf kuralına göre г,к,х,ж sonrası hangi ek gelir?', options: ['-ый', '-ой', '-ий', '-ый/-ий'], correct: 2 },
        ],
      },
      {
        id: '2-4',
        number: '2.4',
        title: 'Temel Zarflar',
        explanation: `Zarflar (наречия) Rusçada değişmez — cinsiyet, hal veya sayıya göre çekilmezler. Bu açıdan Türkçeye benzerler.

**Yer zarfları:**
• здесь / тут — burada
• там — orada
• везде — her yerde
• нигде — hiçbir yerde
• далеко — uzakta
• близко — yakında
• справа — sağda
• слева — solda

**Zaman zarfları:**
• сейчас — şimdi
• сегодня — bugün
• завтра — yarın
• вчера — dün
• всегда — her zaman
• никогда — hiçbir zaman
• часто — sık sık
• иногда — bazen
• редко — nadiren
• уже — zaten, artık
• ещё — henüz, hâlâ
• скоро — yakında

**Nitelik zarfları:**
• хорошо — iyi (şekilde)
• плохо — kötü (şekilde)
• быстро — hızlı
• медленно — yavaş
• тихо — sessizce
• громко — yüksek sesle
• очень — çok
• немного — biraz`,
        examples: [
          { russian: 'Я уже дома.', turkish: 'Ben zaten evdeyim.', note: 'уже — zaten' },
          { russian: 'Она всегда улыбается.', turkish: 'O her zaman gülümser.', note: 'всегда' },
          { russian: 'Мы скоро придём.', turkish: 'Biz yakında geleceğiz.', note: 'скоро' },
          { russian: 'Говори медленно!', turkish: 'Yavaş konuş!', note: 'медленно' },
          { russian: 'Он очень умный.', turkish: 'O çok zekidir.', note: 'очень + sıfat' },
          { russian: 'Я иногда готовлю.', turkish: 'Ben bazen yemek yapıyorum.', note: 'иногда' },
          { russian: 'Вчера был дождь.', turkish: 'Dün yağmur yağdı.', note: 'вчера' },
          { russian: 'Она говорит тихо.', turkish: 'O sessizce konuşuyor.', note: 'тихо' },
        ],
        quiz: [
          { question: '"şimdi" anlamına gelen Rusça zarf hangisidir?', options: ['сегодня', 'сейчас', 'скоро', 'всегда'], correct: 1 },
          { question: '"всегда" ne anlama gelir?', options: ['Bazen', 'Hiçbir zaman', 'Her zaman', 'Nadiren'], correct: 2 },
          { question: 'Rusçada zarflar cinsiyete göre değişir mi?', options: ['Evet, daima', 'Sadece sıfatlarla', 'Hayır, değişmez', 'Sadece geçmiş zamanda'], correct: 2 },
        ],
      },
      {
        id: '2-5',
        number: '2.5',
        title: 'Sahiplik Yapısı (У меня есть / нет)',
        explanation: `Rusçada sahipliği ifade etmek için "иметь" (sahip olmak) fiili yerine farklı bir yapı kullanılır: У + [sahip] (ilgi hali) + есть + [sahip olunan nesne].

**Olumlu yapı: У меня есть...**
"У" edatı + zamirin ilgi hali + есть (var) + nesme

Zamirler ilgi halinde:
• я → у меня (bende, benim)
• ты → у тебя (sende, senin)
• он → у него (onda, onun)
• она → у неё (onda, onun)
• мы → у нас (bizde, bizim)
• вы → у вас (sizde, sizin)
• они → у них (onlarda, onların)

**Olumsuz yapı: У меня нет...**
Olumsuzda "есть" düşer, "нет" gelir ve nesne İLGİ HALİNE (Родительный падеж) girer!
• У меня есть книга. → У меня нет книги.
• У него есть машина. → У него нет машины.

**Geçmiş ve gelecek zamanda:**
• Geçmiş: У меня был/была/было... (vardı)
• Gelecek: У меня будет... (olacak)`,
        examples: [
          { russian: 'У меня есть книга.', turkish: 'Bende bir kitap var.', note: 'olumlu yapı' },
          { russian: 'У тебя есть телефон?', turkish: 'Sende telefon var mı?', note: 'soru' },
          { russian: 'У него есть машина.', turkish: 'Onun arabası var.', note: 'он → у него' },
          { russian: 'У меня нет книги.', turkish: 'Bende kitap yok.', note: 'нет + ilgi hali' },
          { russian: 'У неё нет времени.', turkish: 'Onun vakti yok.', note: 'она → у неё' },
          { russian: 'У нас есть кошка.', turkish: 'Bizim bir kedimiz var.', note: 'мы → у нас' },
          { russian: 'У меня был кот.', turkish: 'Bende bir kedi vardı.', note: 'geçmiş — eril' },
          { russian: 'У вас будет время?', turkish: 'Sizin zamanınız olacak mı?', note: 'gelecek' },
        ],
        quiz: [
          { question: '"Bende bir kitap var." Rusçada nasıl denir?', options: ['Я имею книгу.', 'У меня есть книга.', 'Мне есть книга.', 'У меня книга есть.'], correct: 1 },
          { question: '"У меня нет книги." cümlesinde "книги" hangi haldedir?', options: ['Yalın hal', 'Bulunma hali', 'İlgi hali', 'Belirtme hali'], correct: 2 },
          { question: '"Onun (dişil) arabası var." Rusçada nasıl denir?', options: ['У него есть машина.', 'У неё есть машина.', 'У ней есть машина.', 'У её есть машина.'], correct: 1 },
        ],
      },
    ],
  },
  {
    id: 'blok3',
    level: 'A2.1',
    title: 'Zaman ve Hareket',
    topics: [
      {
        id: '3-1',
        number: '3.1',
        title: 'Geçmiş Zaman (-л, -ла, -ло, -ли)',
        explanation: `Rusçada geçmiş zaman (прошедшее время), fiilin masdarından (infinitive) -ть/-ти eki atılarak ve cinsiyet/sayı eki eklenerek yapılır. Kişiye göre DEĞİL, öznenin cinsiyetine göre değişir!

**Geçmiş zaman ekleri:**
• Eril özne (я/ты/он): -л → читал, работал
• Dişil özne (я/ты/она): -ла → читала, работала
• Nötr özne (оно): -ло → читало
• Çoğul (мы/вы/они): -ли → читали

**Dikkat: "я" zamiri hem eril hem dişil olabilir!**
Konuşan bir erkekse: Я читал (Ben okudum — erkek)
Konuşan bir kadınsa: Я читала (Ben okudum — kadın)

**Гла́гол быть (olmak) geçmiş:**
• был (eril), была (dişil), было (nötr), были (çoğul)

**İstisna: -чь ile biten fiiller:**
мочь (yapabilmek) → мог (eril), могла (dişil), могло, могли
печь (pişirmek) → пёк, пекла, пекло, пекли

**İstisna: идти (gitmek) ve ön ekli türevleri:**
идти → шёл (eril), шла (dişil), шло, шли`,
        examples: [
          { russian: 'Он читал книгу.', turkish: 'O kitap okuyordu.', note: 'eril -л' },
          { russian: 'Она читала книгу.', turkish: 'O kitap okuyordu.', note: 'dişil -ла' },
          { russian: 'Я работал вчера.', turkish: 'Ben dün çalıştım.', note: 'eril konuşmacı' },
          { russian: 'Я работала вчера.', turkish: 'Ben dün çalıştım.', note: 'dişil konuşmacı' },
          { russian: 'Мы смотрели фильм.', turkish: 'Biz film izledik.', note: 'çoğul -ли' },
          { russian: 'Вчера был дождь.', turkish: 'Dün yağmur yağdı.', note: 'быть → был (eril)' },
          { russian: 'Она была дома.', turkish: 'O evdeydi.', note: 'быть → была (dişil)' },
          { russian: 'Они пришли поздно.', turkish: 'Onlar geç geldi.', note: 'прийти → пришли' },
        ],
        quiz: [
          { question: '"O kitap okuyordu." (dişil) Rusçada nasıl denir?', options: ['Она читал книгу.', 'Она читало книгу.', 'Она читала книгу.', 'Она читали книгу.'], correct: 2 },
          { question: 'Geçmiş zamanda nötr için hangi ek kullanılır?', options: ['-л', '-ла', '-ло', '-ли'], correct: 2 },
          { question: '"Dün yağmur yağdı." Rusçada nasıl denir?', options: ['Вчера дождь была.', 'Вчера был дождь.', 'Вчера дождь были.', 'Дождь вчера будет.'], correct: 1 },
        ],
      },
      {
        id: '3-2',
        number: '3.2',
        title: 'Gelecek Zaman',
        explanation: `Rusçada gelecek zaman iki farklı şekilde oluşturulur — bu, fiilin "görünüşüne" (aspect) bağlıdır.

**1) Bileşik gelecek (Несовершенный вид — süreç anlatır):**
быть fiilinin gelecek çekimi + mastar:
• я буду читать — ben okuyacağım (okuma eylemi devam edecek)
• ты будешь читать
• он/она будет читать
• мы будем читать
• вы будете читать
• они будут читать

**2) Basit gelecek (Совершенный вид — sonuç/tamamlanma anlatır):**
Tamamlanmış görünüşlü fiil (СВ) şimdiki zaman gibi çekilir ama anlam gelecektir:
• я прочитаю — ben okuyacağım (ve bitireceğim)
• ты прочитаешь, он прочитает...

**Pratik fark:**
• Завтра я буду читать книгу. → Yarın kitap okuyacağım. (tamamlanmaz — sadece eylem)
• Завтра я прочитаю книгу. → Yarın kitabı okuyup bitireceğim. (tamamlanır)

**Быть gelecek çekimi (yardımcı fiil):**
буду / будешь / будет / будем / будете / будут`,
        examples: [
          { russian: 'Я буду читать завтра.', turkish: 'Ben yarın okuyacağım.', note: 'бileşik — süreç' },
          { russian: 'Она будет работать.', turkish: 'O çalışacak.', note: 'бileşik' },
          { russian: 'Мы будем дома.', turkish: 'Biz evde olacağız.', note: 'быть — gelecek' },
          { russian: 'Я прочитаю эту книгу.', turkish: 'Bu kitabı okuyacağım (bitireceğim).', note: 'basit — sonuç' },
          { russian: 'Он напишет письмо.', turkish: 'O mektubu yazacak.', note: 'написать — СВ' },
          { russian: 'Ты будешь есть?', turkish: 'Sen yiyecek misin?', note: 'soru' },
          { russian: 'Они придут завтра.', turkish: 'Onlar yarın gelecekler.', note: 'прийти — СВ' },
          { russian: 'Мы будем учиться весь день.', turkish: 'Biz tüm gün ders çalışacağız.', note: 'НСВ — süre' },
        ],
        quiz: [
          { question: 'Bileşik geleceği oluşturmak için hangi yardımcı fiil kullanılır?', options: ['быть', 'есть', 'иметь', 'стать'], correct: 0 },
          { question: '"Я буду читать" cümlesinin anlamı nedir?', options: ['Kitabı bitireceğim.', 'Okuyacağım (süreç).', 'Okuyordum.', 'Okumak istiyorum.'], correct: 1 },
          { question: '"прочитаю" hangi görünüşe aittir?', options: ['НСВ — tamamlanmamış', 'СВ — tamamlanmış', 'Düzensiz fiil', 'Geçmiş zaman'], correct: 1 },
        ],
      },
      {
        id: '3-3',
        number: '3.3',
        title: 'Sayılar ve Sayma',
        explanation: `Rusça sayılar başlangıçta kolay görünse de, sayıdan sonra gelen ismin hangi hale gireceğini öğrenmek kritiktir.

**Temel sayılar 1-20:**
1-один/одна, 2-два/две, 3-три, 4-четыре, 5-пять, 6-шесть, 7-семь, 8-восемь, 9-девять, 10-десять, 11-одиннадцать, 12-двенадцать, 13-тринадцать, 14-четырнадцать, 15-пятнадцать, 16-шестнадцать, 17-семнадцать, 18-восемнадцать, 19-девятнадцать, 20-двадцать

**Onlar: 30-тридцать, 40-сорок, 50-пятьдесят, 60-шестьдесят, 70-семьдесят, 80-восемьдесят, 90-девяносто, 100-сто**

**Sayıdan sonra gelen isim kuralı (çok önemli!):**
• 1 → isim yalın tekil: 1 рубль, 1 книга
• 2, 3, 4 → isim ilgi tekil: 2 рубля, 3 книги
• 5-20 ve üzeri → isim ilgi çoğul: 5 рублей, 10 книг
• 21 → 1 kuralı: 21 рубль
• 22 → 2 kuralı: 22 рубля
• 25 → 5 kuralı: 25 рублей

**один/одна — cinsiyete göre değişir:**
• один рубль (eril), одна книга (dişil), одно окно (nötr)
**два/две — cinsiyete göre:**
• два стола (eril/nötr), две книги (dişil)`,
        examples: [
          { russian: '1 рубль', turkish: '1 ruble', note: 'yalın tekil' },
          { russian: '2 рубля', turkish: '2 ruble', note: 'ilgi tekil' },
          { russian: '5 рублей', turkish: '5 ruble', note: 'ilgi çoğul' },
          { russian: '21 рубль', turkish: '21 ruble', note: '1 kuralı geçerli' },
          { russian: '3 книги', turkish: '3 kitap', note: 'ilgi tekil' },
          { russian: '10 книг', turkish: '10 kitap', note: 'ilgi çoğul — son ek yok' },
          { russian: 'один студент', turkish: 'bir öğrenci', note: 'eril' },
          { russian: 'одна студентка', turkish: 'bir öğrenci (kız)', note: 'dişil' },
        ],
        quiz: [
          { question: '5 sayısından sonra isim hangi hale girer?', options: ['Yalın tekil', 'İlgi tekil', 'İlgi çoğul', 'Yalın çoğul'], correct: 2 },
          { question: '"3 книги" ifadesinde "книги" hangi haldedir?', options: ['Yalın çoğul', 'İlgi tekil', 'Belirtme tekil', 'Bulunma hali'], correct: 1 },
          { question: '"один" sayısı Rusçada ne zaman "одна" olur?', options: ['Çoğul isimlerle', 'Dişil isimlerle', 'Nötr isimlerle', 'Hiçbir zaman'], correct: 1 },
        ],
      },
      {
        id: '3-4',
        number: '3.4',
        title: 'İsmin -i Hali (Винительный падеж)',
        explanation: `Винительный падеж (Belirtme/Yükleme Hali), doğrudan nesneyi (eylemi doğrudan etkileyen şeyi) gösterir. "Kimi? Neyi?" (Кого? Что?) sorusuna yanıt verir.

**Cansız nesneler (неодушевлённые):**
• Eril cansız: yalın hâl ile aynı → вижу стол, читаю журнал
• Nötr: yalın hâl ile aynı → вижу окно
• Dişil (-а): -а → -у, (-я): -я → -ю:
  книга → книгу (kitabı), неделя → неделю

**Canlı nesneler (одушевлённые):**
• Eril canlı: ilgi hâli ile aynı → вижу брата, люблю отца
• Dişil: dişil ile aynı → вижу сестру (zaten -у)
• Çoğul canlı: ilgi çoğul ile aynı → вижу братьев

**"Куда?" (Nereye?) sorusuyla — yön anlamı:**
в + belirtme hâli = -e/-a gitmek:
• в школу (okula), в город (şehre), в магазин (markete)
на + belirtme hâli = -e/-a:
• на работу (işe), на концерт (konsere)`,
        examples: [
          { russian: 'Я читаю книгу.', turkish: 'Ben kitap okuyorum.', note: 'книга → книгу' },
          { russian: 'Я вижу брата.', turkish: 'Ben erkek kardeşimi görüyorum.', note: 'canlı eril' },
          { russian: 'Она любит музыку.', turkish: 'O müziği seviyor.', note: 'музыка → музыку' },
          { russian: 'Мы идём в школу.', turkish: 'Biz okula gidiyoruz.', note: 'школа → в школу' },
          { russian: 'Он смотрит фильм.', turkish: 'O film izliyor.', note: 'cansız eril — değişmez' },
          { russian: 'Купи хлеб!', turkish: 'Ekmek al!', note: 'cansız eril — değişmez' },
          { russian: 'Я люблю тебя.', turkish: 'Seni seviyorum.', note: 'ты → тебя' },
          { russian: 'Она ждёт подругу.', turkish: 'O (kız) arkadaşını bekliyor.', note: 'подруга → подругу' },
        ],
        quiz: [
          { question: 'Dişil ismin belirtme hali (-ü/-u) nasıl yapılır?', options: ['-а eki alır', '-а → -у / -я → -ю', '-е eki alır', 'Değişmez'], correct: 1 },
          { question: '"Мы идём в школу." cümlesinde "школу" hangi haldedir?', options: ['Bulunma', 'Yönelme', 'Belirtme', 'Araç'], correct: 2 },
          { question: 'Cansız eril belirtme hali yalın ile aynı mıdır?', options: ['Hayır, ilgi hali gibi', 'Evet, değişmez', 'Dişil gibi değişir', 'Sadece fiil ile değişir'], correct: 1 },
        ],
      },
      {
        id: '3-5',
        number: '3.5',
        title: 'Temel Hareket Fiilleri',
        specialComponent: 'motionVerbs' as const,
        explanation: `Rusçada hareket fiilleri çift çalışır: tek yönlü (однонаправленные) ve çok yönlü (разнонаправленные). Bu sistem Türkçede karşılığı olmayan Rusçaya özgü bir yapıdır.

**Yaya hareket:**
| | Tek Yönlü | Çok Yönlü |
|---|---|---|
| Gitmek | идти | ходить |
| Gelmek/Koşmak | бежать | бегать |

**İdти vs. Ходить:**
• идти — şu an belirli bir yönde gidiyorum, tek yön:
  Я иду в школу. (Okula gidiyorum — şu an)
• ходить — alışkanlık, yuvarlak yolculuk, genel:
  Я хожу в школу каждый день. (Her gün okula giderim.)
  Вчера я ходил в кино. (Dün sinemaya gittim — ve döndüm.)

**Araçla hareket:**
| | Tek Yönlü | Çok Yönlü |
|---|---|---|
| Gitmek (araçla) | ехать | ездить |

**Ехать vs. Ездить:**
• ехать — şu an araçla gidiyorum, belirli yön
• ездить — alışkanlık veya tamamlanmış yuvarlak yolculuk

**İdти çekimi (düzensiz):**
иду, идёшь, идёт, идём, идёте, идут`,
        examples: [
          { russian: 'Я иду в магазин.', turkish: 'Ben markete gidiyorum.', note: 'şu an, tek yön', association: '💡 идти = "şu an yolculuk" — ok gibi tek yön →' },
          { russian: 'Я хожу в спортзал.', turkish: 'Ben spor salonuna giderim.', note: 'alışkanlık', association: '💡 ходить = "alışkanlık" — gidip geliyorum, yuvarlak ↔' },
          { russian: 'Она едет в Москву.', turkish: 'O Moskova\'ya gidiyor.', note: 'araçla, şu an', association: '💡 ехать = идти\'nin araçlı versiyonu: 🚗→ şu an' },
          { russian: 'Он ездит на работу.', turkish: 'O işe gider.', note: 'alışkanlık, araçla', association: '💡 ездить = ходить\'in araçlı versiyonu: 🚗↔ alışkanlık' },
          { russian: 'Дети бегут домой.', turkish: 'Çocuklar eve koşuyor.', note: 'бежать — tek yön' },
          { russian: 'Вчера мы ходили в кино.', turkish: 'Dün sinemaya gittik.', note: 'gidip döndük' },
          { russian: 'Куда ты идёшь?', turkish: 'Nereye gidiyorsun?', note: 'идти — 2. tekil' },
          { russian: 'Поезд едет быстро.', turkish: 'Tren hızlı gidiyor.', note: 'ехать — araç' },
        ],
        quiz: [
          { question: '"Я иду в школу." cümlesinde öğrenci nereye gidiyor?', options: ['Okuldan geliyor', 'Okulda', 'Okula gidiyor (şu an)', 'Her gün okula gider'], correct: 2 },
          { question: '"ходить" hangi durumlarda kullanılır?', options: ['Şu an belirli yönde gitme', 'Alışkanlık veya gidip dönme', 'Araçla gitme', 'Koşma'], correct: 1 },
          { question: 'Araçla gitme için hangi fiil çifti kullanılır?', options: ['идти / ходить', 'бежать / бегать', 'ехать / ездить', 'лететь / летать'], correct: 2 },
        ],
      },
    ],
  },
  {
    id: 'blok4',
    level: 'A2.2',
    title: 'Hal Sistemi',
    topics: [
      {
        id: '4-1',
        number: '4.1',
        title: 'İsmin -e Hali (Дательный падеж)',
        explanation: `Дательный падеж (Verme/Yönelme Hali) kime veya neye bir şey verildiğini, yönlendirildiğini gösterir. "Kime? Neye?" (Кому? Чему?) sorusunu yanıtlar.

**Tekil hal ekleri:**
• Eril (ünsüz): + -у → брату, другу
• Eril (-й): -й → -ю → музею
• Eril (-ь): -ь → -ю → словарю
• Dişil (-а): -а → -е → сестре, маме
• Dişil (-я): -я → -е → неделе (ama -ии için -и: станции)
• Dişil (-ь): -ь → -и → ночи
• Nötr (-о): -о → -у → окну
• Nötr (-е): -е → -ю → морю

**Kullanım alanları:**
1) Dolaylı nesne (kime veriliyor?):
   Я дал книгу сестре. (Kız kardeşime kitap verdim.)
2) Yaş ifadesi:
   Мне двадцать лет. (Benim yaşım yirmi — tam Türkçe yapı!)
3) Edatlar к (doğru/yanına) ve по (boyunca, göre):
   Иди к другу. (Arkadaşının yanına git.)
   Гуляй по парку. (Parkta gez.)
4) Kişisel durum ifadesi:
   Мне холодно. (Benim üşüyor — üşüyorum.)
   Ему скучно. (O sıkılıyor.)`,
        examples: [
          { russian: 'Я дал книгу сестре.', turkish: 'Kız kardeşime kitap verdim.', note: 'сестра → сестре' },
          { russian: 'Мне двадцать лет.', turkish: 'Benim yaşım yirmi.', note: 'я → мне' },
          { russian: 'Позвони маме!', turkish: 'Anneni ara!', note: 'мама → маме' },
          { russian: 'Это нравится детям.', turkish: 'Bu çocukların hoşuna gidiyor.', note: 'дети → детям' },
          { russian: 'Иди к другу.', turkish: 'Arkadaşının yanına git.', note: 'к + yönelme' },
          { russian: 'Мне холодно.', turkish: 'Üşüyorum.', note: 'durum ifadesi' },
          { russian: 'Ей скучно.', turkish: 'O sıkılıyor.', note: 'она → ей' },
          { russian: 'Студентам нравится Русский.', turkish: 'Öğrencilere Rusça hoş geliyor.', note: 'çoğul -ам' },
        ],
        quiz: [
          { question: '"Mне двадцать лет." cümlesinin anlamı nedir?', options: ['20 yaşındayım.', '20 lira.', '20 dakika var.', '20 yıl geçti.'], correct: 0 },
          { question: '"сестра" kelimesi Дательный падежde nasıl olur?', options: ['сестры', 'сестре', 'сестру', 'сестрой'], correct: 1 },
          { question: '"Мне холодно." ne anlama gelir?', options: ['Soğuk hava var.', 'Üşüyorum.', 'Soğuk su istiyorum.', 'Kış soğuk.'], correct: 1 },
          { question: 'Позвони мам[...]', options: ['-е', '-у', '-а', '-ой'], correct: 0, type: 'ending' },
          { question: 'Я дал книгу друг[...]', options: ['-е', '-у', '-ом', '-а'], correct: 1, type: 'ending' },
        ],
      },
      {
        id: '4-2',
        number: '4.2',
        title: 'İsmin -ile Hali (Творительный падеж)',
        explanation: `Творительный падеж (Araç/Birliktelik Hali) bir eylemin hangi araçla, kim/neyle birlikte yapıldığını gösterir. "Kim/Neyle? Kimle? Ne olarak?" (Кем? Чем?) sorularını yanıtlar.

**Tekil hal ekleri:**
• Eril (ünsüz): + -ом → столом, братом
• Eril (-й): -й → -ем → музеем
• Eril (-ь): -ь → -ем → словарём (vurgulu ise -ём)
• Dişil (-а): -а → -ой / -ою → сестрой, мамой
• Dişil (-я): -я → -ей → неделей
• Dişil (-ь): -ь → -ью → ночью, дверью
• Nötr (-о): -о → -ом → окном
• Nötr (-е): -е → -ем → морем

**Kullanım alanları:**
1) Araç/vasıta:
   Я пишу ручкой. (Kalemle yazıyorum.)
2) Birliktelik (с edatı):
   Я иду с другом. (Arkadaşımla gidiyorum.)
3) Meslek/kimlik (быть fiiliyle):
   Он хочет быть врачом. (O doktor olmak istiyor.)
4) Edatlar: за, под, над, перед, между
   Кот под столом. (Kedi masanın altında.)`,
        examples: [
          { russian: 'Я пишу ручкой.', turkish: 'Kalemle yazıyorum.', note: 'ручка → ручкой' },
          { russian: 'Он идёт с другом.', turkish: 'O arkadaşıyla gidiyor.', note: 'с + araç hali' },
          { russian: 'Она хочет быть врачом.', turkish: 'O doktor olmak istiyor.', note: 'быть + araç hali' },
          { russian: 'Кот под столом.', turkish: 'Kedi masanın altında.', note: 'под + araç hali' },
          { russian: 'Я горжусь тобой.', turkish: 'Seninle gurur duyuyorum.', note: 'ты → тобой' },
          { russian: 'Мы едим суп ложкой.', turkish: 'Çorbayı kaşıkla yiyoruz.', note: 'ложка → ложкой' },
          { russian: 'Самолёт летит над морем.', turkish: 'Uçak denizin üzerinden uçuyor.', note: 'над + araç' },
          { russian: 'Кем ты хочешь стать?', turkish: 'Ne olmak istiyorsun?', note: 'кем — soru' },
        ],
        quiz: [
          { question: '"Я пишу ручкой." cümlesinde "ручкой" hangi haldedir?', options: ['Yalın', 'Belirtme', 'Araç', 'Bulunma'], correct: 2 },
          { question: '"Kalemle" Rusçada nasıl denir? (ручка — kalem)', options: ['ручке', 'ручку', 'ручкой', 'ручки'], correct: 2 },
          { question: '"с" edatıyla hangi hal kullanılır?', options: ['Yalın', 'Belirtme', 'Araç', 'Yönelme'], correct: 2 },
        ],
      },
      {
        id: '4-3',
        number: '4.3',
        title: 'İsmin -in/-den Hali (Родительный падеж)',
        explanation: `Родительный падеж (İlgi/Ayrılma Hali) Rusçanın en çok kullanılan ve en çok bağlam gerektiren halidir. "Kimin? Neyin? Nereden?" (Кого? Чего? Откуда?) sorularını yanıtlar.

**Tekil hal ekleri:**
• Eril (ünsüz): + -а → стола, брата
• Eril (-й): -й → -я → музея
• Eril (-ь): -ь → -я → словаря
• Dişil (-а): -а → -ы / -и → книги, сестры
• Dişil (-я): -я → -и → недели
• Dişil (-ь): -ь → -и → ночи
• Nötr (-о): -о → -а → окна
• Nötr (-е): -е → -я → моря

**Kullanım alanları:**
1) Sahiplik: книга студента (öğrencinin kitabı)
2) Yokluk (нет/не было/не будет):
   У меня нет книги. (Bende kitap yok.)
3) Miktar ifadesi (много, мало, сколько, немного):
   много денег (çok para), мало времени (az zaman)
4) Sayılardan sonra (2,3,4 tekil; 5+ çoğul):
   два рубля / пять рублей
5) Edatlar: без (—siz), до (kadar/-e), из (içinden), от (—dan), у (yanında)
6) Olumsuzlu cümleler:
   Я не вижу машины. (Arabayı göremiyorum — ilgi hali)`,
        examples: [
          { russian: 'У меня нет книги.', turkish: 'Bende kitap yok.', note: 'нет + ilgi hali' },
          { russian: 'Стакан воды.', turkish: 'Bir bardak su.', note: 'стакан + ilgi' },
          { russian: 'Много студентов.', turkish: 'Çok öğrenci.', note: 'много + ilgi çoğul' },
          { russian: 'Без тебя скучно.', turkish: 'Sensiz sıkıcı.', note: 'без + ilgi hali' },
          { russian: 'Я иду из школы.', turkish: 'Okuldan geliyorum.', note: 'из + ilgi hali' },
          { russian: 'До свидания!', turkish: 'Güle güle! (görüşürüz)', note: 'до + ilgi hali' },
          { russian: 'Книга брата на столе.', turkish: 'Erkek kardeşimin kitabı masada.', note: 'sahiplik' },
          { russian: 'Мало времени.', turkish: 'Az vakit.', note: 'мало + ilgi hali' },
        ],
        quiz: [
          { question: '"нет" olumsuzluğu hangi hali gerektirir?', options: ['Yalın', 'Belirtme', 'İlgi', 'Yönelme'], correct: 2 },
          { question: '"из" edatı hangi anlamda kullanılır?', options: ['Neye doğru', 'İçinden çıkma', 'Birliktelik', 'Üzerinde bulunma'], correct: 1 },
          { question: '"много денег" ifadesinde "денег" hangi haldedir?', options: ['Yalın çoğul', 'Belirtme çoğul', 'İlgi çoğul', 'Araç çoğul'], correct: 2 },
        ],
      },
      {
        id: '4-4',
        number: '4.4',
        title: 'Dönüşlü Fiiller (-ся / -сь)',
        explanation: `Dönüşlü fiiller (возвратные глаголы), -ся veya -сь eki alır. Bu ek fiilin anlamını önemli ölçüde değiştirir.

**-ся mı, -сь mı?**
• Ünsüzden sonra: -ся → учится, учиться
• Sesliden sonra: -сь → учусь, учишься, учились

**Dönüşlü fiillerin anlamları:**

1) Gerçek dönüşlülük (eylem özneye döner):
   одеваться — giyinmek (kendini giydirmek)
   мыться — yıkanmak
   бриться — tıraş olmak

2) Karşılıklı eylem:
   встречаться — buluşmak (birbirini karşılamak)
   целоваться — öpüşmek
   обниматься — sarılmak

3) Edilgen anlam:
   Дом строится. — Ev inşa ediliyor.

4) Yalnızca -ся ile var olan fiiller (dönüşlü olmaksızın kullanılmaz):
   бояться (korkmak), смеяться (gülmek), надеяться (ummak)
   улыбаться (gülümsemek), нравиться (hoşa gitmek)`,
        examples: [
          { russian: 'Я учусь в университете.', turkish: 'Ben üniversitede okuyorum.', note: 'учиться — -сь' },
          { russian: 'Она одевается быстро.', turkish: 'O hızlı giyiniyor.', note: 'gerçek dönüşlülük' },
          { russian: 'Мы встречаемся завтра.', turkish: 'Yarın buluşuyoruz.', note: 'karşılıklı' },
          { russian: 'Он боится темноты.', turkish: 'O karanlıktan korkuyor.', note: 'yalnızca -ся ile var' },
          { russian: 'Она улыбается.', turkish: 'O gülümsüyor.', note: 'yalnızca -ся ile var' },
          { russian: 'Дом строится.', turkish: 'Ev inşa ediliyor.', note: 'edilgen anlam' },
          { russian: 'Они смеются.', turkish: 'Onlar gülüyor.', note: 'смеяться' },
          { russian: 'Мне нравится эта песня.', turkish: 'Bu şarkı benim hoşuma gidiyor.', note: 'нравиться' },
        ],
        quiz: [
          { question: 'Dönüşlü fiiller hangi ek alır?', options: ['-ся / -сь', '-ть / -ти', '-ый / -ий', '-ал / -ила'], correct: 0 },
          { question: '"учусь" kelimesi neden -сь ile biter?', options: ['Ünsüzden sonra', 'Sesliden sonra', 'Her zaman', 'Soru cümlesinde'], correct: 1 },
          { question: '"бояться" fiilinin anlamı nedir?', options: ['Sevmek', 'Korkmak', 'Gülmek', 'Gülümsemek'], correct: 1 },
        ],
      },
      {
        id: '4-5',
        number: '4.5',
        title: 'Sıfatların Derecelendirilmesi',
        explanation: `Rusçada sıfatların iki tür karşılaştırması vardır: üstünlük (karşılaştırma derecesi) ve en üstünlük (superlative).

**Üstünlük derecesi (Сравнительная степень):**

Basit form (değişmez, tonlama ile):
• -ее / -ей eki: быстрый → быстрее (daha hızlı)
• -е eki (bazıları): дорогой → дороже (daha pahalı)

Düzensiz karşılaştırmalar (ezber):
• хороший → лучше (daha iyi)
• плохой → хуже (daha kötü)
• большой → больше (daha büyük)
• маленький → меньше (daha küçük)
• старый → старше (daha yaşlı)
• молодой → моложе (daha genç)

Bileşik karşılaştırma (çekimlenir):
более + sıfat: более красивый (daha güzel — resmi dil)

**En üstünlük derecesi (Превосходная степень):**

самый + sıfat (çekimlenir, en yaygın):
• самый красивый город (en güzel şehir)
• самая умная девушка (en zeki kız)

наиболее + sıfat (resmi):
наиболее важный вопрос (en önemli soru)

-ейший / -айший eki:
красивейший (en güzel — edebi)`,
        examples: [
          { russian: 'Он быстрее меня.', turkish: 'O benden daha hızlı.', note: 'быстрый → быстрее' },
          { russian: 'Эта книга лучше.', turkish: 'Bu kitap daha iyi.', note: 'düzensiz: лучше' },
          { russian: 'Москва больше Анкары.', turkish: 'Moskova Ankara\'dan büyük.', note: 'большой → больше' },
          { russian: 'Самый красивый город.', turkish: 'En güzel şehir.', note: 'самый + eril' },
          { russian: 'Самая умная студентка.', turkish: 'En zeki öğrenci kız.', note: 'самая + dişil' },
          { russian: 'Это хуже, чем я думал.', turkish: 'Bu beklediğimden dötü.', note: 'чем — dan/den' },
          { russian: 'Она моложе сестры.', turkish: 'O kız kardeşinden daha genç.', note: 'молодой → моложе' },
          { russian: 'Самое интересное кино.', turkish: 'En ilginç film.', note: 'самое + nötr' },
        ],
        quiz: [
          { question: '"хороший" kelimesinin karşılaştırma derecesi nedir?', options: ['хорошее', 'хорошее', 'лучше', 'больше'], correct: 2 },
          { question: '"En güzel şehir" Rusçada nasıl denir?', options: ['Самый красивый город', 'Самая красивый город', 'Более красивый город', 'Красивейший городе'], correct: 0 },
          { question: '"больше" hangi sıfatın karşılaştırma derecesidir?', options: ['маленький', 'большой', 'много', 'плохой'], correct: 1 },
        ],
      },
    ],
  },
  {
    id: 'blok5',
    level: 'B1.1',
    title: 'Görünüş ve Kip',
    topics: [
      {
        id: '5-1',
        number: '5.1',
        title: 'Fiilin Görünüşü (НСВ / СВ)',
        explanation: `Rusça fiilin en temel ve en zorlu özelliklerinden biri "görünüş" (вид) sistemidir. Her fiil ya tamamlanmamış (несовершенный вид — НСВ) ya da tamamlanmış (совершенный вид — СВ) görünüştedir.

**Tamamlanmamış Görünüş (НСВ — Несовершенный вид):**
• Süregelen eylem, tekrar eden eylem, alışkanlık
• "Ne yapıyordu? Ne yapardı? Ne yapar?" sorularına yanıt
• Tüm zamanlarda kullanılır (geçmiş/şimdiki/gelecek)
Örnekler: читать, писать, делать, говорить

**Tamamlanmış Görünüş (СВ — Совершенный вид):**
• Tamamlanan, sonucu olan, tek seferlik eylem
• "Ne yaptı? Ne yapacak?" sorularına yanıt
• Şimdiki zamanda KULLANILMAZ — sadece geçmiş ve gelecek
Örnekler: прочитать, написать, сделать, сказать

**НСВ / СВ çiftleri:**
| НСВ | СВ | Anlam |
|---|---|---|
| читать | прочитать | okumak |
| писать | написать | yazmak |
| говорить | сказать | söylemek |
| делать | сделать | yapmak |
| покупать | купить | satın almak |
| учить | выучить | öğrenmek |

**Pratik ipucu:**
НСВ: "Her gün okurum" — сурeci anlat
СВ: "Kitabı okudum (ve bitirdim)" — sonucu anlat`,
        examples: [
          { russian: 'Я читал книгу весь день. (НСВ)', turkish: 'Tüm gün kitap okudum (süreç).', note: 'НСВ — süre' },
          { russian: 'Я прочитал книгу. (СВ)', turkish: 'Kitabı okudum (bitirdim).', note: 'СВ — sonuç' },
          { russian: 'Она писала письмо час. (НСВ)', turkish: 'Bir saat mektup yazdı.', note: 'НСВ — süre' },
          { russian: 'Она написала письмо. (СВ)', turkish: 'Mektubu yazdı (tamamladı).', note: 'СВ — tamamlanma' },
          { russian: 'Я каждый день делаю зарядку. (НСВ)', turkish: 'Her gün egzersiz yaparım.', note: 'НСВ — alışkanlık' },
          { russian: 'Я уже сделал домашнее задание. (СВ)', turkish: 'Ödevi zaten yaptım.', note: 'СВ — уже ile' },
          { russian: 'Он долго учил слова. (НСВ)', turkish: 'Kelimeleri uzun süre öğrendi.', note: 'НСВ — долго ile' },
          { russian: 'Он выучил все слова. (СВ)', turkish: 'Tüm kelimeleri öğrendi (ezberledi).', note: 'СВ — все ile' },
        ],
        quiz: [
          { question: 'НСВ (tamamlanmamış görünüş) ne zaman kullanılır?', options: ['Sadece geçmişte', 'Sadece gelecekte', 'Süreç, alışkanlık, tekrar', 'Sonuç anlatmak için'], correct: 2 },
          { question: '"прочитать" hangi görünüşe aittir?', options: ['НСВ', 'СВ', 'İkisine de', 'Hiçbirine'], correct: 1 },
          { question: 'СВ (tamamlanmış görünüş) şimdiki zamanda kullanılır mı?', options: ['Evet, her zaman', 'Hayır, kullanılmaz', 'Sadece soruyla', 'Sadece olumsuzda'], correct: 1 },
        ],
      },
      {
        id: '5-2',
        number: '5.2',
        title: 'Ön Ekli Hareket Fiilleri',
        explanation: `Hareket fiillerine ön ek (приставка) eklendiğinde hem yön hem anlam değişir. Bu ön ekler идти/ходить ve ехать/ездить ile kullanılır.

**Önemli hareket ön ekleri:**

При- (gelme, ulaşma):
• прийти / приходить — gelmek, ulaşmak (yaya)
• приехать / приезжать — gelmek (araçla)

У- (ayrılma, gitme):
• уйти / уходить — gitmek, ayrılmak (yaya)
• уехать / уезжать — gitmek, ayrılmak (araçla)

По- (harekete başlama):
• пойти — gitmeye başlamak, yola koyulmak
• поехать — araçla yola koyulmak

В-/Вой- (içeri girme):
• войти / входить — içeri girmek

Вы- (çıkma):
• выйти / выходить — çıkmak, dışarı çıkmak

Пере- (geçme, karşıya geçme):
• перейти / переходить — geçmek (yoldan vs.)

За- (uğrama):
• зайти / заходить — uğramak, içeri girmek

**НСВ/СВ bağlantısı:**
Ön ekli СВ fiil + -ить/-ать şeklinde НСВ türer:
прийти (СВ) ↔ приходить (НСВ)`,
        examples: [
          { russian: 'Она пришла домой в 6.', turkish: 'O saat 6\'da eve geldi.', note: 'прийти — СВ' },
          { russian: 'Он уходит в 8 утра.', turkish: 'O sabah 8\'de ayrılıyor.', note: 'уходить — НСВ' },
          { russian: 'Пойдём в кино!', turkish: 'Sinemaya gidelim!', note: 'пойти — harekete davet' },
          { russian: 'Войдите!', turkish: 'Girin! (buyrun)', note: 'войти — emir' },
          { russian: 'Она вышла из комнаты.', turkish: 'O odadan çıktı.', note: 'выйти — СВ' },
          { russian: 'Зайди ко мне!', turkish: 'Bana uğra!', note: 'зайти — emir' },
          { russian: 'Переходите дорогу осторожно!', turkish: 'Yolu dikkatli geçin!', note: 'переходить — НСВ' },
          { russian: 'Поезд приехал на станцию.', turkish: 'Tren istasyona geldi.', note: 'приехать — СВ' },
        ],
        quiz: [
          { question: '"при-" ön eki hareket fiillerinde ne anlam katar?', options: ['Ayrılma, gitme', 'Gelme, ulaşma', 'İçeri girme', 'Geçme'], correct: 1 },
          { question: '"уйти" ne anlama gelir?', options: ['Gelmek', 'İçeri girmek', 'Ayrılmak, gitmek (yaya)', 'Uğramak'], correct: 2 },
          { question: '"Войдите!" emrinin anlamı nedir?', options: ['Çıkın!', 'Girin!', 'Geçin!', 'Durun!'], correct: 1 },
        ],
      },
      {
        id: '5-3',
        number: '5.3',
        title: 'Emir Kipi (Повелительное наклонение)',
        explanation: `Emir kipi (повелительное наклонение) bir eylem yapmasını istemek veya emretmek için kullanılır. Tekil ve çoğul (veya saygı) formları farklıdır.

**Emir kipi nasıl yapılır?**

1) Fiilin "они" (3. çoğul) formunu al
2) -ют/-ют ekini at
3) Kalan kısma:
   • Sesli harf kalıyorsa: doğrudan form (читают → чита- → читай!)
   • Ünsüz kalıyorsa ve vurgu ekte: -и (говорят → говор- → говори!)
   • Ünsüz kalıyorsa ve vurgu kökte: -ь (готовят → готов- → готовь!)

**Tekil (ты) ve çoğul/saygı (вы) formları:**
• читай / читайте (oku / okuyun)
• говори / говорите (konuş / konuşun)
• иди / идите (git / gidin)
• пиши / пишите (yaz / yazın)
• стой / стойте (dur / durun)

**Olumsuz emir:**
не + НСВ emir kipi:
• Не говори! (Konuşma!)
• Не трогай! (Dokunma!)
• Не уходи! (Gitme!)

**Düzensiz emir formları:**
• дать → дай/дайте (ver/verin)
• ехать → езжай/езжайте (git/gidin — araçla)
• лечь → ляг/лягте (uzan/uzanın)`,
        examples: [
          { russian: 'Читай вслух!', turkish: 'Sesli oku!', note: 'tekil emir' },
          { russian: 'Говорите медленнее!', turkish: 'Daha yavaş konuşun!', note: 'saygı çoğul' },
          { russian: 'Не трогай!', turkish: 'Dokunma!', note: 'olumsuz emir' },
          { russian: 'Дайте мне воды.', turkish: 'Bana biraz su verin.', note: 'дать → дайте' },
          { russian: 'Иди сюда!', turkish: 'Buraya gel!', note: 'идти → иди' },
          { russian: 'Не уходи!', turkish: 'Gitme!', note: 'НСВ olumsuz' },
          { russian: 'Пиши каждый день!', turkish: 'Her gün yaz!', note: 'писать → пиши' },
          { russian: 'Будьте добры!', turkish: 'Lütfen (nezaket ifadesi).', note: 'быть → будьте' },
        ],
        quiz: [
          { question: '"Читай!" emrinin saygı/çoğul formu nedir?', options: ['Читаешь!', 'Читайте!', 'Читает!', 'Читали!'], correct: 1 },
          { question: 'Olumsuz emir (не + ...) hangi görünüşü kullanır?', options: ['СВ', 'НСВ', 'Her ikisi de olur', 'Sadece geçmiş'], correct: 1 },
          { question: '"дать" fiilinin emir kipi nedir?', options: ['дай', 'дайте', 'давай', 'дай / дайте'], correct: 3 },
        ],
      },
      {
        id: '5-4',
        number: '5.4',
        title: 'Dilek-Şart Kipi (Сослагательное наклонение)',
        explanation: `Dilek-şart kipi (сослагательное наклонение), gerçek olmayan, varsayılan veya arzu edilen durumları ifade eder. Yapı basittir: geçmiş zaman formu + частица бы.

**Yapı:**
Fiil (geçmiş zaman) + бы

"бы" parçacığı cümlede herhangi bir yerde olabilir, ama genellikle fiilin yanında yer alır.

**Kullanım alanları:**

1) Gerçekleşmesi güç veya imkânsız durum:
   Я бы хотел жить в Париже. (Paris'te yaşamak isterdim.)
   Если бы у меня было время... (Zamanım olsaydı...)

2) Kibarca istek/rica:
   Я бы хотел кофе. (Bir kahve istiyorum — kibarca)
   Вы не могли бы помочь? (Yardım edebilir misiniz?)

3) Dilek/öneri:
   Ты бы отдохнул! (Biraz dinlenseydin!)
   Лучше бы ты молчал. (Sussaydın daha iyi olurdu.)

4) чтобы bağlacıyla (amaç/istek):
   Я хочу, чтобы ты пришёл. (Gelmeni istiyorum.)
   Она просит, чтобы мы помогли. (Yardım etmemizi istiyor.)

**Özne yoksa что + бы = чтобы:**
Я пришёл, чтобы помочь. (Yardım etmek için geldim.)`,
        examples: [
          { russian: 'Я бы хотел кофе.', turkish: 'Bir kahve isterdim.', note: 'kibarca istek' },
          { russian: 'Если бы я знал...', turkish: 'Bilseydim...', note: 'varsayım' },
          { russian: 'Ты бы поел что-нибудь.', turkish: 'Bir şeyler yesen iyi olur.', note: 'öneri' },
          { russian: 'Я хочу, чтобы ты пришёл.', turkish: 'Gelmeni istiyorum.', note: 'чтобы + dilek-şart' },
          { russian: 'Она хотела бы поехать в Турцию.', turkish: 'Türkiye\'ye gitmek isterdi.', note: 'arzu' },
          { russian: 'Вы не могли бы открыть окно?', turkish: 'Pencereyi açabilir misiniz?', note: 'kibarca rica' },
          { russian: 'Лучше бы ты промолчал.', turkish: 'Sussaydın daha iyi olurdu.', note: 'pişmanlık' },
          { russian: 'Я пришёл, чтобы помочь.', turkish: 'Yardım etmek için geldim.', note: 'amaç cümlesi' },
        ],
        quiz: [
          { question: 'Dilek-şart kipi nasıl yapılır?', options: ['Mastar + бы', 'Geçmiş zaman + бы', 'Şimdiki zaman + бы', 'Gelecek zaman + бы'], correct: 1 },
          { question: '"Я бы хотел кофе." cümlesinin tonu nedir?', options: ['Emir', 'Şikayet', 'Kibarca istek', 'Soru'], correct: 2 },
          { question: '"чтобы" bağlacı hangi kiple birlikte kullanılır?', options: ['Emir kipi', 'Dilek-şart kipi', 'Şimdiki zaman', 'Gelecek zaman'], correct: 1 },
        ],
      },
      {
        id: '5-5',
        number: '5.5',
        title: 'Sıfat ve Zamirlerin Tam Hal Çekimi',
        explanation: `Rusçada sıfatlar ve zamirler, bağlı oldukları isimle birlikte 6 halde çekilir. Bu tablo tüm sistemi özetler.

**Eril/Nötr sıfat çekimi (новый/новое):**
| Hal | Soru | Eril | Nötr |
|---|---|---|---|
| Yalın | кто/что | новый | новое |
| İlgi | кого/чего | нового | нового |
| Yönelme | кому/чему | новому | новому |
| Belirtme | кого/что | нового/новый | новое |
| Araç | кем/чем | новым | новым |
| Bulunma | о ком/чём | новом | новом |

**Dişil sıfat çekimi (новая):**
| Hal | Form |
|---|---|
| Yalın | новая |
| İlgi | новой |
| Yönelme | новой |
| Belirtme | новую |
| Araç | новой |
| Bulunma | новой |

**Кто/Что zamiri çekimi:**
| Hal | Кто | Что |
|---|---|---|
| Yalın | кто | что |
| İlgi | кого | чего |
| Yönelme | кому | чему |
| Belirtme | кого | что |
| Araç | кем | чем |
| Bulunma | о ком | о чём |`,
        examples: [
          { russian: 'Я вижу нового студента.', turkish: 'Yeni öğrenciyi görüyorum.', note: 'belirtme — canlı eril' },
          { russian: 'Я говорю о новом фильме.', turkish: 'Yeni film hakkında konuşuyorum.', note: 'bulunma hali' },
          { russian: 'Дай новому студенту книгу.', turkish: 'Yeni öğrenciye kitabı ver.', note: 'yönelme hali' },
          { russian: 'Я доволен новым домом.', turkish: 'Yeni evden memnunum.', note: 'araç hali' },
          { russian: 'У нового студента нет книги.', turkish: 'Yeni öğrencinin kitabı yok.', note: 'ilgi hali' },
          { russian: 'Кому ты звонил?', turkish: 'Kimi aradın?', note: 'кому — yönelme soru' },
          { russian: 'О чём вы говорите?', turkish: 'Neden (ne hakkında) konuşuyorsunuz?', note: 'о чём — bulunma' },
          { russian: 'С кем ты пришёл?', turkish: 'Kiminle geldin?', note: 'с кем — araç hali' },
        ],
        quiz: [
          { question: '"новый" sıfatı ilgi halinde eril için nasıl değişir?', options: ['нового', 'новую', 'новом', 'новому'], correct: 0 },
          { question: '"О чём вы говорите?" cümlesinin anlamı nedir?', options: ['Kimden konuşuyorsunuz?', 'Nerede konuşuyorsunuz?', 'Ne hakkında konuşuyorsunuz?', 'Kiminle konuşuyorsunuz?'], correct: 2 },
          { question: '"кому" hangi halin soru zamiridir?', options: ['İlgi', 'Yönelme', 'Araç', 'Bulunma'], correct: 1 },
        ],
      },
    ],
  },
  {
    id: 'blok6',
    level: 'B1+ / B2',
    title: 'İleri Düzey Yapılar',
    topics: [
      {
        id: '6-1',
        number: '6.1',
        title: 'Sıfat-Fiiller / Ortaçlar (Причастие)',
        explanation: `Причастие (ortaç), hem sıfat hem fiil özelliği taşıyan bir yapıdır. Türkçedeki "-an/-en, -mış/-miş" gibi sıfat-fiil eklerine benzer, ancak Rusçada dört ayrı ortaç türü vardır.

**1. Etken Şimdiki Zaman Ortacı (НСВ, aktif):**
Fiil tabanı + -ущ-/-ющ- (1. tip) veya -ащ-/-ящ- (2. tip) + sıfat eki
• читающий студент — okuyan öğrenci
• говорящий ребёнок — konuşan çocuk
• живущий здесь человек — burada yaşayan kişi

**2. Etken Geçmiş Zaman Ortacı (aktif):**
Geçmiş zaman kökü + -вш- (sesli sonrası) veya -ш- (ünsüz sonrası) + sıfat eki
• читавший книгу — kitabı okumuş olan
• пришедший поздно — geç gelmiş olan

**3. Edilgen Şimdiki Zaman Ortacı:**
• -ем-/-ом- (1. tip): читаемый — okunan (süreçte)
• -им- (2. tip): любимый — sevilen

**4. Edilgen Geçmiş Zaman Ortacı:**
• -нн-/-нн- / -т- / -енн-:
  прочитанный — okunmuş, купленный — satın alınmış
  открытый — açılmış, сделанный — yapılmış

**Ortaçlar sıfat gibi çekilir!**
Bağlı oldukları ismin cinsiyeti, sayısı ve haline göre değişirler.`,
        examples: [
          { russian: 'читающий студент', turkish: 'okuyan öğrenci', note: 'etken şimdiki zaman' },
          { russian: 'говорящая девушка', turkish: 'konuşan kız', note: 'dişil form' },
          { russian: 'прочитанная книга', turkish: 'okunmuş kitap', note: 'edilgen geçmiş' },
          { russian: 'сделанная работа', turkish: 'yapılmış iş', note: 'dişil edilgen' },
          { russian: 'открытое окно', turkish: 'açık pencere', note: 'nötr edilgen' },
          { russian: 'Студент, читающий книгу...', turkish: 'Kitap okuyan öğrenci...', note: 'ortaç grubu' },
          { russian: 'любимый город', turkish: 'sevgili şehir (sevilen)', note: 'edilgen şimdiki' },
          { russian: 'пришедший вовремя', turkish: 'zamanında gelmiş olan', note: 'etken geçmiş' },
        ],
        quiz: [
          { question: '"читающий" ortacı ne anlama gelir?', options: ['Okumuş olan', 'Okuyacak olan', 'Okuyan (şu an)', 'Okutulmuş'], correct: 2 },
          { question: '"прочитанная книга" ne anlama gelir?', options: ['Okunacak kitap', 'Okunmuş kitap', 'Okuyan kitap', 'Kitap okumak'], correct: 1 },
          { question: 'Ortaçlar hangi sözcük türü gibi çekilir?', options: ['Fiil', 'Zarf', 'Sıfat', 'Zamir'], correct: 2 },
        ],
      },
      {
        id: '6-2',
        number: '6.2',
        title: 'Zarf-Fiiller / Ulaçlar (Деепричастие)',
        explanation: `Деепричастие (ulaç/zarf-fiil) hem zarfın hem de fiilin özelliğini taşır. Türkçedeki "-arak/-erek, -ıp/-ip" gibi yapılara benzer. Ana fiilin öznesinin ikincil eylemini anlatır.

**Tamamlanmamış Görünüş Ulaçları (НСВ Деепричастие):**
Şimdiki zaman tabanı + -а/-я:
• читать → читая (okuyarak)
• говорить → говоря (konuşarak)
• жить → живя (yaşayarak)

**Tamamlanmış Görünüş Ulaçları (СВ Деепричастие):**
Geçmiş zaman tabanı + -в/-вши/-ши:
• прочитать → прочитав (okuyunca/okuduktan sonra)
• сказать → сказав (söyleyince)
• придти → придя / прийдя (gelince)

**Kritik kural:**
Ulaçtaki özne ile ana cümlenin öznesi AYNI kişi olmalıdır!
✓ Читая книгу, он улыбался. (Kitabı okurken gülümsüyordu.)
✗ Читая книгу, ему было скучно. (YANLIŞ — özne farklı)

**Kullanım:**
• Eş zamanlı eylem (НСВ): Улыбаясь, она говорила. (Gülümseyerek konuşuyordu.)
• Ardışık eylem (СВ): Прочитав письмо, он ответил. (Mektubu okuduktan sonra cevapladı.)`,
        examples: [
          { russian: 'Читая книгу, он улыбался.', turkish: 'Kitabı okurken gülümsüyordu.', note: 'НСВ — eş zamanlı' },
          { russian: 'Говоря тихо, она вышла.', turkish: 'Alçak sesle konuşarak çıktı.', note: 'НСВ ulaç' },
          { russian: 'Прочитав письмо, он ответил.', turkish: 'Mektubu okuduktan sonra cevapladı.', note: 'СВ — ardışık' },
          { russian: 'Придя домой, она устала.', turkish: 'Eve geldiğinde yorulmuştu.', note: 'СВ ulaç' },
          { russian: 'Не зная ответа, он молчал.', turkish: 'Cevabı bilmeyerek sustu.', note: 'olumsuz ulaç' },
          { russian: 'Улыбаясь, она сказала...', turkish: 'Gülümseyerek dedi ki...', note: 'стиль — edebi' },
          { russian: 'Сделав работу, он отдохнул.', turkish: 'İşi bitirdikten sonra dinlendi.', note: 'СВ + ardışık' },
          { russian: 'Живя в Москве, он выучил русский.', turkish: 'Moskova\'da yaşayarak Rusça öğrendi.', note: 'НСВ + süre' },
        ],
        quiz: [
          { question: 'НСВ ulaçları nasıl yapılır?', options: ['Geçmiş kök + -в', 'Şimdiki kök + -а/-я', 'Mastar + бы', 'Emir kipi + -а'], correct: 1 },
          { question: '"Прочитав письмо, он ответил." cümlesinin anlamı nedir?', options: ['Mektup yazarken cevapladı.', 'Mektubu okuduktan sonra cevapladı.', 'Mektubu okumadan cevapladı.', 'Cevaplarken okudu.'], correct: 1 },
          { question: 'Ulaçta özne ile ana cümlenin öznesi aynı mı olmalıdır?', options: ['Hayır, farklı olabilir', 'Evet, aynı olmalıdır', 'Sadece СВ için aynı', 'Sadece НСВ için aynı'], correct: 1 },
        ],
      },
      {
        id: '6-3',
        number: '6.3',
        title: 'Sıfatların Kısa Formları',
        explanation: `Rusçada bazı sıfatların uzun formunun yanı sıra kısa formu (краткая форма прилагательных) da vardır. Kısa form yalnızca yüklem olarak kullanılır — ismin önünde sıfat olarak değil.

**Kısa form nasıl yapılır?**
Uzun formun sonu (-ый/-ий/-ая/-ое/-ые) kaldırılır, cinsiyete göre ek eklenir:
• Eril: son ek yok (veya -ен/-он): красивый → красив
• Dişil: -а: красивая → красива
• Nötr: -о: красивое → красиво
• Çoğul: -ы/-и: красивые → красивы

**Kısa formun kullanıldığı durumlar:**
1) Geçici durum veya özellik anlatmak:
   Она больна. (O hasta — şu an)
   Он готов. (O hazır.)
2) Nesneye bağlı özellik:
   Дорога длинна. (Yol uzundur.)
3) Kalıplaşmış ifadeler:
   рад (memnun), должен (zorunda), готов (hazır), виноват (suçlu)

**Önemli kısa form kelimeler (ezber):**
• рад / рада / рады — memnun (tam forma dönmez!)
• должен / должна / должны — -meli/-malı, zorunda
• готов / готова / готовы — hazır
• виноват / виновата — suçlu
• свободен / свободна — serbest`,
        examples: [
          { russian: 'Он рад тебя видеть.', turkish: 'Seni gördüğüne memnun.', note: 'рад — kısa form' },
          { russian: 'Она больна.', turkish: 'O hasta.', note: 'больной → больна' },
          { russian: 'Я должен идти.', turkish: 'Ben gitmeliyim.', note: 'должен — eril' },
          { russian: 'Она должна работать.', turkish: 'O çalışmak zorunda.', note: 'должна — dişil' },
          { russian: 'Мы готовы.', turkish: 'Biz hazırız.', note: 'готовы — çoğul' },
          { russian: 'Кто виноват?', turkish: 'Kim suçlu?', note: 'виноват' },
          { russian: 'Комната свободна.', turkish: 'Oda serbest (boş).', note: 'свободна — dişil' },
          { russian: 'Они рады нашему приезду.', turkish: 'Gelişimize sevindiler.', note: 'рады — çoğul' },
        ],
        quiz: [
          { question: '"должен" kelimesi ne anlama gelir?', options: ['İstiyorum', 'Zorundayım / -meli', 'Hazırım', 'Memnunum'], correct: 1 },
          { question: '"Она больна." cümlesinde "больна" nedir?', options: ['Uzun form sıfat', 'Zarf', 'Kısa form sıfat', 'Fiil'], correct: 2 },
          { question: '"рад" kelimesi tam (uzun) forma döndürülebilir mi?', options: ['Evet, радный', 'Evet, радой', 'Hayır, yalnızca kısa form', 'Sadece dişil için'], correct: 2 },
        ],
      },
      {
        id: '6-4',
        number: '6.4',
        title: 'Dolaylı Anlatım (чтобы, который)',
        explanation: `Dolaylı anlatım (косвенная речь) ve bağlı cümlecikler, Rusçada ileri düzey cümle yapıları oluşturur.

**Dolaylı soru (что/кто/где/когда ile):**
Doğrudan: "Где ты живёшь?" → Dolaylı: Он спросил, где я живу.
Doğrudan: "Ты придёшь?" → Dolaylı: Она спросила, приду ли я.

"ли" parçacığı evet/hayır sorularında kullanılır:
Он спросил, знаю ли я русский. (Rusça bilip bilmediğimi sordu.)

**Dolaylı emir/istek (чтобы ile):**
Doğrudan: "Приди!" → Dolaylı: Он сказал, чтобы я пришёл.
"чтобы" + dilek-şart kipi (бы + geçmiş zaman)
Она просит, чтобы мы помогли. (Yardım etmemizi istiyor.)

**который — bağlı sıfat cümlecikleri:**
"который" (hangi, -an/-en) bağlı cümleleri kurar, İngilizce "which/who" gibi:
• Студент, который читает книгу... (Kitap okuyan öğrenci...)
• Книга, которую я читаю... (Okuduğum kitap...)
• который, cinsiyete ve hale göre çekilir!

**Dikkat — çekim:**
Книга (dişil) → которую (belirtme hali dişil):
Это книга, которую я купил. (Bu aldığım kitap.)`,
        examples: [
          { russian: 'Он сказал, что устал.', turkish: 'O yorulduğunu söyledi.', note: 'dolaylı anlatım' },
          { russian: 'Она спросила, где я живу.', turkish: 'Nerede oturduğumu sordu.', note: 'dolaylı soru' },
          { russian: 'Он спросил, приду ли я.', turkish: 'Gelip gelmeyeceğimi sordu.', note: 'ли — evet/hayır' },
          { russian: 'Он сказал, чтобы я пришёл.', turkish: 'Gelmemi söyledi.', note: 'чтобы + dilek-şart' },
          { russian: 'Студент, который читает...', turkish: 'Okuyan öğrenci...', note: 'который — eril yalın' },
          { russian: 'Книга, которую я читаю...', turkish: 'Okuduğum kitap...', note: 'которую — dişil belirtme' },
          { russian: 'Город, в котором я живу.', turkish: 'Yaşadığım şehir.', note: 'котором — eril bulunma' },
          { russian: 'Она просит, чтобы мы помогли.', turkish: 'Yardım etmemizi istiyor.', note: 'çтобы + istek' },
        ],
        quiz: [
          { question: '"который" kelimesi nasıl kullanılır?', options: ['Değişmez bir bağlaç', 'Cinsiyete ve hale göre çekilir', 'Sadece eril için', 'Sadece yalın halde'], correct: 1 },
          { question: '"ли" parçacığı ne zaman kullanılır?', options: ['Her dolaylı anlatımda', 'Evet/hayır sorularında', 'Sadece istemlerde', 'Sadece geçmişte'], correct: 1 },
          { question: '"Он сказал, что устал." cümlesinde "что" ne işlevi görür?', options: ['Soru kelimesi', 'Dolaylı anlatım bağlacı', 'Zamir', 'Edat'], correct: 1 },
        ],
      },
      {
        id: '6-5',
        number: '6.5',
        title: 'Sayıların Hal Çekimi',
        explanation: `Rusça sayıların tüm hallere göre çekimi, dilin en zorlu konularından biridir. Sayılar kullanıldıkları hale göre çekilir ve ardından gelen isimler de buna göre değişir.

**1 (один) çekimi:**
| Hal | Eril | Dişil | Nötr |
|---|---|---|---|
| Yalın | один | одна | одно |
| İlgi | одного | одной | одного |
| Yönelme | одному | одной | одному |
| Belirtme | одного/один | одну | одно |
| Araç | одним | одной | одним |
| Bulunma | одном | одной | одном |

**2 (два/две) çekimi:**
| Hal | Eril/Nötr | Dişil |
|---|---|---|
| Yalın | два | две |
| İlgi | двух | двух |
| Yönelme | двум | двум |
| Belirtme | двух/два | двух/две |
| Araç | двумя | двумя |
| Bulunma | двух | двух |

**5-20 (пять) çekimi:**
| Hal | Form |
|---|---|
| Yalın | пять |
| İlgi | пяти |
| Yönelme | пяти |
| Belirtme | пять |
| Araç | пятью |
| Bulunma | пяти |

**Büyük sayılarda zorluk:**
500 = пятьсот → araç hali: пятьюстами
Örnek: с пятьюстами рублями (beşyüz ruble ile)`,
        examples: [
          { russian: 'У меня нет одного рубля.', turkish: 'Bir rublem yok.', note: 'одного — ilgi eril' },
          { russian: 'Дай мне двум студентам.', turkish: 'İki öğrenciye ver.', note: 'двум — yönelme' },
          { russian: 'Я доволен пятью книгами.', turkish: 'Beş kitaptan memnunum.', note: 'пятью — araç' },
          { russian: 'О двух друзьях.', turkish: 'İki arkadaş hakkında.', note: 'двух — bulunma' },
          { russian: 'С тремя детьми.', turkish: 'Üç çocukla.', note: 'тремя — araç' },
          { russian: 'Нет пяти минут.', turkish: 'Beş dakika yok.', note: 'пяти — ilgi' },
          { russian: 'С пятьюстами рублями.', turkish: 'Beşyüz ruble ile.', note: 'karmaşık araç hali' },
          { russian: 'Около ста человек.', turkish: 'Yaklaşık yüz kişi.', note: 'ста — ilgi hali' },
        ],
        quiz: [
          { question: '"два" sayısı dişil isimlerle nasıl değişir?', options: ['iki для dişil', 'два her zaman', 'две', 'двух'], correct: 2 },
          { question: '"пять" sayısı araç halinde nasıl olur?', options: ['пяти', 'пятью', 'пятей', 'пяты'], correct: 1 },
          { question: '"один" sayısının eril ilgi hali nedir?', options: ['одному', 'одним', 'одного', 'одной'], correct: 2 },
        ],
      },
    ],
  },
]
