import express from "express";
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router();

router
  .get("/grupos", GrupoController.listarGrupos)
  .get("/grupos/:id", GrupoController.listarGrupoPorID)
  .post("/grupos", GrupoController.cadastrarGrupo)
  .patch("/grupos/:id", GrupoController.atualizarGrupo)
  .delete("/rotas/:id", GrupoController.excluirGrupo)

export default router;