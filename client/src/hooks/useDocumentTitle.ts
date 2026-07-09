import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | Belle Ame` : 'Belle Ame — Luxury Wedding Invitations'
    return () => {
      document.title = previous
    }
  }, [title])
}
