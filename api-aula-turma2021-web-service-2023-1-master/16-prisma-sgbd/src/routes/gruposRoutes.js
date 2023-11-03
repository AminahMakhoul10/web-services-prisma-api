import express from "express";
import GruposController from "../controllers/GruposController.js"

const router = express.Router();


router
.get("grupos", GruposController.listarGrupos)
.get("grupos/:id", GruposController, listarGruposPorId)
.post("grupos", GruposController.cadastrarGrupo)
.put("grupos/:id", GruposController.PUTAtualizarUsuario)
.patch("/grupos/:id", GruposController.PATCHAtualizarUsuario)
.delete("/grupos/:id", GruposController.excluirUsuario)


export default router;