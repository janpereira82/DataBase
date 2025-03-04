// Switch to the CMS database
db = db.getSiblingDB('cms_database');

print("Cleaning database...");

// List of all collections
const collections = [
    "tb_usuario",
    "tb_perfil",
    "tb_categoria",
    "tb_artigo",
    "tb_midia",
    "tb_configuracao"
];

// Drop each collection
collections.forEach(collection => {
    print(`Dropping collection ${collection}...`);
    db[collection].drop();
});

print("Database cleaned successfully!");
