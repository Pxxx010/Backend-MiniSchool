const express = require('express');
const {
  getEscola,
  getEscolaById,
  createEscola,
  updateEscola,
  deleteEscola,
  getEscolaByUserId
} = require('../controllers/escolaController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: cadastro
 *   description: Gerenciamento de cadastro
 */

/**
 * @swagger
 * /api/escola:
 *   get:
 *     summary: Lista todas as plantações
 *     tags: [Escola]
 *     responses:
 *       200:
 *         description: Lista de plantações
 */
router.get('/', authMiddleware, getEscola);

/**
 * @swagger
 * /api/escola/{id}:
 *   get:
 *     summary: Obtém um cadastro pelo ID
 *     tags: [Escola]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: Detalhes da plantação
 *       404:
 *         description: Plantação não encontrada
 */
router.get('/:id', authMiddleware, getEscolaById);

/**
 * @swagger
 * /api/escola:
 *   post:
 *     summary: Cria um novo cadastro
 *     tags: [Escola]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string ('aluno', 'professor', 'coordenador')
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Castrado efetuado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authMiddleware, createEscola);

/**
 * @swagger
 * /api/escola/{id}:
 *   put:
 *     summary: Atualiza um cadastro existente
 *     tags: [Escola]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string ('aluno', 'professor', 'coordenador')
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Castrado efetuado com sucesso
 *       404:
 *         description: Plantação não encontrada
 */
router.put('/:id', authMiddleware, updateEscola);

/**
 * @swagger
 * /api/escola/{id}:
 *   delete:
 *     summary: Deleta um cadastro existente
 *     tags: [Escola]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuario da escola
 *     responses:
 *       200:
 *         description: Plantação deletada com sucesso
 *       404:
 *         description: Plantação não encontrada
 */
router.delete('/:id', authMiddleware, deleteEscola);

/**
 * @swagger
 * /api/escola/user/{userId}:
 *   get:
 *     summary: Retorna todas os cadastro de um usuário específico
 *     tags: [Escola]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuario da escola
 *     responses:
 *       200:
 *         description: Lista de plantações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantacao'
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:userId', authMiddleware, getEscolaByUserId);

module.exports = router;

console.log("escolaRoutes OK");
