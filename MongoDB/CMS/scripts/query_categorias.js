// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// 1. Listar todas as categorias com contagem de artigos
function getCategoriesWithArticleCount() {
    return db.tb_categoria.aggregate([
        {
            $lookup: {
                from: "tb_artigo",
                localField: "_id",
                foreignField: "cod_categoria",
                as: "artigos"
            }
        },
        {
            $project: {
                txt_nome: 1,
                txt_descricao: 1,
                total_artigos: { $size: "$artigos" }
            }
        }
    ]).toArray();
}

// 2. Buscar categoria por slug
function findCategoryBySlug(slug) {
    return db.tb_categoria.findOne({ txt_slug: slug });
}

// 3. Categorias ordenadas por número de artigos
function getCategoriesSortedByArticles() {
    return db.tb_categoria.aggregate([
        {
            $lookup: {
                from: "tb_artigo",
                localField: "_id",
                foreignField: "cod_categoria",
                as: "artigos"
            }
        },
        {
            $project: {
                txt_nome: 1,
                total_artigos: { $size: "$artigos" }
            }
        },
        { $sort: { total_artigos: -1 } }
    ]).toArray();
}

// Exemplos de uso
print("\n1. Categorias com contagem de artigos:");
printjson(getCategoriesWithArticleCount());

print("\n2. Buscando categoria por slug:");
printjson(findCategoryBySlug("tecnologia"));

print("\n3. Categorias ordenadas por número de artigos:");
printjson(getCategoriesSortedByArticles());
