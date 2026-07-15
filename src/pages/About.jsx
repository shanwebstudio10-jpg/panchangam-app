import { Flame, Star, Calendar, Clock, BookOpen, Users } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { translate } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title">{translate('about.title')}</h1>
        <p className="section-subtitle">{translate('about.subtitle')}</p>
      </div>

      {/* Hero Card */}
      <div className="card-glow p-8 md:p-12 mb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-500 to-maroon-700 flex items-center justify-center">
              <Flame size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-bark-300 dark:text-cream-100">పంచాంగం</h2>
              <p className="text-sm text-bark-50/50 dark:text-cream-100/30">Pancha + Angam = Five Limbs</p>
            </div>
          </div>
          <p className="text-bark-50/70 dark:text-cream-100/50 leading-relaxed mb-4">
            The Panchangam is the traditional Hindu calendar and almanac that follows a lunisolar system. It has been used for millennia to determine auspicious and inauspicious times for daily activities, rituals, festivals, and ceremonies.
          </p>
          <p className="text-bark-50/70 dark:text-cream-100/50 leading-relaxed">
            The word "Panchangam" comes from Sanskrit — <strong className="text-bark-300 dark:text-cream-100">Pancha</strong> (five) and <strong className="text-bark-300 dark:text-cream-100">Angam</strong> (limbs). It tracks five fundamental elements of time that together describe the quality and nature of each day.
          </p>
        </div>
      </div>

      {/* Five Elements */}
      <h2 className="section-title mb-8">The Five Limbs of Panchangam</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: Star, title: 'Tithi', subtitle: 'Lunar Day',
            desc: 'The angular relationship between the Sun and Moon. There are 30 Tithis in a lunar month — 15 in Shukla Paksha (waxing) and 15 in Krishna Paksha (waning). Each Tithi governs specific activities and has its own deity and significance.',
            color: 'from-indigo-400 to-purple-600'
          },
          {
            icon: Star, title: 'Nakshatra', subtitle: 'Lunar Mansion',
            desc: 'The constellation the Moon is passing through. There are 27 Nakshatras, each spanning 13°20\' of the zodiac. Nakshatras influence personality, compatibility, and are crucial for Muhurtham selection.',
            color: 'from-purple-400 to-pink-600'
          },
          {
            icon: Clock, title: 'Yoga', subtitle: 'Luni-Solar Angle',
            desc: 'The sum of the longitudes of the Sun and Moon divided by 13°20\'. There are 27 Yogas, each with its own nature — some Shubha (auspicious) like Ayushman and Siddha, others inauspicious like Vishkumbha and Shula.',
            color: 'from-emerald-400 to-teal-600'
          },
          {
            icon: Calendar, title: 'Karana', subtitle: 'Half-Tithi',
            desc: 'Half of a Tithi, there are 11 types of Karanas. The first 7 are movable (Chara) and repeat cyclically, while the last 4 are fixed (Sthira) and occur only once per lunar month near Amavasya.',
            color: 'from-amber-400 to-orange-600'
          },
          {
            icon: BookOpen, title: 'Var', subtitle: 'Weekday',
            desc: 'The seven days of the week, each ruled by a planetary deity: Sunday (Surya), Monday (Chandra), Tuesday (Mangala), Wednesday (Budha), Thursday (Guru), Friday (Shukra), Saturday (Shani). The weekday influences all activities.',
            color: 'from-rose-400 to-red-600'
          },
          {
            icon: Users, title: 'Rashi', subtitle: 'Zodiac Sign',
            desc: 'The 12 signs of the zodiac (Aries to Pisces), each ruling 30° of the ecliptic. The Moon\'s position in a Rashi determines the Rasi Palan (zodiac prediction) and influences emotional and material aspects of life.',
            color: 'from-cyan-400 to-blue-600'
          },
        ].map((item, i) => (
          <div key={i} className="card overflow-hidden group hover:-translate-y-1 transition-all">
            <div className={`h-2 bg-gradient-to-r ${item.color}`} />
            <div className="p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-bark-300 dark:text-cream-100">{item.title}</h3>
              <p className="text-sm text-saffron-500 dark:text-saffron-400 mb-3">{item.subtitle}</p>
              <p className="text-sm text-bark-50/60 dark:text-cream-100/40 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="card-glow p-6 md:p-8">
          <h3 className="font-bold text-xl text-bark-300 dark:text-cream-100 mb-4">Inauspicious Times</h3>
          <div className="space-y-4 text-sm text-bark-50/70 dark:text-cream-100/50 leading-relaxed">
            <div>
              <p className="font-semibold text-bark-300 dark:text-cream-100">Rahu Kalam</p>
              <p>A 1.5-hour period each day ruled by Rahu. Initiating important activities during this time is considered unfavorable. The timing varies by weekday.</p>
            </div>
            <div>
              <p className="font-semibold text-bark-300 dark:text-cream-100">Yamagandam</p>
              <p>Another 1.5-hour inauspicious period associated with Yama, the lord of death. Travel and new ventures should be avoided during this window.</p>
            </div>
            <div>
              <p className="font-semibold text-bark-300 dark:text-cream-100">Gulikai</p>
              <p>A period ruled by Gulika, considered inauspicious for starting new activities but sometimes favorable for specific tasks like land-related matters.</p>
            </div>
          </div>
        </div>
        <div className="card-glow p-6 md:p-8">
          <h3 className="font-bold text-xl text-bark-300 dark:text-cream-100 mb-4">Key Concepts</h3>
          <div className="space-y-4 text-sm text-bark-50/70 dark:text-cream-100/50 leading-relaxed">
            <div>
              <p className="font-semibold text-bark-300 dark:text-cream-100">Uttarayana &amp; Dakshinayana</p>
              <p>The Sun\'s apparent northward movement (Uttarayana, ~Jan-Jun) is considered auspicious, while the southward movement (Dakshinayana, ~Jun-Jan) is less so.</p>
            </div>
            <div>
              <p className="font-semibold text-bark-300 dark:text-cream-100">Ritu (Seasons)</p>
              <p>Six seasons of two months each: Shishira (winter), Vasanta (spring), Grishma (summer), Varsha (monsoon), Sharad (autumn), Hemanta (pre-winter).</p>
            </div>
            <div>
              <p className="font-semibold text-bark-300 dark:text-cream-100">Samvatsara (Year)</p>
              <p>There are 60 Samvatsaras in a cycle. Each year has a unique name with specific characteristics that influence the overall nature of events during that year.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card p-6 bg-saffron-50/50 dark:bg-saffron-900/10 border-saffron-200 dark:border-saffron-900/30">
        <p className="text-sm text-bark-50/70 dark:text-cream-100/50 leading-relaxed">
          <strong className="text-bark-300 dark:text-cream-100">Disclaimer:</strong> The Panchangam calculations shown here are approximate and based on standard algorithms. For precise calculations specific to your location (latitude/longitude), please consult a traditional Panchangam prepared by qualified Vedic scholars. The Rasi Palan and Muhurtham suggestions are for general guidance only.
        </p>
      </div>
    </div>
  )
}