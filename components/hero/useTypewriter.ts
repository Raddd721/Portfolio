'use client'

import { useEffect, useState } from 'react'

/** Types a list of words out and deletes them, one after another, forever. */
export function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const done = !deleting && text === word
    const cleared = deleting && text === ''

    const delay = done ? 1600 : cleared ? 200 : deleting ? 45 : 85

    const id = setTimeout(() => {
      if (done) {
        setDeleting(true)
        return
      }
      if (cleared) {
        setDeleting(false)
        setIndex((i) => i + 1)
        return
      }
      setText((t) => (deleting ? word.slice(0, t.length - 1) : word.slice(0, t.length + 1)))
    }, delay)

    return () => clearTimeout(id)
  }, [text, deleting, index, words])

  return text
}
