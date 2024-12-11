import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import Login from "../models/Classes/LoginClass.js";
import jwt from "jsonwebtoken";
dotenv.config();

const ResetControler = {
    resetSenha: async (req, res) => {
        try {
            const { login } = req.body;
            
            if (!login) {
                return res.status(400).json({ message: "Email não fornecido" });
            }

            // Cria a instância do login
            const oLog = new Login({id:null, perfil:null, login:login});
            const ID = await oLog.selecionarLogin();  // Passa o login (email) como parâmetro para o método

            if (!ID) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            // Gera o token JWT
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign({ id: ID }, secretKey, { expiresIn: "1h" });

            // Configura o transporte do Nodemailer
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,  // false para usar STARTTLS
                auth: {
                    user: "henryfernando2612@gmail.com",
                    pass: "vzvc pedu ngke pihp", // Use a senha de aplicativo aqui
                },
                tls: {
                    rejectUnauthorized: false,  // Apenas se precisar resolver problemas com SSL/TLS
                },
            });

            // Envia o email
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: login,  // Envia para o email fornecido
                subject: 'Redefinir Senha',
                text: `Use este link para redefinir sua senha: http://10.0.3.7:5000/redefinirSenha.html?token=${token}`,
            });

            return res.status(200).json({ message: "Email enviado com sucesso" });

        } catch (error) {
            console.log("Erro ao enviar email", error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
};

export default ResetControler;