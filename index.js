const axios = require('axios'); // Importando axios para requisições HTTP
const fs = require('fs').promises; // Usando fs.promises para operações assíncronas
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // Declaração única
const path = require('path');

// Função para fazer requisição à API
async function fetchCorretorasApi() {
  try {
    const response = await axios.get('https://brasilapi.com.br/api/cvm/corretoras/v1');
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar a API', error);
    return [];
  }
}

// Função para filtrar corretoras ativas
function filtrarCorretorasAtivas(corretoras) {
  return corretoras.filter(corretora => corretora.status !== 'CANCELADA');
}

// Função para salvar corretoras em um arquivo CSV
async function salvarCorretorasEmCsv(corretoras) {
  const csvWriter = createCsvWriter({
    path: path.join('c:', 'temp', 'corretoras-ativas.csv'),
    header: [
      { id: 'cep', title: 'CEP' },
      { id: 'ddd', title: 'DDD' },
      { id: 'bank', title: 'Bank' },
      { id: 'cnpj', title: 'CNPJ' },
      { id: 'ibge', title: 'IBGE' },
      { id: 'feriados', title: 'Feriados Nacionais' },
      { id: 'tabela_fipe', title: 'Tabela FIPE' },
      { id: 'isbn', title: 'ISBN' },
      { id: 'dominio', title: 'Registros de domínio br' },
      { id: 'taxas', title: 'Taxas' },
    ],
  });

  try {
    await csvWriter.writeRecords(corretoras);
    console.log('Arquivo CSV salvo com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar o arquivo CSV', error);
  }
}

// Função principal
async function main() {
  const corretoras = await fetchCorretorasApi();
  const corretorasAtivas = filtrarCorretorasAtivas(corretoras);
  await salvarCorretorasEmCsv(corretorasAtivas);
}

// Executa a função principal
main();