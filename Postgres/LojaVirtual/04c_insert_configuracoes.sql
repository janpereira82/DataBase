-- Inserção de configurações
INSERT INTO tb_configuracao (
            cod_configuracao,
            desc_chave,
            desc_valor,
            desc_descricao
        ) VALUES
(
                1,
                'site_name',
                'MegaStore Brasil',
                'Nome do site'
            ),
(
                2,
                'site_url',
                'www.megastorebrasil.com.br',
                'URL do site'
            ),
(
                3,
                'contact_email',
                'contato@megastorebrasil.com.br',
                'Email de contato'
            ),
(
                4,
                'support_phone',
                '0800-123-4567',
                'Telefone de suporte'
            ),
(
                5,
                'support_whatsapp',
                '11999887766',
                'WhatsApp de suporte'
            ),
(
                6,
                'support_hours',
                'Segunda a Sexta, 9h as 18h',
                'Horario de atendimento'
            ),
(
                7,
                'shipping_min_days',
                '2',
                'Prazo minimo de entrega em dias'
            ),
(
                8,
                'shipping_max_days',
                '15',
                'Prazo maximo de entrega em dias'
            ),
(
                9,
                'min_order_value',
                '50.00',
                'Valor minimo do pedido'
            ),
(
                10,
                'free_shipping_value',
                '199.90',
                'Valor para frete gratis'
            );
