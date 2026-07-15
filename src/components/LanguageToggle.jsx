import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage, supportedLanguages } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      {supportedLanguages.map(lang => (
                <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full transition-colors duration-200 ${language === lang.code ? 'bg-saffron-500 text-zinc-950' : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800'}`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
