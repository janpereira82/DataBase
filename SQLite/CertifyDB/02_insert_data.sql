-- Insert Users
WITH RECURSIVE usuarios(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM usuarios WHERE n < 100
)
INSERT INTO tb_usuario (nome, email, senha, tipo_usuario, linkedin_profile)
SELECT 
    CASE 
        WHEN n <= 5 THEN 'Admin ' || n
        WHEN n <= 15 THEN 'Instrutor ' || n
        ELSE 'Aluno ' || n
    END,
    CASE 
        WHEN n <= 5 THEN 'admin' || n || '@certifydb.com'
        WHEN n <= 15 THEN 'instrutor' || n || '@certifydb.com'
        ELSE 'aluno' || n || '@email.com'
    END,
    'senha' || n,
    CASE 
        WHEN n <= 5 THEN 'admin'
        WHEN n <= 15 THEN 'instrutor'
        ELSE 'aluno'
    END,
    'linkedin.com/user' || n
FROM usuarios;

-- Insert Courses
WITH RECURSIVE cursos(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM cursos WHERE n < 50
)
INSERT INTO tb_curso (titulo, descricao, carga_horaria, id_instrutor)
SELECT 
    CASE (n % 5)
        WHEN 0 THEN 'Desenvolvimento Web ' || n
        WHEN 1 THEN 'Data Science ' || n
        WHEN 2 THEN 'Python ' || n
        WHEN 3 THEN 'SQL ' || n
        ELSE 'Machine Learning ' || n
    END,
    'Descrição detalhada do curso ' || n,
    (n % 3 + 1) * 20,
    (n % 10 + 6)
FROM cursos;

-- Insert Enrollments
WITH RECURSIVE inscricoes(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM inscricoes WHERE n < 200
)
INSERT INTO tb_inscricao (id_aluno, id_curso, status, nota_final, data_conclusao)
SELECT 
    (n % 85 + 16),
    (n % 50 + 1),
    CASE (n % 3)
        WHEN 0 THEN 'concluido'
        WHEN 1 THEN 'em_andamento'
        ELSE 'cancelado'
    END,
    CASE 
        WHEN n % 3 = 0 THEN ROUND((RANDOM() * 3 + 7), 2)
        ELSE NULL
    END,
    CASE 
        WHEN n % 3 = 0 THEN datetime('now', '-' || (n % 30) || ' days')
        ELSE NULL
    END
FROM inscricoes;

-- Insert Certificates
INSERT INTO tb_certificado (id_inscricao, codigo_validacao)
SELECT 
    i.id_inscricao,
    'CERT-2023-' || printf('%04d', i.id_inscricao)
FROM tb_inscricao i
WHERE i.status = 'concluido';