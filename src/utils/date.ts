import { format, parseISO } from 'date-fns'

export function toDate(value: string | Date): Date
export function toDate(value: undefined): undefined
export function toDate(value?: string | Date): Date | undefined {
  if (value) {
    return value instanceof Date ? value : parseISO(value)
  }
}

export const toDateString = (
  date?: string | Date,
  dateFormat = 'yyyy MMM dd',
  fallback = ''
): string => {
  return date ? format(toDate(date), dateFormat) : fallback
}
