// Switch to the CMS database
db = db.getSiblingDB('cms_database');

print("Cleaning media collection...");
db.tb_midia.deleteMany({});

// Get users for reference
const usuarios = db.tb_usuario.find().toArray();

if (usuarios.length === 0) {
    print("Error: Users must be populated first!");
    quit();
}

print("Creating media entries...");
const tipos = ["imagem", "documento", "video"];
const mimeTypes = {
    "imagem": ["image/jpeg", "image/png", "image/gif"],
    "documento": ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    "video": ["video/mp4", "video/quicktime", "video/x-msvideo"]
};

const midias = Array.from({ length: 1000 }, (_, i) => {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const mimeType = mimeTypes[tipo][Math.floor(Math.random() * mimeTypes[tipo].length)];
    
    return {
        txt_nome: `Arquivo ${tipo} ${i + 1}`,
        txt_descricao: `Descrição do arquivo ${tipo} ${i + 1}`,
        url_arquivo: `https://storage.exemplo.com/arquivos/${tipo}/${i + 1}${mimeType.split('/')[1]}`,
        txt_tipo: tipo,
        num_tamanho: Math.floor(Math.random() * 10000000), // Random size up to 10MB
        txt_mime_type: mimeType,
        cod_usuario: usuarios[Math.floor(Math.random() * usuarios.length)]._id,
        dthr_criacao: new Date(),
        dthr_ultima_atualizacao: new Date()
    };
});

db.tb_midia.insertMany(midias);
print(`Created ${midias.length} media entries`);
