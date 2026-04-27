import { useEffect, useRef } from 'react'

export function useEqualHeightRows<T extends HTMLElement>(
  itemSelector: string,
) {
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    let frameId = 0

    const equalize = () => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(itemSelector),
      )

      items.forEach((item) => {
        item.style.minHeight = ''
      })

      const rows = new Map<number, HTMLElement[]>()

      items.forEach((item) => {
        const column = item.parentElement as HTMLElement | null
        const top = column?.offsetTop ?? item.offsetTop
        const rowItems = rows.get(top) ?? []
        rowItems.push(item)
        rows.set(top, rowItems)
      })

      rows.forEach((rowItems) => {
        const tallest = Math.max(...rowItems.map((item) => item.offsetHeight))

        rowItems.forEach((item) => {
          item.style.minHeight = `${tallest}px`
        })
      })
    }

    const scheduleEqualize = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(equalize)
    }

    const resizeObserver = new ResizeObserver(scheduleEqualize)
    resizeObserver.observe(container)

    const images = Array.from(container.querySelectorAll('img'))
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', scheduleEqualize)
      }
    })

    window.addEventListener('resize', scheduleEqualize)
    scheduleEqualize()

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', scheduleEqualize)
      images.forEach((image) => {
        image.removeEventListener('load', scheduleEqualize)
      })
    }
  }, [itemSelector])

  return containerRef
}
