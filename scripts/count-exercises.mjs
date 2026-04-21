import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')

function parseCsvLine(line) {
  const trimmed = line.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('"')) {
    const endQuote = trimmed.indexOf('",')
    if (endQuote > 0) return { prompt: 'x', answer: 'y' }
  }
  const commaIndex = trimmed.indexOf(',')
  if (commaIndex === -1) return null
  return { prompt: 'x', answer: 'y' }
}

let grandNonEmpty = 0
let grandParsed = 0
for (const f of ['Exercicios1.csv', 'Exercicios2.csv', 'Exercicios3.csv']) {
  const text = fs.readFileSync(path.join(publicDir, f), 'utf8')
  const lines = text.split(/\r?\n/)
  const nonEmpty = lines.filter((l) => l.trim()).length
  const parsed = lines.filter((l) => parseCsvLine(l)).length
  grandNonEmpty += nonEmpty
  grandParsed += parsed
  console.log(`${f}: nao vazias=${nonEmpty}, aceites pelo parser=${parsed}`)
}
console.log(`TOTAL nao vazias=${grandNonEmpty}, aceites=${grandParsed}`)
