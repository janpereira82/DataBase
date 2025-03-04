// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// Create collections with schema validation
db.createCollection("tb_usuario", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["txt_nome", "txt_email", "txt_senha", "txt_username", "enum_status", "arr_roles"],
            properties: {
                cod_usuario: { bsonType: "objectId" },
                txt_nome: { bsonType: "string", minLength: 3 },
                txt_email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
                txt_senha: { bsonType: "string", minLength: 6 },
                txt_username: { bsonType: "string", minLength: 3 },
                img_avatar: { bsonType: ["string", "null"] },
                enum_status: { enum: ["ativo", "inativo", "bloqueado"] },
                arr_roles: { bsonType: "array", items: { enum: ["admin", "editor", "autor"] } },
                dthr_criacao: { bsonType: "date" },
                dthr_ultima_atualizacao: { bsonType: "date" }
            }
        }
    }
});

db.createCollection("tb_perfil", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["txt_nome", "arr_permissoes", "bool_ativo"],
            properties: {
                cod_perfil: { bsonType: "objectId" },
                txt_nome: { bsonType: "string" },
                txt_descricao: { bsonType: ["string", "null"] },
                arr_permissoes: { bsonType: "array" },
                bool_ativo: { bsonType: "bool" },
                dthr_criacao: { bsonType: "date" },
                dthr_ultima_atualizacao: { bsonType: "date" }
            }
        }
    }
});

db.createCollection("tb_artigo", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["txt_titulo", "txt_slug", "txt_conteudo", "cod_autor", "enum_status"],
            properties: {
                cod_artigo: { bsonType: "objectId" },
                txt_titulo: { bsonType: "string", minLength: 3 },
                txt_slug: { bsonType: "string" },
                txt_conteudo: { bsonType: "string" },
                txt_resumo: { bsonType: ["string", "null"] },
                arr_tags: { bsonType: ["array", "null"] },
                cod_categoria: { bsonType: ["objectId", "null"] },
                cod_autor: { bsonType: "objectId" },
                enum_status: { enum: ["rascunho", "publicado", "arquivado"] },
                num_visualizacoes: { bsonType: "int" },
                arr_comentarios: { 
                    bsonType: ["array", "null"],
                    items: {
                        bsonType: "object",
                        required: ["txt_conteudo", "cod_usuario"],
                        properties: {
                            txt_conteudo: { bsonType: "string" },
                            cod_usuario: { bsonType: "objectId" },
                            dthr_criacao: { bsonType: "date" }
                        }
                    }
                },
                dthr_publicacao: { bsonType: ["date", "null"] },
                dthr_criacao: { bsonType: "date" },
                dthr_ultima_atualizacao: { bsonType: "date" }
            }
        }
    }
});

db.createCollection("tb_categoria", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["txt_nome", "txt_slug"],
            properties: {
                cod_categoria: { bsonType: "objectId" },
                txt_nome: { bsonType: "string" },
                txt_slug: { bsonType: "string" },
                txt_descricao: { bsonType: ["string", "null"] },
                img_capa: { bsonType: ["string", "null"] },
                cod_categoria_pai: { bsonType: ["objectId", "null"] },
                dthr_criacao: { bsonType: "date" },
                dthr_ultima_atualizacao: { bsonType: "date" }
            }
        }
    }
});

db.createCollection("tb_midia", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["txt_nome", "url_arquivo", "txt_tipo", "num_tamanho", "txt_mime_type", "cod_usuario"],
            properties: {
                cod_midia: { bsonType: "objectId" },
                txt_nome: { bsonType: "string" },
                txt_descricao: { bsonType: ["string", "null"] },
                url_arquivo: { bsonType: "string" },
                txt_tipo: { bsonType: "string" },
                num_tamanho: { bsonType: "int" },
                txt_mime_type: { bsonType: "string" },
                cod_usuario: { bsonType: "objectId" },
                dthr_criacao: { bsonType: "date" },
                dthr_ultima_atualizacao: { bsonType: "date" }
            }
        }
    }
});

db.createCollection("tb_configuracao", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["txt_chave", "txt_valor", "enum_tipo"],
            properties: {
                cod_configuracao: { bsonType: "objectId" },
                txt_chave: { bsonType: "string" },
                txt_valor: { bsonType: "string" },
                txt_descricao: { bsonType: ["string", "null"] },
                enum_tipo: { enum: ["texto", "numero", "booleano", "json"] },
                bool_sistema: { bsonType: "bool" },
                dthr_criacao: { bsonType: "date" },
                dthr_ultima_atualizacao: { bsonType: "date" }
            }
        }
    }
});

// Create indexes
db.tb_usuario.createIndex({ "txt_email": 1 }, { unique: true });
db.tb_usuario.createIndex({ "txt_username": 1 }, { unique: true });
db.tb_artigo.createIndex({ "txt_slug": 1 }, { unique: true });
db.tb_artigo.createIndex({ "arr_tags": 1 });
db.tb_artigo.createIndex({ "cod_categoria": 1 });
db.tb_categoria.createIndex({ "txt_slug": 1 }, { unique: true });
db.tb_configuracao.createIndex({ "txt_chave": 1 }, { unique: true });

// Create initial admin user
db.tb_usuario.insertOne({
    txt_nome: "Administrador",
    txt_email: "admin@sistema.com",
    txt_senha: "admin123", // Remember to change this password in production
    txt_username: "admin",
    enum_status: "ativo",
    arr_roles: ["admin"],
    dthr_criacao: new Date(),
    dthr_ultima_atualizacao: new Date()
});

print("Database structure created successfully!");
