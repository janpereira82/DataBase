# Banco de Dados Loja Virtual

Este repositório contém scripts SQL para criar e popular um banco de dados PostgreSQL para uma loja virtual. Os dados gerados são totalmente fictícios e destinados apenas para fins de teste e desenvolvimento.

## Estrutura do Banco de Dados

### Tabelas Principais

1. **tb_usuario** - Usuários da plataforma
   - Campos principais: cod_usuario, desc_nome, desc_email, desc_cpf, dt_nascimento
   - Quantidade de registros: 500 usuários

2. **tb_endereco** - Endereços dos usuários
   - Campos principais: cod_endereco, cod_usuario, desc_cep, desc_logradouro, num_numero
   - Quantidade de registros: ~1000-1500 endereços (1-3 por usuário)

3. **tb_categoria** - Categorias de produtos
   - Campos principais: cod_categoria, desc_nome, desc_slug
   - Quantidade de registros: 10 categorias

4. **tb_marca** - Marcas dos produtos
   - Campos principais: cod_marca, desc_nome, desc_slug
   - Quantidade de registros: 20 marcas

5. **tb_produto** - Produtos disponíveis
   - Campos principais: cod_produto, cod_categoria, cod_marca, desc_nome, val_preco_venda
   - Quantidade de registros: 1000 produtos

6. **tb_pedido** - Pedidos realizados
   - Campos principais: cod_pedido, cod_usuario, cod_endereco_entrega, desc_status, val_total
   - Quantidade de registros: 1000 pedidos

7. **tb_pedido_item** - Itens dos pedidos
   - Campos principais: cod_pedido_item, cod_pedido, cod_produto, qtd_quantidade
   - Quantidade de registros: ~2000-3000 itens

### Tabelas Complementares

8. **tb_avaliacao** - Avaliações dos produtos
   - Campos principais: cod_avaliacao, cod_produto, cod_usuario, num_nota
   - Quantidade de registros: 200 avaliações

9. **tb_cupom** - Cupons de desconto
   - Campos principais: cod_cupom, desc_codigo, desc_tipo, val_desconto
   - Quantidade de registros: 20 cupons

10. **tb_newsletter** - Inscrições na newsletter
    - Campos principais: cod_newsletter, desc_email
    - Quantidade de registros: 100 inscrições

## Arquivos SQL

1. `01_create_tables.sql` - Criação das tabelas
2. `02_create_constraints.sql` - Criação das constraints e índices
3. `03_create_views.sql` - Criação das views
4. `04_insert_massive_data.sql` - Inserção dos dados
   - `04a_insert_categorias.sql`
   - `04b_insert_marcas.sql`
   - `04c_insert_produtos.sql`
   - `04d_insert_variacoes.sql`
   - `04e_insert_usuarios.sql`
   - `04f_insert_pedidos.sql`
   - `04g_insert_complementares.sql`

## Observações Importantes

- Todos os dados são fictícios e gerados automaticamente
- CPFs e emails são únicos e seguem o formato correto
- Endereços usam CEPs e estados brasileiros válidos
- Preços e valores seguem ranges realistas
- Datas de pedidos são dos últimos 12 meses
- Senhas são armazenadas como hash SHA-256

## Instalação do PostgreSQL

### Windows

1. Baixe o instalador do PostgreSQL em: https://www.postgresql.org/download/windows/
2. Execute o instalador e siga o assistente de instalação
3. Durante a instalação:
   - Defina uma senha para o usuário postgres
   - Mantenha a porta padrão 5432
   - Selecione o locale pt_BR
4. Adicione o caminho do PostgreSQL ao PATH do sistema:
   - `C:\Program Files\PostgreSQL\<versão>\bin`

### Linux (Ubuntu/Debian)

```bash
# Atualizar os pacotes
sudo apt update

# Instalar o PostgreSQL
sudo apt install postgresql postgresql-contrib

# Iniciar o serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Trocar a senha do usuário postgres
sudo -u postgres psql
\password postgres
\q
```

## Executando os Scripts SQL

### Windows (PowerShell)

```powershell
# Conectar ao PostgreSQL
psql -U postgres

# Criar o banco de dados
CREATE DATABASE lojavirtual;
\q

# Executar os scripts
psql -U postgres -d lojavirtual -f 01_create_tables.sql
psql -U postgres -d lojavirtual -f 02_create_constraints.sql
psql -U postgres -d lojavirtual -f 03_create_views.sql
psql -U postgres -d lojavirtual -f 04a_insert_categorias.sql
psql -U postgres -d lojavirtual -f 04b_insert_marcas.sql
psql -U postgres -d lojavirtual -f 04c_insert_produtos.sql
psql -U postgres -d lojavirtual -f 04d_insert_variacoes.sql
psql -U postgres -d lojavirtual -f 04e_insert_usuarios.sql
psql -U postgres -d lojavirtual -f 04f_insert_pedidos.sql
psql -U postgres -d lojavirtual -f 04g_insert_complementares.sql
```

### Linux

```bash
# Conectar ao PostgreSQL
sudo -u postgres psql

# Criar o banco de dados
CREATE DATABASE lojavirtual;
\q

# Executar os scripts
sudo -u postgres psql -d lojavirtual -f 01_create_tables.sql
sudo -u postgres psql -d lojavirtual -f 02_create_constraints.sql
sudo -u postgres psql -d lojavirtual -f 03_create_views.sql
sudo -u postgres psql -d lojavirtual -f 04a_insert_categorias.sql
sudo -u postgres psql -d lojavirtual -f 04b_insert_marcas.sql
sudo -u postgres psql -d lojavirtual -f 04c_insert_produtos.sql
sudo -u postgres psql -d lojavirtual -f 04d_insert_variacoes.sql
sudo -u postgres psql -d lojavirtual -f 04e_insert_usuarios.sql
sudo -u postgres psql -d lojavirtual -f 04f_insert_pedidos.sql
sudo -u postgres psql -d lojavirtual -f 04g_insert_complementares.sql
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias nos scripts ou na documentação através de pull requests.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
