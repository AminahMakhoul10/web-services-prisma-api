import express from "express";
import GruposController from "../controllers/GruposController.js";

const router = express.Router();

router
  .get("/grupos", GruposController.listarGrupos)
  .get("/grupos/:id", GruposController.listarGruposPorId) 
  .post("/grupos", GruposController.cadastrarGrupo)
  .put("/grupos/:id", GruposController.PUTAtualizarGrupo)
  .patch("/grupos/:id", GruposController.PATCHAtualizarGrupo) 
  .delete("/grupos/:id", GruposController.excluirGrupo); 

export default router;
