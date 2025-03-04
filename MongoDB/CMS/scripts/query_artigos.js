// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// 1. Buscar artigos por categoria
function findArticlesByCategory(categoryName) {
    const categoria = db.tb_categoria.findOne({ txt_nome: categoryName });
    if (!categoria) return [];
    
    return db.tb_artigo.find({ 
        cod_categoria: categoria._id,
        enum_status: "publicado"
    }).toArray();
}

// 2. Buscar artigos por tag
function findArticlesByTag(tag) {
    return db.tb_artigo.find({ 
        arr_tags: tag,
        enum_status: "publicado"
    }).toArray();
}

// 3. Artigos mais visualizados
function getMostViewedArticles(limit = 10) {
    return db.tb_artigo.find(
        { enum_status: "publicado" }
    ).sort({ num_visualizacoes: -1 })
    .limit(limit).toArray();
}

// 4. Contagem de artigos por status
function countArticlesByStatus() {
    return db.tb_artigo.aggregate([
        { $group: { _id: "$enum_status", total: { $sum: 1 } } }
    ]).toArray();
}

// 5. Buscar artigos por período
function findArticlesByDateRange(startDate, endDate) {
    return db.tb_artigo.find({
        dthr_publicacao: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        },
        enum_status: "publicado"
    }).toArray();
}

// Exemplos de uso
print("\n1. Artigos da categoria 'Tecnologia':");
printjson(findArticlesByCategory("Tecnologia"));

print("\n2. Artigos com tag 'Blockchain':");
printjson(findArticlesByTag("Blockchain"));

print("\n3. Top 5 artigos mais visualizados:");
printjson(getMostViewedArticles(5));

print("\n4. Contagem de artigos por status:");
printjson(countArticlesByStatus());

print("\n5. Artigos publicados nos últimos 7 dias:");
const hoje = new Date();
const semanaAtras = new Date(hoje.getTime() - (7 * 24 * 60 * 60 * 1000));
printjson(findArticlesByDateRange(semanaAtras, hoje));
