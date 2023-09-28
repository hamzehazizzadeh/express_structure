const { Router } = require("express");

const {
  handleSignIn,
  handleSignUp,
} = require("../../controllers/authController/authController");

const router = new Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *    tags:
 *     - Auth
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:      # Request body contents
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               maxLength: 255
 *             password:
 *               type: string
 *           required:
 *            - userName
 *            - password
 */
router.post("/login", handleSignIn);

/**
 * @swagger
 * /auth/register:
 *   post:
 *    tags:
 *     - Auth
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:      # Request body contents
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             userName:
 *               type: string
 *               maxLength: 255
 *             nationalNumber:
 *               type: string
 *               minLength: 10
 *               maxLength: 10
 *             phoneNumber:
 *               type: string
 *               minLength: 11
 *               maxLength: 11
 *             role:
 *               type: string
 *               enum: [CITY, CENTER, EXPERT]
 *             password:
 *               type: string
 *             confirmPassword:
 *               type: string
 *           required:
 *            - firstName
 *            - lastName
 *            - userName
 *            - nationalNumber
 *            - phoneNumber
 *            - role
 *            - password
 *            - confirmPassword
 */
router.post("/register", handleSignUp);

module.exports = router;
