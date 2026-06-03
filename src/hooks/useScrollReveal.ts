'use client'

import { useEffect } from 'react'

export default function useScrollReveal(selector = '[data-reveal]') {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(selector)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}