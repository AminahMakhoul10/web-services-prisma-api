import { prisma } from "../configs/prismaClient.js";

class GruposController {
  // GET - Listar Grupos com Filtros
  static listarGrupos = async (req, res) => {
    try {
      let gruposExist = null;

      // Realizar uma busca no banco de dados por todos os grupos sem filtro
      if (!req.query.nome) {
        gruposExist = await prisma.grupos.findMany({});
      }

      // Fazer uma busca no banco de dados com filtro por nome
      if (req.query.nome) {
        gruposExist = await prisma.grupos.findMany({
          where: {
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      return res.status(200).json(gruposExist);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // GET por ID - Listar Grupo por ID
  static listarGrupoPorId = async (req, res) => {
    try {
      const grupoExists = await prisma.grupos.findFirst({
        where: {
          id: {
            equals: req.params.id,
          },
        },
      });

      if (grupoExists) {
        return res.status(200).json(grupoExists);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // POST - Cadastrar Grupo
  static cadastrarGrupo = async (req, res) => {
    try {
      const { nome, descricao } = req.body;
      const erros = [];

      // Validar os dados
      if (!nome) {
        erros.push({ error: true, code: 400, message: "Nome é obrigatório" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      // Criar o grupo
      const grupoCreated = await prisma.grupos.create({
        data: {
          nome,
          descricao,
        },
      });

      return res.status(201).json(grupoCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // PATCH - Atualizar Grupo
  static PATCHAtualizarGrupo = async (req, res) => {
    try {
      // Testar se o ID do grupo foi informado
      if (!req.params.id) {
        return res.status(400).json([
          { error: true, code: 400, message: "ID do grupo é obrigatório" },
        ]);
      }

      const id = req.params.id;
      const { nome, descricao } = req.body;

      // Atualizar os atributos do grupo que foram informados
      const grupoUpdated = await prisma.grupos.update({
        where: {
          id: id,
        },
        data: {
          nome,
          descricao,
        },
      });

      return res.status(200).json(grupoUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // DELETE - Excluir Grupo
  static excluirGrupo = async (req, res) => {
    try {
      // Testar se o ID do grupo foi informado
      if (!req.params.id) {
        return res.status(400).json([
          { error: true, code: 400, message: "ID do grupo é obrigatório" },
        ]);
      }

      const id = req.params.id;

      // Excluir o grupo
      const grupoDeleted = await prisma.grupos.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(grupoDeleted);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }
}

export default GruposController;
