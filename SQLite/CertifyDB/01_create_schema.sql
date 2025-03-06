-- Create Users table
CREATE TABLE IF NOT EXISTS tb_usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario TEXT CHECK(tipo_usuario IN ('aluno', 'instrutor', 'admin')) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    linkedin_profile VARCHAR(255)
);

-- Create Courses table
CREATE TABLE IF NOT EXISTS tb_curso (
    id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INTEGER NOT NULL,
    id_instrutor INTEGER,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1,
    FOREIGN KEY (id_instrutor) REFERENCES tb_usuario(id_usuario)
);

-- Create Enrollments table
CREATE TABLE IF NOT EXISTS tb_inscricao (
    id_inscricao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_aluno INTEGER,
    id_curso INTEGER,
    data_inscricao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME,
    status TEXT CHECK(status IN ('em_andamento', 'concluido', 'cancelado')) DEFAULT 'em_andamento',
    nota_final DECIMAL(4,2),
    FOREIGN KEY (id_aluno) REFERENCES tb_usuario(id_usuario),
    FOREIGN KEY (id_curso) REFERENCES tb_curso(id_curso)
);

-- Create Certificates table
CREATE TABLE IF NOT EXISTS tb_certificado (
    id_certificado INTEGER PRIMARY KEY AUTOINCREMENT,
    id_inscricao INTEGER,
    codigo_validacao VARCHAR(50) UNIQUE NOT NULL,
    data_emissao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_compartilhamento_linkedin DATETIME,
    status INTEGER DEFAULT 1,
    FOREIGN KEY (id_inscricao) REFERENCES tb_inscricao(id_inscricao)
);

-- Create indexes
CREATE INDEX idx_usuario_email ON tb_usuario(email);
CREATE INDEX idx_inscricao_aluno ON tb_inscricao(id_aluno);
CREATE INDEX idx_inscricao_curso ON tb_inscricao(id_curso);
CREATE INDEX idx_certificado_codigo ON tb_certificado(codigo_validacao);