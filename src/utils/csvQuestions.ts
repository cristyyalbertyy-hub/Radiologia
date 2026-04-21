import { publicAsset } from './publicAsset'

export interface CsvQuestion {
  prompt: string
  answer: string
}

export function parseCsvLine(line: string): CsvQuestion | null {
  const trimmed = line.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('"')) {
    const endQuote = trimmed.indexOf('",')
    if (endQuote > 0) {
      return {
        prompt: trimmed.slice(1, endQuote),
        answer: trimmed.slice(endQuote + 2).trim(),
      }
    }
  }

  const commaIndex = trimmed.indexOf(',')
  if (commaIndex === -1) return null

  return {
    prompt: trimmed.slice(0, commaIndex).trim(),
    answer: trimmed.slice(commaIndex + 1).trim(),
  }
}

export async function loadCsvQuestions(url: string): Promise<CsvQuestion[]> {
  try {
    const response = await fetch(url)
    const text = await response.text()
    return text
      .split(/\r?\n/)
      .map(parseCsvLine)
      .filter((q): q is CsvQuestion => q !== null)
  } catch {
    return []
  }
}

export const EXERCICIOS_CSV_1 = publicAsset('/Exercicios1.csv')
export const EXERCICIOS_CSV_2 = publicAsset('/Exercicios2.csv')
export const EXERCICIOS_CSV_3 = publicAsset('/Exercicios3.csv')

export async function loadMergedExerciseQuestions(): Promise<CsvQuestion[]> {
  const [first, second, third] = await Promise.all([
    loadCsvQuestions(EXERCICIOS_CSV_1),
    loadCsvQuestions(EXERCICIOS_CSV_2),
    loadCsvQuestions(EXERCICIOS_CSV_3),
  ])
  return [...first, ...second, ...third]
}
