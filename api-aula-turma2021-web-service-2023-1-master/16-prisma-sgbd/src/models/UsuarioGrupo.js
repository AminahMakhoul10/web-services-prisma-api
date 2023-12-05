import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class UsuarioGrupoController {
  static listarUsuariosGrupos = async (req, res) => {
    try {
      const usuariosGrupos = await prisma.usuariosGrupos.findMany();
      return res.status(200).json(usuariosGrupos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static associarUsuarioGrupo = async (req, res) => {
    try {
      const { usuarioId, grupoId } = req.body;

      if (!usuarioId || !grupoId) {
        return res.status(400).json({ error: true, code: 400, message: "UsuarioId e grupoId são obrigatórios" });
      }

      // Lógica para associar um usuário a um grupo
      const associacao = await prisma.usuariosGrupos.create({
        data: {
          usuario_id: usuarioId,
          grupo_id: grupoId
        }
      });

      return res.status(201).json(associacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static desassociarUsuarioGrupo = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: true, code: 400, message: "Informe um ID para desassociar usuário de grupo" });
      }

      // Lógica para desassociar um usuário de um grupo
      const desassociacao = await prisma.usuariosGrupos.delete({
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
