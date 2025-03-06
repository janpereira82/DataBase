# Sistema de Gerenciamento de Conteúdo (CMS) - MongoDB

Sistema de gerenciamento de conteúdo (CMS) desenvolvido com MongoDB, projetado para ser robusto e flexível, permitindo a criação, edição e gerenciamento de diversos tipos de conteúdo.

## Pré-requisitos

### 1. MongoDB Server
1. Faça o download do MongoDB Community Server em:
   https://www.mongodb.com/try/download/community
2. Execute o instalador MSI
3. Escolha "Complete" na instalação
4. O serviço será instalado em `C:\Program Files\MongoDB\Server\8.0\bin`

### 2. MongoDB Shell
1. Faça o download do MongoDB Shell em:
   https://www.mongodb.com/try/download/shell
2. Execute o instalador MSI
3. O shell será instalado em `C:\Program Files\MongoDB\Shell\bin`
4. Adicione o diretório ao PATH do sistema

## Estrutura do Banco de Dados

### Convenções de Nomenclatura
- Todas as coleções têm prefixo "tb_"
- Nomes no singular
- Campos com prefixos por tipo:
  - `cod_`: Identificadores
  - `txt_`: Texto
  - `num_`: Números
  - `dthr_`: Data e Hora
  - `bool_`: Booleano
  - `arr_`: Array
  - `enum_`: Enumeração
  - `img_`: Imagem
  - `url_`: URLs

### Coleções

#### tb_usuario
- Gerenciamento de usuários
- Campos: nome, email, senha, username, avatar, status, roles
- Validação de email e senha
- Status: ativo, inativo, bloqueado
- Roles: admin, editor, autor

#### tb_perfil
- Perfis de acesso
- Campos: nome, descrição, permissões, status
- Controle granular de permissões

#### tb_artigo
- Conteúdo principal
- Campos: título, slug, conteúdo, resumo, tags, categoria
- Suporte a comentários
- Estados: rascunho, publicado, arquivado
- Métricas de visualização

#### tb_categoria
- Categorização hierárquica
- Campos: nome, slug, descrição, imagem, categoria pai
- Suporte a subcategorias
- Categorias principais:
  1. Geral: Notícias gerais e últimas notícias
  2. Economia: Mercado financeiro e negócios
  3. Tecnologia: Tech news e inovação
  4. Esportes: Notícias esportivas
  5. Marketing: Marketing e publicidade
  6. Criptomoedas: Mercado crypto e blockchain

#### tb_midia
- Gerenciamento de arquivos
- Campos: nome, descrição, URL, tipo, tamanho, MIME type
- Controle de upload por usuário

#### tb_configuracao
- Configurações do sistema
- Campos: chave, valor, descrição, tipo
- Tipos: texto, número, booleano, json
- Configurações de sistema e personalizadas

## Scripts

### Limpeza e População do Banco

1. **00_clean_database.js**
   ```bash
   mongosh --file scripts/00_clean_database.js
   ```
   - Remove todas as coleções do banco

2. **Scripts de População**
   ```bash
   mongosh --file scripts/01_populate_usuarios.js    # Cria 100 usuários
   mongosh --file scripts/02_populate_perfis.js      # Cria 3 perfis
   mongosh --file scripts/03_populate_categorias.js  # Cria 6 categorias
   mongosh --file scripts/04_populate_artigos.js     # Cria 10.000 artigos
   mongosh --file scripts/05_populate_midias.js      # Cria 1.000 mídias
   mongosh --file scripts/06_populate_configuracoes.js # Cria configurações
   ```

### Scripts de Consulta

1. **query_usuarios.js**
   - Buscar por email
   - Buscar por role
   - Contar por status
   - Listar usuários ativos

2. **query_artigos.js**
   - Buscar por categoria
   - Buscar por tag
   - Listar mais visualizados
   - Contar por status
   - Buscar por período

3. **query_categorias.js**
   - Listar com contagem de artigos
   - Buscar por slug
   - Ordenar por número de artigos

4. **query_midias.js**
   - Buscar por tipo
   - Buscar por usuário
   - Estatísticas de armazenamento
   - Buscar por MIME type
   - Listar mais recentes

5. **query_configuracoes.js**
   - Buscar por chave
   - Listar configurações do sistema
   - Buscar por tipo
   - Atualizar valores

6. **query_perfis.js**
   - Buscar por nome
   - Listar perfis ativos
   - Buscar por permissão
   - Estatísticas de usuários por perfil

## Volumes de Dados
- Usuários: 100
- Artigos: 10.000
- Categorias: 6
- Mídias: 1.000
- Perfis: 3
- Configurações: Sistema + Personalizadas

## Uso dos Scripts

### População do Banco
```bash
# Limpar banco
mongosh --file scripts/00_clean_database.js

# Popular todas as coleções em sequência
scripts/populate_all.bat

# Ou executar scripts individualmente
mongosh --file scripts/01_populate_usuarios.js
```

### Consultas
```bash
# Executar consultas em usuários
mongosh --file scripts/query_usuarios.js

# Executar consultas em artigos
mongosh --file scripts/query_artigos.js
```

## Notas
- Todos os scripts são idempotentes (podem ser executados múltiplas vezes)
- Os scripts de população limpam dados existentes antes de inserir novos
- Senhas em ambiente de desenvolvimento são simplificadas
- Total de 45 fontes RSS com cobertura geográfica: Brasil e Portugal

## 👨‍💻 Autor
[Jan Pereira](https://github.com/janpereira82)

