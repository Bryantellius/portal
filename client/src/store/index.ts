import React, { useState, useEffect } from 'react'

export const useLocalStorageState = (key: string) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || ''
  )

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value])

  return [value, setValue]
}