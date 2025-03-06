# Sistema de Chat em Tempo Real com Redis

Um sistema de chat em tempo real construído com Node.js, Express, Socket.IO e Redis. Esta aplicação demonstra o uso do Redis para gerenciar salas de chat, usuários e mensagens, junto com o Redis Pub/Sub para transmissão de mensagens em tempo real.

## Estrutura do Projeto

```
├── src/
│   ├── config/
│   │   └── redis.js         # Configuração do Redis e setup do cliente
│   ├── models/
│   │   └── chat.js          # Modelos de dados do chat e operações Redis
│   ├── populate.js          # Script para popular dados de teste
│   ├── server.js           # Servidor principal da aplicação
│   └── test.js             # Suite de testes para funcionalidades do chat
└── package.json            # Dependências e scripts do projeto
```

## Pré-requisitos

1. Node.js (v14 ou superior)
2. Redis Server (v6 ou superior)

## Instalação do Redis

### Windows

1. Baixe o instalador do Redis para Windows em https://github.com/microsoftarchive/redis/releases
2. Execute o instalador e siga o assistente de instalação
3. O Redis será instalado como um serviço do Windows e iniciará automaticamente

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

## Configuração do Projeto

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo .env com suas variáveis de ambiente:
   ```
   REDIS_URL=redis://localhost:6379
   PORT=3000
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Executando os Scripts

### População do Banco de Dados

Para popular o banco de dados com dados de teste, execute:

```bash
npm run populate
```

Este script irá criar:
- Salas de chat de exemplo
- Usuários de teste
- Algumas mensagens iniciais

### Executando os Testes

Para executar a suite de testes e verificar se todas as funcionalidades estão operando corretamente:

```bash
npm test
```

Os testes verificam:
- Conexão com o Redis
- Criação e gerenciamento de salas
- Envio e recebimento de mensagens
- Gestão de usuários
- Funcionalidades do Pub/Sub

## Funcionalidades

- Mensagens em tempo real usando Socket.IO
- Redis Pub/Sub para transmissão de mensagens
- Gerenciamento de presença de usuários
- Gerenciamento de salas de chat
- Armazenamento de histórico de mensagens
- Arquitetura escalável

## Arquitetura

O sistema utiliza:
- Redis para armazenamento de dados e Pub/Sub
- Socket.IO para comunicação em tempo real
- Express para API REST
- Node.js como runtime

## Tratamento de Erros

- Erros de conexão com Redis são registrados e tratados adequadamente
- Desconexões de Socket são gerenciadas
- Confirmação de entrega de mensagens

## Notas de Segurança

- Implementar autenticação adequada antes do uso em produção
- Proteger o Redis com senha em produção
- Validar todas as entradas do usuário
- Usar HTTPS em produção

## Licença
MIT

## 👨‍💻 Autor
[Jan Pereira](https://github.com/janpereira82)