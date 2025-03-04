-- Script de criação das tabelas do banco de dados da loja virtual
-- Convenção: Todas as tabelas com prefixo tb_ e nomes no singular

-- Tabela de Usuário
CREATE TABLE tb_usuario (
    cod_usuario SERIAL PRIMARY KEY,
    desc_nome VARCHAR(100) NOT NULL,
    desc_email VARCHAR(100) NOT NULL UNIQUE,
    desc_senha VARCHAR(255) NOT NULL,
    desc_cpf VARCHAR(14) UNIQUE,
    dt_nascimento DATE,
    dthr_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dthr_ultimo_acesso TIMESTAMP,
    flag_ativo BOOLEAN DEFAULT TRUE,
    flag_admin BOOLEAN DEFAULT FALSE
);

-- Tabela de Endereço
CREATE TABLE tb_endereco (
    cod_endereco SERIAL PRIMARY KEY,
    cod_usuario INTEGER NOT NULL,
    desc_cep VARCHAR(9) NOT NULL,
    desc_logradouro VARCHAR(150) NOT NULL,
    num_numero VARCHAR(10),
    desc_complemento VARCHAR(100),
    desc_bairro VARCHAR(100) NOT NULL,
    desc_cidade VARCHAR(100) NOT NULL,
    desc_estado VARCHAR(2) NOT NULL,
    desc_pais VARCHAR(50) DEFAULT 'Brasil',
    flag_principal BOOLEAN DEFAULT FALSE,
    dthr_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categoria
CREATE TABLE tb_categoria (
    cod_categoria SERIAL PRIMARY KEY,
    desc_nome VARCHAR(50) NOT NULL,
    desc_slug VARCHAR(50) NOT NULL UNIQUE,
    img_icone VARCHAR(255),
    flag_ativo BOOLEAN DEFAULT TRUE,
    num_ordem INTEGER,
    cod_categoria_pai INTEGER
);

-- Tabela de Marca
CREATE TABLE tb_marca (
    cod_marca SERIAL PRIMARY KEY,
    desc_nome VARCHAR(100) NOT NULL,
    desc_slug VARCHAR(100) NOT NULL UNIQUE,
    img_logo VARCHAR(255),
    desc_website VARCHAR(255),
    flag_ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de Produto
CREATE TABLE tb_produto (
    cod_produto SERIAL PRIMARY KEY,
    cod_categoria INTEGER NOT NULL,
    cod_marca INTEGER NOT NULL,
    desc_nome VARCHAR(200) NOT NULL,
    desc_slug VARCHAR(200) NOT NULL UNIQUE,
    desc_descricao TEXT,
    desc_especificacoes TEXT,
    val_preco_custo DECIMAL(12,2) NOT NULL,
    val_preco_venda DECIMAL(12,2) NOT NULL,
    val_preco_promocional DECIMAL(12,2),
    perc_desconto DECIMAL(5,2),
    qtd_estoque INTEGER DEFAULT 0,
    num_peso DECIMAL(10,3),
    num_altura DECIMAL(10,2),
    num_largura DECIMAL(10,2),
    num_profundidade DECIMAL(10,2),
    desc_unidade VARCHAR(20),
    desc_codigo_barras VARCHAR(50),
    desc_ncm VARCHAR(8),
    flag_destaque BOOLEAN DEFAULT FALSE,
    flag_lancamento BOOLEAN DEFAULT FALSE,
    flag_ativo BOOLEAN DEFAULT TRUE,
    dthr_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dthr_ultima_atualizacao TIMESTAMP
);

-- Tabela de Imagem do Produto
CREATE TABLE tb_produto_imagem (
    cod_produto_imagem SERIAL PRIMARY KEY,
    cod_produto INTEGER NOT NULL,
    url_imagem VARCHAR(255) NOT NULL,
    desc_legenda VARCHAR(100),
    flag_principal BOOLEAN DEFAULT FALSE,
    num_ordem INTEGER,
    dthr_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Variação do Produto
CREATE TABLE tb_produto_variacao (
    cod_produto_variacao SERIAL PRIMARY KEY,
    cod_produto INTEGER NOT NULL,
    desc_nome VARCHAR(100) NOT NULL,
    desc_valor VARCHAR(100) NOT NULL,
    val_adicional DECIMAL(12,2) DEFAULT 0,
    qtd_estoque INTEGER DEFAULT 0,
    flag_ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de Pedido
CREATE TABLE tb_pedido (
    cod_pedido SERIAL PRIMARY KEY,
    cod_usuario INTEGER NOT NULL,
    cod_endereco_entrega INTEGER NOT NULL,
    desc_status VARCHAR(50) NOT NULL,
    val_subtotal DECIMAL(12,2) NOT NULL,
    val_frete DECIMAL(12,2) NOT NULL,
    val_desconto DECIMAL(12,2) DEFAULT 0,
    val_total DECIMAL(12,2) NOT NULL,
    desc_cupom VARCHAR(50),
    desc_forma_pagamento VARCHAR(50) NOT NULL,
    desc_codigo_rastreio VARCHAR(50),
    dthr_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dthr_aprovacao TIMESTAMP,
    dthr_cancelamento TIMESTAMP,
    dthr_entrega TIMESTAMP
);

-- Tabela de Item do Pedido
CREATE TABLE tb_pedido_item (
    cod_pedido_item SERIAL PRIMARY KEY,
    cod_pedido INTEGER NOT NULL,
    cod_produto INTEGER NOT NULL,
    cod_produto_variacao INTEGER,
    qtd_quantidade INTEGER NOT NULL,
    val_unitario DECIMAL(12,2) NOT NULL,
    val_desconto DECIMAL(12,2) DEFAULT 0,
    val_total DECIMAL(12,2) NOT NULL
);

-- Tabela de Avaliação
CREATE TABLE tb_avaliacao (
    cod_avaliacao SERIAL PRIMARY KEY,
    cod_produto INTEGER NOT NULL,
    cod_usuario INTEGER NOT NULL,
    num_nota INTEGER NOT NULL CHECK (num_nota BETWEEN 1 AND 5),
    desc_comentario TEXT,
    flag_aprovado BOOLEAN DEFAULT FALSE,
    dthr_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Cupom
CREATE TABLE tb_cupom (
    cod_cupom SERIAL PRIMARY KEY,
    desc_codigo VARCHAR(50) NOT NULL UNIQUE,
    desc_tipo VARCHAR(20) NOT NULL,
    val_desconto DECIMAL(12,2),
    perc_desconto DECIMAL(5,2),
    val_minimo_pedido DECIMAL(12,2),
    qtd_usos_maximo INTEGER,
    qtd_usos_atual INTEGER DEFAULT 0,
    dt_validade DATE NOT NULL,
    flag_ativo BOOLEAN DEFAULT TRUE,
    dthr_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Newsletter
CREATE TABLE tb_newsletter (
    cod_newsletter SERIAL PRIMARY KEY,
    desc_email VARCHAR(100) NOT NULL UNIQUE,
    flag_ativo BOOLEAN DEFAULT TRUE,
    dthr_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Configuração
CREATE TABLE tb_configuracao (
    cod_configuracao SERIAL PRIMARY KEY,
    desc_chave VARCHAR(50) NOT NULL UNIQUE,
    desc_valor TEXT,
    desc_descricao TEXT,
    dthr_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
