import fs from 'fs'

function csvToJSON(csvFilePath, jsonFilePath) {
  // lê o arquivo csv
  const csvFile = fs.readFileSync(csvFilePath, 'utf-8')

  // transforma o arquivo csv em um array
  const arrayCsvFile = csvFile.split('\n')

  // separa a primeira linha do arquivo, que é referente a key do objeto tabela
  const headers = arrayCsvFile[0].split(',')

  // seta os objetos com suas respectivas keys e values
  let result = []

  for (let i = 1; i < arrayCsvFile.length; i++) {
    const currentLine = arrayCsvFile[i].split(',')
    const currentObject = {}

    for (let j = 0; j < headers.length; j++) {
      currentObject[headers[j]] = currentLine[j]
    }
    result.push(currentObject)
  }

  // cria um novo file no diretório indicado
  fs.writeFileSync(jsonFilePath, JSON.stringify(result), 'utf-8')
}

// retorna a lista de files csv da pasta
function listDirectoryFiles(directoryPath) {
  return fs.readdirSync(directoryPath)
}

const listDirectory = listDirectoryFiles('./src/csv-files')

// converte todos os files .csv do diretório para json e cria um novo file json no diretório indicado
function convertAllCsvFilesToJSON(listDirectory) {
  listDirectory.map((file) =>
    csvToJSON(`./src/csv-files/${file}`, `./src/json-files/${file.split('.')[0]}.json`)
  )
}

// executa a função
convertAllCsvFilesToJSON(listDirectory)
