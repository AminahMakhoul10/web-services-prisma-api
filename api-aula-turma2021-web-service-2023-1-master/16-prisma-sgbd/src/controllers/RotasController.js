import { prisma } from "../configs/prismaClient.js";

class RotasController {
  // GET - Listar Rotas com Filtros
  static listarRotas = async (req, res) => {
    try {
      let rotasExist = null;

      // Realizar uma busca no banco de dados por todas as rotas sem filtro
      if (!req.query.nome) {
        rotasExist = await prisma.rotas.findMany({});
      }

      // Fazer uma busca no banco de dados com filtro por nome
      if (req.query.nome) {
        rotasExist = await prisma.rotas.findMany({
          where: {
            nome: {
              contains: req.query.nome,
            },
          },
        });
      }

      return res.status(200).json(rotasExist);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // GET por ID - Listar Rota por ID
  static listarRotaPorId = async (req, res) => {
    try {
      const rotaExists = await prisma.rotas.findFirst({
        where: {
          id: {
            equals: req.params.id,
          },
        },
      });

      if (rotaExists) {
        return res.status(200).json(rotaExists);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // POST - Cadastrar Rota
  static cadastrarRota = async (req, res) => {
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

      // Criar a rota
      const rotaCreated = await prisma.rotas.create({
        data: {
          nome,
          descricao,
        },
      });

      return res.status(201).json(rotaCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // PATCH - Atualizar Rota
  static PATCHAtualizarRota = async (req, res) => {
    try {
      // Testar se o ID da rota foi informado
      if (!req.params.id) {
        return res.status(400).json([
          { error: true, code: 400, message: "ID da rota é obrigatório" },
        ]);
      }

      const id = req.params.id;
      const { nome, descricao } = req.body;

      // Atualizar os atributos da rota que foram informados
      const rotaUpdated = await prisma.rotas.update({
        where: {
          id: id,
        },
        data: {
          nome,
          descricao,
        },
      });

      return res.status(200).json(rotaUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }

  // DELETE - Excluir Rota
  static excluirRota = async (req, res) => {
    try {
      // Testar se o ID da rota foi informado
      if (!req.params.id) {
        return res.status(400).json([
          { error: true, code: 400, message: "ID da rota é obrigatório" },
        ]);
      }

      const id = req.params.id;

      // Excluir a rota
      const rotaDeleted = await prisma.rotas.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(rotaDeleted);
    } catch (err) {
      console.error(err);
      return res.status(500).json([
        { error: true, code: 500, message: "Erro interno do Servidor" },
      ]);
    }
  }
}

export default RotasController;
