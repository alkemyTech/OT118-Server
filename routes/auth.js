const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

const usersMiddleware = require('../middlewares/users');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   
 *   schemas:
 *      User:
 *        type: object
 *        properties:
 *          firstname:
 *            type: string
 *            description: Name
 *          lastname:
 *            type: string
 *            description: Lastname
 *          email:
 *            type: string
 *            format: email
 *            description: registration email 
 *          image:
 *            type: string
 *            description: Your profile image
 *          password:
 *            type: string
 *            writeOnly: true
 *            description: Your password
 *          roleId:
 *            type: integer
 *            description: Your role (2 for admin)
 *        required:
 *          - email
 *          - password
 *        example:
 *          firstName: Carlos
 *          lastName: Rodriguez
 *          email: carlos@alkemy.com
 *          image: profile image
 *          password: Carlos123!
 *          roleId: 2
 *      
 *      loginUser:
 *       type: object
 *       properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *            writeOnly: true
 *      
 *      tokenError:
 *       type: object    
 *       properties:
 *         msg:
 *          type: string   
 *         stacKTrace:
 *             type: array
 *             items: 
 *               type: string
 *          
 *      validationsErrors:
 *       type: object
 *       properties:
 *          msg:
 *           type: string
 *          param:
 *            type: string
 *          location: 
 *            type: string
 * 
 *      badRequest:
 *       type: object    
 *       properties:
 *         msg:
 *          type: string
 *         errors:
 *          type: array
 *          items: 
 *            $ref: '#/components/schemas/validationsErrors'   
 *         stacKTrace:
 *             type: array
 *             items: 
 *               type: string
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Create a user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#components/schemas/User'
 *    responses:
 *      201:
 *        description: User created succesfully
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *      
 *      400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */
router.post('/register', usersMiddleware.registerValidation, usersController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#components/schemas/loginUser'
 * 
 *    responses:
 *      200:
 *        description: Access token 
 *        content:
 *          application/json:
 *                 
 *      
 *      400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */
router.post('/login', usersMiddleware.loginValidation, usersController.login);

/**
 * @swagger
 * /auth/me:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Return profile user logedd in
 *    tags: [User]
 *    content:
 *      application/json:
 *         schema:
 *            $ref: '#components/schemas/User'
 * 
 *    responses:
 *      200:
 *        description: Profile user
 *        content:
 *          application/json
 *      
 *      401:
 *        description: Unauthorized, expired or invalid token
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/tokenError'
 * 
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/badRequest'
 */
router.get('/me', authMiddleware.isAuth, usersController.getProfile);

module.exports = router;
