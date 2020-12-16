const regexLine = /(execute_db\([\w\W]+\))/i
const regexLiteral = /(\${([\w.]+)})/i

const line = process.argv.slice(2).join(' ') || ""
const match = line.match(regexLine)

if (!line || !match) console.log('no matching sql found for the string') && process.exit()

const newLineOriginal = (' ' + line.split('value')[1]).slice(1)
const items = []
let newLine = (' ' + newLineOriginal).slice(1)
let matched

while (matched = newLine.match(regexLiteral)) {
  const [, full, variable] = matched

  items.push(variable)

  newLine = newLine.replace(full, '?')
}

console.log(line.replace(newLineOriginal, newLine))
console.log('literals:', `[${items.join(', ')}]`)
