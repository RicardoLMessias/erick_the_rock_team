export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Método não permitido."
        });
    }

    try {
        const { nome, email, celular, mensagem } = req.body;

        // Validação dos campos
        if (!nome || !email || !celular || !mensagem) {
            return res.status(400).json({
                success: false,
                message: "Preencha todos os campos."
            });
        }

        // API Key criada pela integração do Resend na Vercel
        const apiKey = process.env.RESEND_API_KEY_RESEND_API_KEY;

        if (!apiKey) {
            console.error("RESEND_API_KEY_RESEND_API_KEY não encontrada.");

            return res.status(500).json({
                success: false,
                message: "Erro de configuração do servidor."
            });
        }

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },

            body: JSON.stringify({
                from: "Erick Personal <contato@erickpersonal.com.br>",
                to: ["erickrss@hotmail.com"],
                reply_to: email,

                subject: `Novo contato pelo site - ${nome}`,

                html: `
                    <h2>Novo contato pelo site Erick Personal</h2>

                    <p>
                        <strong>Nome:</strong>
                        ${nome}
                    </p>

                    <p>
                        <strong>E-mail:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Celular:</strong>
                        ${celular}
                    </p>

                    <p>
                        <strong>Mensagem:</strong>
                    </p>

                    <p>
                        ${mensagem}
                    </p>
                `
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Erro retornado pelo Resend:", data);

            return res.status(500).json({
                success: false,
                message: "Não foi possível enviar a mensagem."
            });
        }

        console.log("E-mail enviado:", data);

        return res.status(200).json({
            success: true,
            message: "Mensagem enviada com sucesso!"
        });

    } catch (error) {
        console.error("Erro interno:", error);

        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
    }
}