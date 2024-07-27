require('dotenv').config(); // Carregar variáveis de um arquivo .env
const axios = require('axios'); // Importando axios para requisições HTTP
const fs = require('fs').promises; // Usando fs para operações assíncronas
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // Declaração única
const path = require('path');

// Requisição à API
async function fetchCorretorasApi() {
  try {
    const response = await axios.get(process.env.API_URL || 'https://brasilapi.com.br/api/cvm/corretoras/v1');
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar a API', error);
    return [];
  }
}

// Filtrando corretoras ativas
function filtrarCorretorasAtivas(corretoras) {
  if (!corretoras || !Array.isArray(corretoras)) {
    console.warn('Nenhuma corretora encontrada ou dados inválidos');
    return [];
  }
  return corretoras.filter(corretora => corretora.status !== 'CANCELADA');
}

// Salvando corretoras em um arquivo CSV
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
  try {
    const corretoras = await fetchCorretorasApi();
    if (corretoras.length === 0) {
      console.warn('Nenhuma corretora encontrada');
    } else {
      const corretorasAtivas = filtrarCorretorasAtivas(corretoras);
      if (corretorasAtivas.length === 0) {
        console.warn('Nenhuma corretora ativa encontrada');
      } else {
        await salvarCorretorasEmCsv(corretorasAtivas);
        console.log('Processo concluído com sucesso');
      }
    }
  } catch (error) {
    console.error('Erro no processo principal', error);
  }
}

// Executa a função principal
main();
