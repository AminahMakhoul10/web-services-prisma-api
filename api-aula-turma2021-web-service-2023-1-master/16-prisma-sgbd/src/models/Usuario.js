import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default class UsuarioController {
  static listarUsuarios = async (req, res) => {
    try {
      const usuarios = await prisma.usuarios.findMany();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static cadastrarUsuario = async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: true, code: 400, message: "Nome, email e senha são obrigatórios" });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = await prisma.usuarios.create({
        data: {
          nome,
          email,
          senha: senhaHash
        }
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static atualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      if (!id) {
        return res.status(400).json({ error: true, code: 400, message: "Informe um ID para atualizar usuário" });
      }

      const usuarioExistente = await prisma.usuarios.findFirst({
        where: {
          id: parseInt(id)
        }
      });

      if (!usuarioExistente) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado, verifique os dados" });
      }

      const senhaHash = senha ? await bcrypt.hash(senha, 10) : undefined;

      const usuarioAtualizado = await prisma.usuarios.update({
        where: {
          id: parseInt(id)
        },
        data: {
          nome,
          email,
          senha: senhaHash
        }
      });

      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static excluirUsuario = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: true, code: 400, message: "Informe um ID para excluir usuário" });
      }

      const usuarioExistente = await prisma.usuarios.findFirst({
        where: {
          id: parseInt(id)
        }
      });

      if (!usuarioExistente) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado, verifique os dados" });
      }

      const usuarioExcluido = await prisma.usuarios.delete({
        where: {
          id: parseInt(id)
        }
      });

      return res.status(200).json(usuarioExcluido);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }
}
