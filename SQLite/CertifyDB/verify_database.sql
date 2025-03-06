-- Verificação da estrutura e dados
SELECT 'Usuários' as tabela, COUNT(*) as total,
    COUNT(CASE WHEN tipo_usuario = 'admin' THEN 1 END) as admins,
    COUNT(CASE WHEN tipo_usuario = 'instrutor' THEN 1 END) as instrutores,
    COUNT(CASE WHEN tipo_usuario = 'aluno' THEN 1 END) as alunos
FROM tb_usuario
UNION ALL
SELECT 'Cursos' as tabela, COUNT(*) as total, 
    NULL, NULL, NULL
FROM tb_curso
UNION ALL
SELECT 'Inscrições' as tabela, COUNT(*) as total,
    COUNT(CASE WHEN status = 'concluido' THEN 1 END) as concluidos,
    COUNT(CASE WHEN status = 'em_andamento' THEN 1 END) as em_andamento,
    COUNT(CASE WHEN status = 'cancelado' THEN 1 END) as cancelados
FROM tb_inscricao
UNION ALL
SELECT 'Certificados' as tabela, COUNT(*) as total,
    NULL, NULL, NULL
FROM tb_certificado;