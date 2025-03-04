// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// Function to normalize text for email
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Arrays for random data
const nomes = [
    "João", "Maria", "Jose", "Ana", "Pedro", "Paulo", "Carlos", "Sandra", "Ricardo", "Patricia",
    "Fernando", "Fernanda", "Lucas", "Luciana", "Roberto", "Roberta", "Miguel", "Gabriela", "Rafael", "Rafaela"
];

const sobrenomes = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
    "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Vieira", "Barbosa", "Rocha"
];

print("Cleaning users collection...");
db.tb_usuario.deleteMany({});

print("Creating users...");
// Create 100 users
const usuarios = [];
for (let i = 0; i < 100; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const username = normalizeText(`${nome}${i}`);
    const email = `${normalizeText(nome)}.${normalizeText(sobrenome)}${i}@email.com`;
    
    const usuario = {
        txt_nome: `${nome} ${sobrenome}`,
        txt_email: email,
        txt_senha: "senha123456", // Minimum 6 characters as per schema
        txt_username: username,
        img_avatar: null,
        enum_status: ["ativo", "inativo", "bloqueado"][Math.floor(Math.random() * 3)],
        arr_roles: ["autor"], // Array with valid role as per schema
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    };
    usuarios.push(usuario);
}

try {
    db.tb_usuario.insertMany(usuarios, { ordered: false });
    print(`Created ${usuarios.length} users`);
} catch (e) {
    print("Error creating users:");
    printjson(e);
}
