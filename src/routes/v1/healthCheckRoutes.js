import express from "express";
import healthController from "../../controllers/healthController.js";

const router = express.Router();

/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Get user information
 *     description: Fetch profile information - email, name, and GitHub link.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "example@email.com"
 *                 current_datetime:
 *                   type: string
 *                   example: "2024-01-29T12:34:56Z"
 *                 github_url:
 *                   type: string
 *                   example: "https://github.com/yourusername"
 *       500:
 *
 *         $ref: "#/components/responses/ServerError"
 */

router.get("/", (req, res) => healthController.gethealthInfo(req, res));

export default router;
