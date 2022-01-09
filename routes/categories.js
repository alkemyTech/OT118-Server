const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoryValidator = require('../middlewares/categoryValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *        - name
 *       properties:
 *         name:
 *           type: string
 *           description: the category name
 *         description:
 *           type: string
 *           description: the category description
 *         image:
 *           type: string
 *           description: the category image
 *       example:
 *         name: New Category
 *         description: Category description
 *         image: categoryImage.png
 *    
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
 */


/**
 * @swagger
 * /categories:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Create a category
 *    tags:
 *      - categories
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:   
 *            $ref: '#/components/schemas/Categories' 
 *    responses:
 *      201:
 *        description: Category created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties: 
 *                msg: 
 *                  type: string
 *                data:               
 *                  $ref: '#/components/schemas/Categories'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badRequest'
 *      401:
 *        description: Authorization information is missing or invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tokenError'
 */
router.post('/', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.create);

/**
 * @swagger
 * /categories:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Return a list of categories
 *    parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: number of the pagination
 *    tags:
 *      - categories
 *    responses:
 *      200:
 *       description: The list of categories
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
 *                   $ref: '#/components/schemas/Categories'
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
 * 
 *       
 */
router.get('/', categoriesController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a category by the id
 *    tags: 
 *      - categories
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Categories'
 *    responses:
 *      200:
 *        description: The category was updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                msg:
 *                 type: string   
 *                data:
 *                  $ref: '#/components/schemas/Categories'    
 *      401:
 *        description: Authorization information is missing or invalid
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 *      404:
 *        description: The category was not found
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 * 
 */
router.put('/:id', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.update);

/**
 * @swagger
 * /categories/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Return a category
 *    tags:
 *      - categories
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id          
 *    responses:
 *      200:
 *        description: The category
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Categories'           
 *      401:
 *        description: Authorization information is missing or invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tokenError'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badRequest'
 */
router.get('/:id', authMiddleware.isAdmin, categoriesController.getById);

/**
 * @swagger
 * /categories/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a category
 *    tags:
 *      - categories
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id          
 *    responses:
 *      200:
 *        description: category deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string  
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badRequest'
 *      401:
 *        description: Authorization information is missing or invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tokenError'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badRequest'
 *      
 */
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
