const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i

export function withBasePath(path: string) {
  if (!path || ABSOLUTE_URL_PATTERN.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }

  if (path.startsWith('#')) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
