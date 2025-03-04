// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// Function to generate slug
function generateSlug(text) {
    return text.toLowerCase()
        .replace(/[áàãâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòõôö]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

print("Cleaning categories collection...");
db.tb_categoria.deleteMany({});

print("Creating categories...");
// RSS Feed categories from memory
const categorias = [
    { nome: "Geral", descricao: "Notícias gerais e últimas notícias" },
    { nome: "Economia", descricao: "Mercado financeiro e negócios" },
    { nome: "Tecnologia", descricao: "Tech news e inovação" },
    { nome: "Esportes", descricao: "Notícias esportivas" },
    { nome: "Marketing", descricao: "Marketing e publicidade" },
    { nome: "Criptomoedas", descricao: "Mercado crypto e blockchain" }
];

const categoriasDb = categorias.map(cat => ({
    txt_nome: cat.nome,
    txt_slug: generateSlug(cat.nome),
    txt_descricao: cat.descricao,
    dthr_criacao: new Date(),
    dthr_ultima_atualizacao: new Date()
}));

db.tb_categoria.insertMany(categoriasDb);
print(`Created ${categoriasDb.length} categories`);
