// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// 1. Buscar usuário por email
function findUserByEmail(email) {
    return db.tb_usuario.findOne({ txt_email: email });
}

// 2. Buscar usuários por role
function findUsersByRole(role) {
    return db.tb_usuario.find({ arr_roles: role }).toArray();
}

// 3. Contar usuários por status
function countUsersByStatus() {
    return db.tb_usuario.aggregate([
        { $group: { _id: "$enum_status", total: { $sum: 1 } } }
    ]).toArray();
}

// 4. Buscar usuários ativos ordenados por nome
function findActiveUsersSortedByName() {
    return db.tb_usuario.find(
        { enum_status: "ativo" },
        { txt_nome: 1, txt_email: 1 }
    ).sort({ txt_nome: 1 }).toArray();
}

// Exemplos de uso
print("\n1. Buscando usuário por email:");
printjson(findUserByEmail("joao.silva0@email.com"));

print("\n2. Buscando usuários com role 'admin':");
printjson(findUsersByRole("admin"));

print("\n3. Contagem de usuários por status:");
printjson(countUsersByStatus());

print("\n4. Usuários ativos ordenados por nome:");
printjson(findActiveUsersSortedByName());
