import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export type AppLanguage = 'tr' | 'en'
export type RouteKey = 'home' | 'about' | 'services'

const routeMap: Record<RouteKey, Record<AppLanguage, string>> = {
  home: {
    tr: '/',
    en: '/en/',
  },
  about: {
    tr: '/about/',
    en: '/en/about/',
  },
  services: {
    tr: '/services/',
    en: '/en/services/',
  },
}

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  return normalized.endsWith('/') ? normalized : `${normalized}/`
}

export function getLanguageFromPath(pathname: string): AppLanguage {
  const normalized = normalizePath(pathname)
  return normalized === '/en/' || normalized.startsWith('/en/') ? 'en' : 'tr'
}

export function getRoutePath(route: RouteKey, language: AppLanguage) {
  return routeMap[route][language]
}

function getRouteKeyFromPath(pathname: string): RouteKey | null {
  const normalized = normalizePath(pathname)

  const routeEntry = (Object.entries(routeMap) as Array<[RouteKey, Record<AppLanguage, string>]>).find(
    ([, localizedRoutes]) =>
      localizedRoutes.tr === normalized || localizedRoutes.en === normalized,
  )

  return routeEntry?.[0] ?? null
}

export function getLocalizedPathname(pathname: string, language: AppLanguage) {
  const routeKey = getRouteKeyFromPath(pathname)
  return routeKey ? getRoutePath(routeKey, language) : getRoutePath('home', language)
}

export function getHomeAnchorPath(anchor: string, language: AppLanguage) {
  return `${getRoutePath('home', language)}#${anchor}`
}

export function useCurrentLanguage() {
  const location = useLocation()

  return useMemo(() => getLanguageFromPath(location.pathname), [location.pathname])
}
