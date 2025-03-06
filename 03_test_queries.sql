-- Test 1: List all courses with their instructors
SELECT 
    c.titulo,
    c.carga_horaria,
    u.nome as instrutor,
    u.email as email_instrutor
FROM tb_curso c
JOIN tb_usuario u ON c.id_instrutor = u.id_usuario
LIMIT 10;

-- Test 2: List all enrollments with student and course data
SELECT 
    u.nome as aluno,
    c.titulo as curso,
    i.status,
    i.nota_final
FROM tb_inscricao i
JOIN tb_usuario u ON i.id_aluno = u.id_usuario
JOIN tb_curso c ON i.id_curso = c.id_curso
LIMIT 10;

-- Test 3: List certificates with complete data
SELECT 
    u.nome as aluno,
    c.titulo as curso,
    cert.codigo_validacao,
    cert.data_emissao
FROM tb_certificado cert
JOIN tb_inscricao i ON cert.id_inscricao = i.id_inscricao
JOIN tb_usuario u ON i.id_aluno = u.id_usuario
JOIN tb_curso c ON i.id_curso = c.id_curso
LIMIT 10;

-- Test 4: Count students per course
SELECT 
    c.titulo,
    COUNT(i.id_aluno) as total_alunos,
    COUNT(CASE WHEN i.status = 'concluido' THEN 1 END) as alunos_concluintes
FROM tb_curso c
LEFT JOIN tb_inscricao i ON c.id_curso = i.id_curso
GROUP BY c.titulo
ORDER BY total_alunos DESC
LIMIT 10;

-- Test 5: Database Statistics
SELECT 
    (SELECT COUNT(*) FROM tb_usuario WHERE tipo_usuario = 'aluno') as total_alunos,
    (SELECT COUNT(*) FROM tb_usuario WHERE tipo_usuario = 'instrutor') as total_instrutores,
    (SELECT COUNT(*) FROM tb_curso) as total_cursos,
    (SELECT COUNT(*) FROM tb_inscricao) as total_inscricoes,
    (SELECT COUNT(*) FROM tb_certificado) as total_certificados;