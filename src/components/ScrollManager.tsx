import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const element = document.getElementById(id)

      if (element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  return null
}
