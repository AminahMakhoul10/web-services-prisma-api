import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class UsuarioRotaController {
  static listarUsuariosRotas = async (req, res) => {
    try {
      const usuariosRotas = await prisma.usuariosRotas.findMany();
      return res.status(200).json(usuariosRotas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static associarUsuarioRota = async (req, res) => {
    try {
      const { usuarioId, rotaId } = req.body;

      if (!usuarioId || !rotaId) {
        return res.status(400).json({ error: true, code: 400, message: "UsuarioId e rotaId são obrigatórios" });
      }

      // Lógica para associar um usuário a uma rota
      const associacao = await prisma.usuariosRotas.create({
        data: {
          usuario_id: usuarioId,
          rota_id: rotaId
        }
      });

      return res.status(201).json(associacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static desassociarUsuarioRota = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: true, code: 400, message: "Informe um ID para desassociar usuário de rota" });
      }

      
      const desassociacao = await prisma.usuariosRotas.delete({
        where: {
          id: parseInt(id)
        }
      });

      return res.status(200).json(desassociacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }
}
