# CertifyDB - Sistema de Certificação de Cursos (SQLite)

Este é um projeto de banco de dados SQLite para um sistema de certificação de cursos online. O sistema gerencia usuários, cursos, inscrições e certificados.

## Estrutura do Banco de Dados

### Tabelas

1. **tb_usuario**
   - Armazena informações dos usuários (alunos, instrutores e administradores)
   - Campos principais: id_usuario, nome, email, senha, tipo_usuario

2. **tb_curso**
   - Contém os cursos disponíveis na plataforma
   - Campos principais: id_curso, titulo, descricao, carga_horaria, id_instrutor

3. **tb_inscricao**
   - Registra as inscrições dos alunos nos cursos
   - Campos principais: id_inscricao, id_aluno, id_curso, status, nota_final

4. **tb_certificado**
   - Gerencia os certificados emitidos para cursos concluídos
   - Campos principais: id_certificado, id_inscricao, codigo_validacao

## Arquivos do Projeto

- `01_create_schema.sql`: Cria a estrutura do banco de dados
- `02_insert_data.sql`: Insere dados de exemplo
- `03_test_queries.sql`: Consultas de teste para validar o banco de dados
- `verify_database.sql`: Script para verificar a integridade dos dados
- `certifydb.sqlite`: Arquivo do banco de dados SQLite

## Como Executar

1. Certifique-se de ter o SQLite instalado em seu sistema
2. Execute os scripts na seguinte ordem:
   ```bash
   sqlite3 certifydb.sqlite ".read 01_create_schema.sql"
   sqlite3 certifydb.sqlite ".read 02_insert_data.sql"
   sqlite3 certifydb.sqlite ".read 03_test_queries.sql"
   ```

## Verificação do Banco de Dados

Para verificar o estado atual do banco de dados, execute:
```bash
sqlite3 certifydb.sqlite ".read verify_database.sql"
```

Este comando mostrará um resumo das tabelas e seus registros.