-- Script para limpar completamente o banco de dados

-- Desabilita temporariamente as foreign keys
SET session_replication_role = 'replica';

-- Drop todas as tabelas existentes
DROP TABLE IF EXISTS 
    tb_newsletter,
    tb_cupom,
    tb_avaliacao,
    tb_pedido_item,
    tb_pedido,
    tb_produto_variacao,
    tb_produto_imagem,
    tb_produto,
    tb_marca,
    tb_categoria,
    tb_endereco,
    tb_usuario,
    tb_configuracao CASCADE;

-- Reset todas as sequences
DO $$ 
DECLARE 
    seq_name text;
BEGIN 
    FOR seq_name IN 
        SELECT c.relname 
        FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE c.relkind = 'S' 
        AND n.nspname = 'public'
    LOOP 
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || seq_name || ' CASCADE';
    END LOOP; 
END $$;

-- Drop todos os índices customizados
DO $$ 
DECLARE 
    idx_name text;
BEGIN 
    FOR idx_name IN 
        SELECT i.relname AS index_name
        FROM pg_class t, pg_class i, pg_index ix, pg_namespace n
        WHERE t.oid = ix.indrelid
        AND i.oid = ix.indexrelid
        AND n.oid = t.relnamespace
        AND n.nspname = 'public'
        AND t.relkind = 'r'
        AND i.relkind = 'i'
        AND ix.indisprimary IS FALSE
    LOOP 
        EXECUTE 'DROP INDEX IF EXISTS ' || idx_name;
    END LOOP; 
END $$;

-- Reabilita as foreign keys
SET session_replication_role = 'origin';
