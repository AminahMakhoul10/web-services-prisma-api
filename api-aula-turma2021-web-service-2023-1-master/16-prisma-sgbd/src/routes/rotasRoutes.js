import express from "express";
import RotasController from "../controllers/RotasController.js";

const router = express.Router();

/**
 * @swagger
 * /rotas:
 *   get:
 *     tags:
 *       - Rotas
 *     summary: Lista todas as rotas
 *     responses:
 *       200:
 *         description: Retorna a lista de rotas
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/rotas", RotasController.listarRotas);

/**
 * @swagger
 * /rotas/{id}:
 *   get:
 *     tags:
 *       - Rotas
 *     summary: Rota encontrada por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da rota para filtrar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna a rota encontrada por ID
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/rotas/:id", RotasController.listarRotaPorId);

/**
 * @swagger
 * /rotas:
 *   post:
 *     tags:
 *       - Rotas
 *     summary: Cadastra uma nova rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rota'
 *     responses:
 *       201:
 *         description: Rota cadastrada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/rotas", RotasController.cadastrarRota);

/**
 * @swagger
 * /rotas/{id}:
 *   put:
 *     tags:
 *       - Rotas
 *     summary: Atualiza uma rota
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da rota a ser atualizada
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rota'
 *     responses:
 *       200:
 *         description: Rota atualizada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/rotas/:id", RotasController.PUTAtualizarRota);

/**
 * @swagger
 * /rotas/{id}:
 *   patch:
 *     tags:
 *       - Rotas
 *     summary: Atualiza uma rota
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da rota a ser atualizada
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rota'
 *     responses:
 *       200:
 *         description: Rota atualizada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.patch("/rotas/:id", RotasController.PATCHAtualizarRota);

/**
 * @swagger
 * /rotas/{id}:
 *   delete:
 *     tags:
 *       - Rotas
 *     summary: Exclui uma rota
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da rota a ser excluída
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rota excluída com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/rotas/:id", RotasController.excluirRota);

export default router;
