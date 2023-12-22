import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeAccents = (string: string) => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
