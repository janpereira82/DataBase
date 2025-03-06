Write-Host "Executando scripts do CertifyDB..." -ForegroundColor Green

Write-Host "Criando esquema do banco de dados..." -ForegroundColor Yellow
& sqlite3 certifydb.sqlite ".read 01_create_schema.sql"

Write-Host "Inserindo dados de exemplo..." -ForegroundColor Yellow
& sqlite3 certifydb.sqlite ".read 02_insert_data.sql"

Write-Host "Executando consultas de teste..." -ForegroundColor Yellow
& sqlite3 certifydb.sqlite ".read 03_test_queries.sql"

Write-Host "Verificando estado do banco de dados..." -ForegroundColor Yellow
& sqlite3 certifydb.sqlite ".read verify_database.sql"

Write-Host "Processo concluído!" -ForegroundColor Green
Pause