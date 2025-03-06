// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// 1. Buscar perfil por nome
function findProfileByName(nome) {
    return db.tb_perfil.findOne({ txt_nome: nome });
}

// 2. Listar perfis ativos
function getActiveProfiles() {
    return db.tb_perfil.find({ bool_ativo: true }).toArray();
}

// 3. Buscar perfis por permissão
function findProfilesByPermission(permissao) {
    return db.tb_perfil.find({ arr_permissoes: permissao }).toArray();
}

// 4. Estatísticas de usuários por perfil
function getUserStatsByProfile() {
    const perfis = db.tb_perfil.find().toArray();
    const stats = [];
    
    for (const perfil of perfis) {
        const userCount = db.tb_usuario.countDocuments({
            arr_roles: perfil.txt_nome.toLowerCase()
        });
        
        stats.push({
            perfil: perfil.txt_nome,
            total_usuarios: userCount,
            ativo: perfil.bool_ativo
        });
    }
    
    return stats;
}

// Exemplos de uso
print("\n1. Buscando perfil 'Administrador':");
printjson(findProfileByName("Administrador"));

print("\n2. Perfis ativos:");
printjson(getActiveProfiles());

print("\n3. Perfis com permissão 'gerenciar_conteudo':");
printjson(findProfilesByPermission("gerenciar_conteudo"));

print("\n4. Estatísticas de usuários por perfil:");
printjson(getUserStatsByProfile());
