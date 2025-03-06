// Switch to the CMS database
db = db.getSiblingDB('cms_database');

print("Cleaning profiles collection...");
db.tb_perfil.deleteMany({});

print("Creating profiles...");
const perfis = [
    {
        txt_nome: "Administrador",
        txt_descricao: "Acesso total ao sistema",
        arr_permissoes: ["gerenciar_usuarios", "gerenciar_conteudo", "gerenciar_configuracoes"],
        bool_ativo: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    },
    {
        txt_nome: "Editor",
        txt_descricao: "Gerenciamento de conteúdo",
        arr_permissoes: ["gerenciar_conteudo"],
        bool_ativo: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    },
    {
        txt_nome: "Autor",
        txt_descricao: "Criação de conteúdo",
        arr_permissoes: ["criar_conteudo"],
        bool_ativo: true,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    }
];

db.tb_perfil.insertMany(perfis);
print(`Created ${perfis.length} profiles`);
