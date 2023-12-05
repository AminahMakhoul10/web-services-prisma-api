import bcrypt from "bcryptjs";
import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

export default class GrupoController {
  static listarGrupos = async (req, res) => {
    try {
      let grupos = null;

      const { nome } = req.query;

      if (nome) {
        grupos = await prisma.grupos.findMany({
          where: {
            nome: {
              contains: nome
            }
          }
        });
      } else {
        grupos = await prisma.grupos.findMany();
      }

      return res.status(200).json(grupos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static listarGrupoPorID = async (req, res) => {
    try {
      const { id } = req.params;

      let grupos = null;

      grupos = await prisma.grupos.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      if (!grupos) {
        return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado" })
      }

      return res.status(200).json(grupos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static cadastrarGrupo = async (req, res) => {
    try {
      const { nome, descricao, ativo, unidade } = req.body;
      let errors = [];
      let nomeExiste = null;

      if (!nome) {
        errors.push({ message: "Nome é obrigatório" })
      }

      if (!ativo) {
        errors.push({ message: "Ativo é obrigatório" })
      }

      if (!unidade) {
        errors.push({ message: "Unidade é obrigatório" })
      }

      nomeExiste = await prisma.grupos.findFirst({
        where: {
          nome: {
            equals: nome
          }
        }
      })

      if (nomeExiste) {
        errors.push({ message: "Nome de grupo já cadastrado"})
      }

      if (errors.length > 0) {
        return res.status(400).json({ error: true, code: 400, message: errors })
      }

      let novoGrupo = await prisma.grupos.create({
        data: {
          nome,
          ativo,
          descricao,
          unidade
        }
      })

      return res.status(201).json(novoGrupo)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static atualizarGrupo = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, descricao, ativo, unidade } = req.body;

      let grupoExiste = null;

      if (!id) {
        return res.status(400).json({ error: true, code: 400, message: "Informe um ID para atualizar grupo" })
      }

      grupoExiste = await prisma.grupos.findFirst({
        where: {
          id: id
        }
      })

      if (!grupoExiste)  {
        return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado, verifique os dados"})
      }


      if (!nome && !descricao && !ativo && !unidade) {
        return res.status(400).json({ error: true, code: 400, message: "Informe algum dado de grupo para atualizar" })
      }

      let nomeExiste = null;

      nomeExiste = await prisma.grupos.findFirst({
        where: {
          nome: {
            equals: nome
          }
        }
      })

      if (nomeExiste) {
        return res.status(400).json({ error: true, code: 400, message: "Nome de grupo já cadastrado" })
      }

      let grupoAtualizado = await prisma.grupos.update({
        where: {
          id: id
        },
        data: {
          nome,
          descricao,
          ativo,
          unidade
        }
      })

      return res.status(200).json(grupoAtualizado);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }
  
  static excluirGrupo = async (req,res) => {
    try {
      const { id } = req.params;

      let grupoExiste = null;

      if (!id) {
        return res.status(400).json({ error: true, code: 400, message: "Informe um ID para excluir grupo" })
      }

      grupoExiste = await prisma.grupos.findFirst({
        where: {
          id: id
        }
      })

      if (!grupoExiste)  {
        return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado, verifique os dados"})
      }

      let errors = [];

      let grupoVinculadoUsuario = await prisma.usuariosGrupos.findFirst({
        where: {
          grupo_id: id
        }
      })

      let grupoVinculadoRota = await prisma.gruposRotas.findFirst({
        where: {
          grupo_id: id
        }
      })

      if (grupoVinculadoUsuario) {
        errors.push("O grupo que está tentando deletar está vinculado a usuários")
      }

      if (grupoVinculadoRota) {
        errors.push("O grupo que está tentando deletar está vinculado a rotas")
      }

      if (errors.length > 0 ) {
        return res.status(400).json({ error: true, code: 400, message: errors})
      }

      let grupoDeletado = await prisma.grupos.delete({
        where: {
          id: id
        }
      })

      return res.status(200).json(grupoDeletado)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }
}