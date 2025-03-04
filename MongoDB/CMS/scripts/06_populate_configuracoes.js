// Switch to the CMS database
db = db.getSiblingDB('cms_database');

print("Cleaning configurations collection...");
db.tb_configuracao.deleteMany({});

print("Creating system configurations...");
const configuracoes = [
    {
        txt_chave: "site_titulo",
        txt_valor: "CMS de Notícias",
        txt_descricao: "Título do site",
        enum_tipo: "texto",
        bool_sistema: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    },
    {
        txt_chave: "site_descricao",
        txt_valor: "Sistema de gerenciamento de conteúdo para notícias e artigos",
        txt_descricao: "Descrição do site",
        enum_tipo: "texto",
        bool_sistema: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    },
    {
        txt_chave: "items_por_pagina",
        txt_valor: "20",
        txt_descricao: "Número de itens por página nas listagens",
        enum_tipo: "numero",
        bool_sistema: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    },
    {
        txt_chave: "permitir_comentarios",
        txt_valor: "true",
        txt_descricao: "Habilitar sistema de comentários",
        enum_tipo: "booleano",
        bool_sistema: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    }
];

db.tb_configuracao.insertMany(configuracoes);
print(`Created ${configuracoes.length} configurations`);
