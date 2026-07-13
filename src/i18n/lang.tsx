import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { getContent, type Content, type Lang } from '@/data/content'

const STORAGE_KEY = 'temple-lang'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

function readInitialLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ta' || saved === 'en') return saved
  }
  return 'en'
}

/**
 * Wraps the app so every component can read the active language and its
 * translated content. The choice is persisted in localStorage and mirrored onto
 * <html lang> for accessibility / SEO.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}

/** Convenience hook — returns the full content tree for the active language. */
export function useContent(): Content {
  const { lang } = useLang()
  return getContent(lang)
}
