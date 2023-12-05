import express from "express";
import UsuarioGrupoController from "../controllers/UsuarioGrupoController.js";

const router = express.Router();

router
  .get("/usuariosGrupos", UsuarioGrupoController.listarUsuariosGrupos)
  .post("/usuariosGrupos", UsuarioGrupoController.associarUsuarioGrupo)
  .delete("/usuariosGrupos/:id", UsuarioGrupoController.desassociarUsuarioGrupo);

export default router;
