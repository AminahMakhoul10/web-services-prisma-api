import express from "express";
import RotaController from "../controllers/RotaController.js";

const router = express.Router();

router
  .get("/rotas", RotaController.listarRotas)
  .get("/rotas/:id", RotaController.listarRotaPorID)
  //.post("/rotas", UsuarioController.cadastrarUsuario)
  //.patch("/rotas/:id", UsuarioController.PATCHAtualizarUsuario)
  //.delete("/rotas/:id", UsuarioController.excluirUsuario)

export default router;
