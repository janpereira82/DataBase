// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// 1. Buscar mídias por tipo
function findMediaByType(tipo) {
    return db.tb_midia.find({ txt_tipo: tipo }).toArray();
}

// 2. Buscar mídias por usuário
function findMediaByUser(userId) {
    return db.tb_midia.find({ cod_usuario: ObjectId(userId) }).toArray();
}

// 3. Estatísticas de uso de espaço por tipo
function getStorageStatsByType() {
    return db.tb_midia.aggregate([
        {
            $group: {
                _id: "$txt_tipo",
                total_arquivos: { $sum: 1 },
                espaco_total: { $sum: "$num_tamanho" },
                tamanho_medio: { $avg: "$num_tamanho" }
            }
        }
    ]).toArray();
}

// 4. Buscar mídias por MIME type
function findMediaByMimeType(mimeType) {
    return db.tb_midia.find({ txt_mime_type: mimeType }).toArray();
}

// 5. Mídias mais recentes
function getRecentMedia(limit = 10) {
    return db.tb_midia.find()
        .sort({ dthr_criacao: -1 })
        .limit(limit)
        .toArray();
}

// Exemplos de uso
print("\n1. Mídias do tipo 'imagem':");
printjson(findMediaByType("imagem"));

print("\n2. Estatísticas de uso de espaço por tipo:");
printjson(getStorageStatsByType());

print("\n3. Mídias do tipo MIME 'image/jpeg':");
printjson(findMediaByMimeType("image/jpeg"));

print("\n4. 5 mídias mais recentes:");
printjson(getRecentMedia(5));
