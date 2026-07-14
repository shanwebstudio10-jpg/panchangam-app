import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { defaultLanguage, supportedLanguages, translations } from '../data/translations'

const LanguageContext = createContext()

function formatTemplate(template, variables) {
  if (!variables || typeof template !== 'string') return template
  return template.replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? `{${key}}`)
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('panchangam-language')
      return saved || defaultLanguage
    }
    return defaultLanguage
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('panchangam-language', language)
    }
  }, [language])

  const dictionary = useMemo(() => translations[language] || translations[defaultLanguage], [language])

  const translate = (path, variables) => {
    const value = getNestedValue(dictionary, path)
    return formatTemplate(value ?? path, variables)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, supportedLanguages, dictionary, translate }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
