-- Script de criação dos índices para otimização

-- Índices para tb_usuario
CREATE INDEX idx_usuario_email ON tb_usuario(desc_email);
CREATE INDEX idx_usuario_cpf ON tb_usuario(desc_cpf);

-- Índices para tb_endereco
CREATE INDEX idx_endereco_usuario ON tb_endereco(cod_usuario);
CREATE INDEX idx_endereco_cep ON tb_endereco(desc_cep);

-- Índices para tb_categoria
CREATE INDEX idx_categoria_slug ON tb_categoria(desc_slug);
CREATE INDEX idx_categoria_pai ON tb_categoria(cod_categoria_pai);

-- Índices para tb_marca
CREATE INDEX idx_marca_slug ON tb_marca(desc_slug);

-- Índices para tb_produto
CREATE INDEX idx_produto_categoria ON tb_produto(cod_categoria);
CREATE INDEX idx_produto_marca ON tb_produto(cod_marca);
CREATE INDEX idx_produto_slug ON tb_produto(desc_slug);
CREATE INDEX idx_produto_nome ON tb_produto(desc_nome);
CREATE INDEX idx_produto_codigo_barras ON tb_produto(desc_codigo_barras);
CREATE INDEX idx_produto_destaque ON tb_produto(flag_destaque) WHERE flag_destaque = TRUE;
CREATE INDEX idx_produto_lancamento ON tb_produto(flag_lancamento) WHERE flag_lancamento = TRUE;

-- Índices para tb_produto_imagem
CREATE INDEX idx_produto_imagem_produto ON tb_produto_imagem(cod_produto);

-- Índices para tb_produto_variacao
CREATE INDEX idx_produto_variacao_produto ON tb_produto_variacao(cod_produto);

-- Índices para tb_pedido
CREATE INDEX idx_pedido_usuario ON tb_pedido(cod_usuario);
CREATE INDEX idx_pedido_status ON tb_pedido(desc_status);
CREATE INDEX idx_pedido_data ON tb_pedido(dthr_pedido);

-- Índices para tb_pedido_item
CREATE INDEX idx_pedido_item_pedido ON tb_pedido_item(cod_pedido);
CREATE INDEX idx_pedido_item_produto ON tb_pedido_item(cod_produto);

-- Índices para tb_avaliacao
CREATE INDEX idx_avaliacao_produto ON tb_avaliacao(cod_produto);
CREATE INDEX idx_avaliacao_usuario ON tb_avaliacao(cod_usuario);

-- Índices para tb_cupom
CREATE INDEX idx_cupom_codigo ON tb_cupom(desc_codigo);
CREATE INDEX idx_cupom_validade ON tb_cupom(dt_validade);
