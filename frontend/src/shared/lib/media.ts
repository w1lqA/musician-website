// src/shared/lib/media.ts
import { baseUrl } from './config'

export const getMediaUrl = (path: string | null | undefined): string => {
    if (!path) return ''

    // если уже полный URL - возвращаем как есть
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
    }

    // если путь начинается с /media/ - добавляем baseUrl
    if (path.startsWith('/media/')) {
        return `${baseUrl}${path}`
    }

    // если путь начинается с media/ (без слеша)
    if (path.startsWith('media/')) {
        return `${baseUrl}/${path}`
    }

    // иначе предполагаем что это относительный путь внутри media
    return `${baseUrl}/media/${path}`
}