-- Script de criação das constraints e relacionamentos

-- Relacionamentos da tabela tb_endereco
ALTER TABLE tb_endereco
    ADD CONSTRAINT fk_endereco_usuario
    FOREIGN KEY (cod_usuario) REFERENCES tb_usuario(cod_usuario);

-- Relacionamentos da tabela tb_categoria
ALTER TABLE tb_categoria
    ADD CONSTRAINT fk_categoria_pai
    FOREIGN KEY (cod_categoria_pai) REFERENCES tb_categoria(cod_categoria);

-- Relacionamentos da tabela tb_produto
ALTER TABLE tb_produto
    ADD CONSTRAINT fk_produto_categoria
    FOREIGN KEY (cod_categoria) REFERENCES tb_categoria(cod_categoria),
    ADD CONSTRAINT fk_produto_marca
    FOREIGN KEY (cod_marca) REFERENCES tb_marca(cod_marca);

-- Relacionamentos da tabela tb_produto_imagem
ALTER TABLE tb_produto_imagem
    ADD CONSTRAINT fk_produto_imagem_produto
    FOREIGN KEY (cod_produto) REFERENCES tb_produto(cod_produto);

-- Relacionamentos da tabela tb_produto_variacao
ALTER TABLE tb_produto_variacao
    ADD CONSTRAINT fk_produto_variacao_produto
    FOREIGN KEY (cod_produto) REFERENCES tb_produto(cod_produto);

-- Relacionamentos da tabela tb_pedido
ALTER TABLE tb_pedido
    ADD CONSTRAINT fk_pedido_usuario
    FOREIGN KEY (cod_usuario) REFERENCES tb_usuario(cod_usuario),
    ADD CONSTRAINT fk_pedido_endereco
    FOREIGN KEY (cod_endereco_entrega) REFERENCES tb_endereco(cod_endereco);

-- Relacionamentos da tabela tb_pedido_item
ALTER TABLE tb_pedido_item
    ADD CONSTRAINT fk_pedido_item_pedido
    FOREIGN KEY (cod_pedido) REFERENCES tb_pedido(cod_pedido),
    ADD CONSTRAINT fk_pedido_item_produto
    FOREIGN KEY (cod_produto) REFERENCES tb_produto(cod_produto),
    ADD CONSTRAINT fk_pedido_item_variacao
    FOREIGN KEY (cod_produto_variacao) REFERENCES tb_produto_variacao(cod_produto_variacao);

-- Relacionamentos da tabela tb_avaliacao
ALTER TABLE tb_avaliacao
    ADD CONSTRAINT fk_avaliacao_produto
    FOREIGN KEY (cod_produto) REFERENCES tb_produto(cod_produto),
    ADD CONSTRAINT fk_avaliacao_usuario
    FOREIGN KEY (cod_usuario) REFERENCES tb_usuario(cod_usuario);
