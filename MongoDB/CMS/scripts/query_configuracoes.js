// Switch to the CMS database
db = db.getSiblingDB('cms_database');

// 1. Buscar configuração por chave
function getConfigByKey(key) {
    return db.tb_configuracao.findOne({ txt_chave: key });
}

// 2. Buscar todas as configurações do sistema
function getSystemConfigs() {
    return db.tb_configuracao.find({ bool_sistema: true }).toArray();
}

// 3. Buscar configurações por tipo
function getConfigsByType(tipo) {
    return db.tb_configuracao.find({ enum_tipo: tipo }).toArray();
}

// 4. Atualizar valor de configuração
function updateConfigValue(key, value) {
    return db.tb_configuracao.updateOne(
        { txt_chave: key },
        { 
            $set: { 
                txt_valor: value,
                dthr_ultima_atualizacao: new Date()
            }
        }
    );
}

// Exemplos de uso
print("\n1. Buscando configuração 'site_titulo':");
printjson(getConfigByKey("site_titulo"));

print("\n2. Todas as configurações do sistema:");
printjson(getSystemConfigs());

print("\n3. Configurações do tipo 'texto':");
printjson(getConfigsByType("texto"));

print("\n4. Atualizando valor de uma configuração:");
printjson(updateConfigValue("items_por_pagina", "30"));
