const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news');
const newsMiddleware = require('../middlewares/news');
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
 *     New:
 *      type: object
 *      required:
 *      - name
 *      - content
 *      - image
 *      - categoryId
 *      properties:
 *        name:
 *          type: string
 *          description: The new name
 *        content:
 *          type: string
 *          description: The content of the new
 *        image:
 *          type: string
 *          description: Image of the new
 *        categoryId:
 *          type: integer
 *          description: id of the organization
 *         
 *     tokenError:
 *       type: object    
 *       properties:
 *         msg:
 *          type: string   
 *         stacKTrace:
 *             type: array
 *             items: 
 *               type: string
 * 
 *     validationsErrors:
 *       type: object
 *       properties:
 *          msg:
 *           type: string
 *          param:
 *            type: string
 *          location: 
 *            type: string
 *        
 *     
 *     badRequest:
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
 *             
 * 
 *     newsValidations:
 *        type: object
 *        properiest:
 * 
 * security:
 *    - bearerAuth: []
 * 
 */


/**
 * @swagger
 * /news:
 *  get:
 *    summary: Return a list of news
 *    parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: number of the pagination
 *    tags:
 *      - news
 *    responses:
 *      200:
 *       description: The list of news
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               prev:
 *                 type: string
 *               next:
 *                 type: string
 *               pages:
 *                 type: integer
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/New'
 *      401:
 *       description: Authorization information is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 *      400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 * 
 *       
 */

router.get('/', authMiddleware.isAuth, newsController.getAll);


/**
 * @swagger
 * /news:
 *  post:
 *    summary: Create a novelty
 *    tags:
 *      - news
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/New' 
 *    responses:
 *      201:
 *       description: Novelty created successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/New'
 *      401:
 *       description: Authorization information is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               msg:
 *                type: string
 *               data:
 *                 $ref: '#/components/schemas/tokenError'
 *      
 *      400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */
router.post('/', authMiddleware.isAdmin, newsMiddleware.inputValidation, newsController.create);


/**
 * @swagger
 * /news/{id}:
 *  delete:
 *    summary: Delete a novelty
 *    tags:
 *      - news
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The novelty id          
 *    responses:
 *      200:
 *       description: novelty deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                type: string  
 *      400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 *      401:
 *       description: Authorization information is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 *      404:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 *      
 */
router.delete('/:id', authMiddleware.isAdmin, newsController.remove);


/**
 * @swagger
 * /news/{id}:
 *  get:
 *    summary: Return a novelty
 *    tags:
 *      - news
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The new id          
 *    responses:
 *      200:
 *       description: The list of news
 *       content:
 *        application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/New' 
 *                
 *      401:
 *       description: Authorization information is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 *      404:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */
router.get('/:id', authMiddleware.isAdmin, newsController.getById);

/**
 * @swagger
 * /news/{id}:
 *  put:
 *    summary: Update a new by the id
 *    tags: 
 *      - news
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The new id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/New'
 *    responses:
 *      200:
 *        description: The new was updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                msg:
 *                 type: string   
 *                data:
 *                  $ref: '#/components/schemas/New'
 *      
 *      404:
 *        description: The new or category was not found
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 *      401:
 *        description: Authorization information is missing or invalid
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 * 
 */
router.put('/:id', authMiddleware.isAdmin, newsMiddleware.inputValidation, newsController.update);

module.exports = router;
