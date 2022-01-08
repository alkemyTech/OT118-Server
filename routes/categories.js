const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoryValidator = require('../middlewares/categoryValidator');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      Categories:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the category name
 *              description:
 *                  type: string
 *                  description: the category description
 *              image:
 *                  type: string
 *                  description: the category image
 *          required:
 *              - name
 *          example:
 *              name: New Category
 *              description: Description to Category
 *          tokenError:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                  stackTrace:
 *                      type: array
 *                      items:
 *                          type: string
 *          validationsErrors:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                  params:
 *                      type: string
 *                  location:
 *                      type: string
 *          badRequest:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: object
 *                  errors:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/chemas/validationsErrors'
 *                      stackTrace:
 *                          type: array
 *                          items:
 *                              type: string
 *          newsValidations:
 *              type: object
 */


//Create category
/**
 * @swagger
 *  /categories:
 *      post:
 *          summary: Create a new category
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Categories'
 *          responses:
 *              201:
 *                  description: Category created succesfully
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Categories'
 *              400:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/badRequest'
 *              401:
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              msg:
 *                                  type: string
 *                              data: 
 *                                  $ref: '#/components/schemas/tokenError'
 *                      
 */

//Get all categories
/**
 * @swagger
 *  /categories:
 *      get:
 *          summary: Return a list of categories
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: query
 *              name: page
 *              schema:
 *                  type: integer
 *              description: Number of the pagination
 *          responses:
 *              200:
 *                  description: The list of categories
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  prev:
 *                                      type: string
 *                                  next:
 *                                      trpe: string
 *                                  pages:
 *                                      type: integer
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Categories'
 *              401:
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/tokenError'
 *              400:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/badRequest'
 */             

//Get a category
/**
 * @swagger
 *  /categories/{id}:
 *      get:
 *          summary: Return a category
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The category Id
 *          responses: 
 *              200:
 *                  description: The list of category
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                              data:
 *                                  $ref: '#/components/schemas/Categories'
 *              401:
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/tokenError'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/badRequest'
 */

//Update a category
/**
 * @swagger
 *  /categories/{id}:
 *      put:
 *          summary: Update a category by the id
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Categories'
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The category id
 *          responses: 
 *              200:
 *                  description: The category was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  msg:
 *                                      type:string
 *                              data:
 *                                  $ref: '#/components/schemas/Categories'
 *              404:
 *                  description: The category was not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/badRequest'
 *              401:
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/tokenError'
 */

//Delete a category
/**
 * @swagger
 *  /categories/{id}:
 *      delete:
 *          summary: Delete a category
 *          tags: [Categories]
 *          security:
 *           - bearerAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The category Id
 *          responses: 
 *              200:
 *                  description: Category deleted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  msg:
 *                                      type: string
 *              400:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/badRequest'
 *              401:
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/tokenError'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/badRequest'
 */

router.post('/', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.create);
router.get('/', categoriesController.getAll);
router.put('/:id', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.update);
router.get('/:id', authMiddleware.isAdmin, categoriesController.getById);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
