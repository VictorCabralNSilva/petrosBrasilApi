## Introdução

Este projeto foi desenvolvido com o objetivo de automatizar a catalogação das corretoras ativas listadas na CVM, utilizando dados da Brasil API. O processo de automatização inclui a coleta de dados via API, filtragem das corretoras ativas e o salvamento desses dados em um arquivo CSV.

## Tecnologias Usadas

- **Node.js**: Utilizado para a criação do script de backend devido à sua eficiência em lidar com operações de I/O não-bloqueantes.
- **Axios**: Biblioteca de cliente HTTP baseada em promessas para realizar requisições à API.
- **csv-writer**: Utilizado para gerar arquivos CSV a partir de arrays de objetos JavaScript.
- **dotenv**: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Configuração

Para rodar este projeto, siga os passos abaixo:

1. **Instale o Node.js:** Certifique-se de que o Node.js está instalado em sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

2. **Clone o repositório:**

   ```bash
   git clone https://github.com/VictorCabralNSilva/petrosBrasilApi.git

## Configure o arquivo 
API_URL=https://brasilapi.com.br/api/cvm/corretoras/v1

## Execute com o script
node index.js


