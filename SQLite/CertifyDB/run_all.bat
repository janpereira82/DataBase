@echo off
echo Executando scripts do CertifyDB...

echo Criando esquema do banco de dados...
sqlite3 certifydb.sqlite ".read 01_create_schema.sql"

echo Inserindo dados de exemplo...
sqlite3 certifydb.sqlite ".read 02_insert_data.sql"

echo Executando consultas de teste...
sqlite3 certifydb.sqlite ".read 03_test_queries.sql"

echo Verificando estado do banco de dados...
sqlite3 certifydb.sqlite ".read verify_database.sql"

echo Processo concluído!
pause