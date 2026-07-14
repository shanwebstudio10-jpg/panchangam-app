import panchangamRef from '../data/panchangam.json'

// 确定性哈希函数，相同日期返回相同结果
function dateHash(date) {
  const str = date.toISOString().split('T')[0]
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

// 格式化时间为 12 小时制
function fmt12(h, m) {
  const p = h >= 12 ? 'PM' : 'AM'
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${h12}:${String(m).padStart(2, '0')} ${p}`
}

// 基于 Rahu Kalam 标准时间表
const RAHU_TABLE = [
  [16, 30, 18, 0],   // 日
  [7, 30, 9, 0],    // 一
  [9, 0, 10, 30],   // 二
  [13, 30, 15, 0],  // 三
  [10, 30, 12, 0],  // 四
  [11, 30, 13, 0],  // 五
  [15, 0, 16, 30],  // 六
]
const YAMA_TABLE = [
  [15, 0, 16, 30],
  [6, 0, 7, 30],
  [7, 30, 9, 0],
  [12, 0, 13, 30],
  [9, 0, 10, 30],
  [10, 0, 11, 30],
  [13, 30, 15, 0],
]
const GULIKA_TABLE = [
  [18, 0, 19, 30],
  [9, 0, 10, 30],
  [10, 30, 12, 0],
  [15, 0, 16, 30],
  [12, 0, 13, 30],
  [13, 0, 14, 30],
  [16, 30, 18, 0],
]

// 计算月出日落（基于月份的近似值）
function sunTimes(month) {
  const sin = Math.sin((month - 2) * Math.PI / 6)
  const riseH = 6 + Math.round(sin * 0.5)
  const setH = 18 - Math.round(sin * 0.5)
  return { riseH, setH }
}

// 获取指定日期的完整 Panchangam 数据
export function getPanchangamForDate(date) {
  const hash = dateHash(date)
  const dow = date.getDay()
  const month = date.getMonth()
  const { riseH, setH } = sunTimes(month)

  // 月相近似计算（以已知新月为基准）
  const knownNewMoon = new Date(2025, 0, 29)
  const daysSince = (date - knownNewMoon) / 86400000
  const lunarCycle = 29.53
  const tithiRaw = ((daysSince % lunarCycle) + lunarCycle) % lunarCycle
  const tithiIdx = Math.floor(tithiRaw)
  const pakshaIdx = tithiIdx < 15 ? 1 : 0 // 1=Shukla, 0=Krishna
  const tithiNum = tithiIdx < 15 ? tithiIdx : tithiIdx - 15
  const tithiName = tithiNum === 14
    ? (pakshaIdx === 1 ? 'Purnima' : 'Amavasya')
    : panchangamRef.tithis[tithiNum]

  const nakIdx = hash % panchangamRef.nakshatras.length
  const yogaIdx = (hash * 7) % panchangamRef.yogas.length
  const karanIdx = (hash * 3) % panchangamRef.karanas.length
  const masamIdx = (month + 9) % 12
  const rituIdx = Math.floor(month / 2)

  const r = RAHU_TABLE[dow]
  const y = YAMA_TABLE[dow]
  const g = GULIKA_TABLE[dow]

  return {
    date: date.toISOString().split('T')[0],
    day: panchangamRef.days[dow],
    dayHindi: panchangamRef.daysHindi[dow],
    sunrise: fmt12(riseH, (hash % 30) + 10),
    sunset: fmt12(setH, 60 - (hash % 30) - 10),
    tithi: `${panchangamRef.pakshas[pakshaIdx]} ${tithiName}`,
    tithiShort: tithiName,
    paksha: panchangamRef.pakshas[pakshaIdx],
    nakshatra: panchangamRef.nakshatras[nakIdx],
    yoga: panchangamRef.yogas[yogaIdx],
    karana: panchangamRef.karanas[karanIdx],
    rahukalam: `${fmt12(r[0], r[1])} — ${fmt12(r[2], r[3])}`,
    yamagandam: `${fmt12(y[0], y[1])} — ${fmt12(y[2], y[3])}`,
    gulikai: `${fmt12(g[0], g[1])} — ${fmt12(g[2], g[3])}`,
    masam: panchangamRef.masams[masamIdx],
    samvatsara: 'Shubhakruthu',
    ayanam: (month >= 0 && month < 6) ? 'Uttarayana' : 'Dakshinayana',
    ritu: panchangamRef.ritus[rituIdx],
    rashi: panchangamRef.rashis[nakIdx % 12],
    isPurnima: tithiName === 'Purnima',
    isAmavasya: tithiName === 'Amavasya',
    isEkadashi: tithiName === 'Ekadashi',
  }
}

// 获取 Muhurtham（吉时）数据
export function getMuhurthamForDate(date) {
  const p = getPanchangamForDate(date)
  const dow = date.getDay()
  const hash = dateHash(date)

  const activities = [
    'Marriage', 'Gruhapravesam', 'Business Start', 'Travel',
    'Education', 'Property Purchase', 'Naming Ceremony', 'Upanayanam'
  ]

  // 根据星期和 Tithi 判断各项活动是否吉时
  const goodDays = {
    'Marriage': [0, 1, 3, 5],
    'Gruhapravesam': [1, 3, 4, 5],
    'Business Start': [0, 2, 4, 5],
    'Travel': [0, 1, 3, 4],
    'Education': [1, 3, 4, 5, 6],
    'Property Purchase': [1, 3, 5],
    'Naming Ceremony': [1, 3, 4, 5],
    'Upanayanam': [1, 3, 5],
  }

  const shubhaYogas = ['Ayushman', 'Saubhagya', 'Shobhana', 'Sukarman', 'Dhriti', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra']
  const shubhaNakshatras = ['Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Swati', 'Anuradha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Revati']

  return activities.map((act, i) => {
    const dayGood = goodDays[act].includes(dow)
    const yogaGood = shubhaYogas.includes(p.yoga)
    const nakGood = shubhaNakshatras.includes(p.nakshatra)
    const tithiGood = !p.isAmavasya && !['Chaturthi', 'Navami', 'Chaturdashi'].includes(p.tithiShort)

    let score = 0
    if (dayGood) score += 2
    if (yogaGood) score += 1
    if (nakGood) score += 1
    if (tithiGood) score += 1

    // 加入一些日期相关的变化
    score += (hash + i) % 3

    let quality, color
    if (score >= 5) { quality = 'Excellent'; color = 'emerald' }
    else if (score >= 3) { quality = 'Good'; color = 'yellow' }
    else if (score >= 2) { quality = 'Moderate'; color = 'orange' }
    else { quality = 'Avoid'; color = 'red' }

    // 生成建议时间段
    const startH = 6 + ((hash + i * 3) % 10)
    const endH = startH + 1

    return {
      activity: act,
      time: `${fmt12(startH, 0)} — ${fmt12(endH, 30)}`,
      quality,
      color,
      score,
      reasons: [
        dayGood ? 'Favorable weekday' : 'Unfavorable weekday',
        yogaGood ? 'Shubha Yoga' : 'Check yoga',
        nakGood ? 'Shubha Nakshatra' : 'Check nakshatra',
        tithiGood ? 'Good Tithi' : 'Check tithi',
      ]
    }
  })
}

// 获取 12 宫 Rasi Palan
export function getRasiPalan(date) {
  const hash = dateHash(date)
  const rashis = panchangamRef.rashis

  const predictionSets = [
    [
      'Career growth is on the horizon. Your efforts will be recognized by superiors. Stay focused on long-term goals.',
      'Financial gains through unexpected sources. Avoid lending money today. Save for future investments.',
      'Health needs attention. Practice yoga or pranayama. Avoid heavy food in the evening.',
      'Family harmony prevails. A family gathering may bring joy. Resolve old misunderstandings.',
    ],
    [
      'A productive day at work. New opportunities may knock. Be ready to take calculated risks.',
      'Stable financial period. Good day for planning investments. Avoid impulse purchases.',
      'Energy levels are high. Channel it into physical activity. Mental clarity improves.',
      'Romance is in the air. Express your feelings. Singles may meet someone interesting.',
    ],
    [
      'Challenges at workplace may test patience. Stay calm and diplomatic. Solutions will emerge.',
      'Expenses may rise unexpectedly. Review your budget. Avoid speculative investments.',
      'Minor health issues possible. Rest well and maintain hydration. Consult doctor if needed.',
      'Family support is strong. Elderly members may need attention. Spend quality time together.',
    ],
    [
      'Creative projects will flourish. Artists and writers find inspiration. Share your ideas boldly.',
      'Mixed financial day. Income is steady but expenses need monitoring. Avoid risky ventures.',
      'Good health day. Your immunity is strong. Maintain your exercise routine for best results.',
      'Social connections strengthen. Friends may seek your advice. Be generous with your time.',
    ],
    [
      'Leadership qualities shine today. Take initiative in group settings. Recognition follows.',
      'Property-related matters favor you. Good day for real estate decisions. Documents need careful review.',
      'Stress management is important. Meditation helps. Avoid overthinking and get adequate sleep.',
      'Educational pursuits bear fruit. Students perform well. Good day for competitive exams.',
    ],
    [
      'Travel plans materialize. Short trips prove beneficial. Business travel may bring contracts.',
      'Business partnerships show promise. Negotiations go in your favor. Read documents thoroughly.',
      'Joint pains or backache possible. Gentle stretching helps. Maintain proper posture while working.',
      'Spiritual growth accelerates. Meditation and prayer bring peace. Visit a temple if possible.',
    ],
    [
      'Communication skills are sharp. Presentations and meetings go well. Write that important email.',
      'Pending payments may arrive. Good day for clearing debts. Avoid new borrowings.',
      'Eye strain possible from screens. Take regular breaks. Eat foods rich in Vitamin A.',
      'Children bring happiness. Their achievements make you proud. Guide them patiently.',
    ],
    [
      'Technical skills are valued. IT professionals may get breakthrough opportunities. Update your skills.',
      'Long-term investments show green shoots. Patience with mutual funds pays off. Avoid day trading.',
      'Digestive system needs care. Eat light, fresh food. Avoid spicy and oily meals today.',
      'Neighbors play a positive role. Community events may be rewarding. Participate actively.',
    ],
    [
      'A day of transformation. Old patterns break, new ones form. Embrace change positively.',
      'Inheritance or family wealth matters may arise. Handle with sensitivity and legal advice.',
      'Emotional well-being is crucial. Talk to loved ones about your feelings. Journaling helps.',
      'Intimate relationships deepen. Trust builds through honest communication. Be vulnerable.',
    ],
    [
      'Foreign connections prove beneficial. Overseas opportunities arise. Visa matters may progress.',
      'Higher education investments yield results. Good day for applying to courses or scholarships.',
      'Leg or thigh discomfort possible. Gentle walks improve circulation. Avoid sitting too long.',
      'Religious or philosophical discussions enlighten. Read sacred texts for guidance and peace.',
    ],
    [
      'Professional networking opens doors. Attend that seminar or conference. Connect genuinely.',
      'Unexpected gains possible through networking. A friend may bring a lucrative opportunity.',
      'Respiratory health needs attention. Deep breathing exercises help. Avoid dusty environments.',
      'Group activities bring joy. Team sports or community service fulfills you. Collaborate.',
    ],
    [
      'Isolation may bring clarity. Spend time alone to plan your next big move. Introspect deeply.',
      'Hidden expenses surface. Review all subscriptions and recurring payments. Cut unnecessary costs.',
      'Sleep quality matters tonight. Maintain a consistent bedtime. Avoid screens before sleep.',
      'Secret admirers may reveal themselves. Mysteries unfold. Trust your intuition today.',
    ],
  ]

  return rashis.map((rasi, i) => {
    const setIdx = (hash + i) % predictionSets.length
    const predIdx = (hash + i * 2) % predictionSets[setIdx].length
    const overallScore = 2 + ((hash + i * 7) % 4) // 2-5

    let rating
    if (overallScore >= 5) rating = 'Excellent'
    else if (overallScore >= 4) rating = 'Good'
    else if (overallScore >= 3) rating = 'Average'
    else rating = 'Challenging'

    return {
      ...rasi,
      prediction: predictionSets[setIdx][predIdx],
      rating,
      score: overallScore,
      luckyNumber: ((hash + i) % 9) + 1,
      luckyColor: ['Red','Orange','Yellow','Green','Blue','Indigo','Violet','White','Gold'][(hash + i) % 9],
      remedial: 'Chant {rasi} Beej Mantra 108 times and offer red flowers to Lord Hanuman.',
    }
  })
}

// 格式化日期为可读字符串
export function formatDate(date) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

// 获取未来 N 天的节日
export function getUpcomingFestivals(festivals, n = 5) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return festivals
    .filter(f => new Date(f.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, n)
}

// 计算距离某天的天数
export function daysUntil(dateStr) {
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target - today) / 86400000)
}