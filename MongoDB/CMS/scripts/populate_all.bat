@echo off
echo Populando banco de dados...

REM Limpar banco primeiro
echo 0. Limpando banco de dados...
mongosh --file scripts/00_clean_database.js
if %errorlevel% neq 0 goto error

REM Popular coleções em sequência
echo 1. Criando usuarios...
mongosh --file scripts/01_populate_usuarios.js
if %errorlevel% neq 0 goto error

echo 2. Criando perfis...
mongosh --file scripts/02_populate_perfis.js
if %errorlevel% neq 0 goto error

echo 3. Criando categorias...
mongosh --file scripts/03_populate_categorias.js
if %errorlevel% neq 0 goto error

echo 4. Criando artigos...
mongosh --file scripts/04_populate_artigos.js
if %errorlevel% neq 0 goto error

echo 5. Criando midias...
mongosh --file scripts/05_populate_midias.js
if %errorlevel% neq 0 goto error

echo 6. Criando configuracoes...
mongosh --file scripts/06_populate_configuracoes.js
if %errorlevel% neq 0 goto error

echo.
echo Banco de dados populado com sucesso!
goto end

:error
echo.
echo Erro ao popular o banco de dados!
exit /b 1

:end
exit /b 0
