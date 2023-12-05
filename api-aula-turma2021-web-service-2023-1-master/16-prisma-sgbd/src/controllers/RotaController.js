import bcrypt from "bcryptjs";
import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

export default class RotaController {
  static listarRotas = async (req, res) => {
    try {
      let rotas = null;

      const { rota } = req.query;

      if (rota) {
        rotas = await prisma.rotas.findMany({
          where: {
            rota: {
              contains: rota
            }
          }
        });
      } else {
        rotas = await prisma.rotas.findMany();
      }

      return res.status(200).json(rotas);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static listarRotaPorID = async (req, res) => {
    try {
      const { id } = req.params;

      let rotas = null;

      rotas = await prisma.rotas.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      })

      console.log(rotas)

      if (!rotas) {
        return res.status(404).json({ error: true, code: 404, message: "Rota não encontrada" })
      }

      return res.status(200).json(rotas);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static cadastrarRota = async (req, res) => {
    try {
      const { rota, dominio, verbo_get, verbo_post, verbo_delete, verbo_patch, verbo_put, ativo } = req.body;
      
      let erros = [];

      if (!rota) {
        erros.push({ error: true, code: 400, message: "Informe o nome da rota" })
      }

      if (!dominio) {
        erros.push({ error: true, code: 400, message: "Informe o domínio da rota" })
      }
      
      if (!verbo_get) {
        erros.push({ error: true, code: 400, message: "Informe o verbo_get" })
      }

      if (!verbo_post) {
        erros.push({ error: true, code: 400, message: "Informe o verbo_post" })
      }

      if (!verbo_delete) {
        erros.push({ error: true, code: 400, message: "Informe o verbo_delete" })
      }
      
      if (!verbo_patch) {
        erros.push({ error: true, code: 400, message: "Informe o verbo_patch" })
      }

      if (!verbo_put) {
        erros.push({ error: true, code: 400, message: "Informe o verbo_put" })
      }

      let rotaExist = await prisma.rotas.findFirst({
        where: {
          rota: {
            equals: rota
          }
        }
      })

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }
}