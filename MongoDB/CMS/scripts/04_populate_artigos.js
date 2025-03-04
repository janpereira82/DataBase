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

// Function to generate random date between two dates
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

print("Cleaning articles collection...");
db.tb_artigo.deleteMany({});

// Get all categories and users for reference
const categorias = db.tb_categoria.find().toArray();
const usuarios = db.tb_usuario.find().toArray();

if (categorias.length === 0 || usuarios.length === 0) {
    print("Error: Categories and users must be populated first!");
    quit();
}

// Tags based on RSS categories
const tags = [
    "Notícias", "Mercado", "Finanças", "Tecnologia", "Inovação",
    "Esportes", "Marketing", "Publicidade", "Crypto", "Blockchain",
    "Negócios", "Economia", "Investimentos", "Digital", "Tendências"
];

print("Creating articles...");
const dataInicio = new Date(2020, 0, 1);
const dataFim = new Date();
let count = 0;

// Create articles in batches of 1000
for (let batch = 0; batch < 10; batch++) {
    const artigos = [];
    for (let i = 0; i < 1000; i++) {
        const categoria = categorias[Math.floor(Math.random() * categorias.length)];
        const titulo = `${categoria.txt_nome}: ${tags[Math.floor(Math.random() * tags.length)]} #${batch * 1000 + i + 1}`;
        const dthr_criacao = randomDate(dataInicio, dataFim);
        
        const artigo = {
            txt_titulo: titulo,
            txt_slug: generateSlug(titulo),
            txt_conteudo: `Artigo sobre ${categoria.txt_nome}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${batch * 1000 + i + 1}`,
            txt_resumo: `Resumo do artigo sobre ${categoria.txt_nome} ${batch * 1000 + i + 1}`,
            arr_tags: Array.from(
                { length: Math.floor(Math.random() * 3) + 1 }, 
                () => tags[Math.floor(Math.random() * tags.length)]
            ),
            cod_categoria: categoria._id,
            cod_autor: usuarios[Math.floor(Math.random() * usuarios.length)]._id,
            enum_status: ["rascunho", "publicado", "arquivado"][Math.floor(Math.random() * 3)],
            num_visualizacoes: Math.floor(Math.random() * 10000),
            dthr_publicacao: dthr_criacao,
            dthr_criacao: dthr_criacao,
            dthr_ultima_atualizacao: randomDate(dthr_criacao, dataFim)
        };
        artigos.push(artigo);
    }
    
    db.tb_artigo.insertMany(artigos);
    count += artigos.length;
    print(`Inserted ${count} articles...`);
}

print(`Total articles created: ${count}`);
