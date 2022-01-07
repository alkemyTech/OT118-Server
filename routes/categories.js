const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoryValidator = require('../middlewares/categoryValidator');

/**
 * @swagger
 * schemes:
 *  - "https"
 *  - "http"
 * components:
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
 */


//Create category
/**
 * @swagger
 *  /categories:
 *      schemes:
 *          - "https"
 *          - "http"
 *      post:
 *          summary: Create a new category
 *          tags: [Categories]
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
 */

//Get all categories
/**
 * @swagger
 *  /categories:
 *      get:
 *          summary: Return all categories
 *          tags: [Categories]
 *          responses:
 *              200:
 *                  description: All categories
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Categories'
 */

//Get a category
/**
 * @swagger
 *  /categories/{id}:
 *      get:
 *          summary: Return a category
 *          tags: [Categories]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: number
 *              required: true
 *              description: The category Id
 *          responses: 
 *              200:
 *                  description: Return a category succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              items:
 *                                  $ref: '#/components/schemas/Categories'
 *              404:
 *                  description: Category not Found
 */

//Update a category
/**
 * @swagger
 *  /categories/{id}:
 *      put:
 *          summary: Update a category
 *          tags: [Categories]
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
 *                  type: number
 *              required: true
 *              description: The category Id
 *          responses: 
 *              200:
 *                  description: Category updated succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              items:
 *                                  $ref: '#/components/schemas/Categories'
 *              404:
 *                  description: Category not Found
 */

//Delete a category
/**
 * @swagger
 *  /categories/{id}:
 *      delete:
 *          summary: Delete a category
 *          tags: [Categories]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: number
 *              required: true
 *              description: The category Id
 *          responses: 
 *              200:
 *                  description: Category deleted succesfully
 *              404:
 *                  description: Category not Found
 */

router.post('/', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.create);
router.get('/', categoriesController.getAll);
router.put('/:id', authMiddleware.isAdmin, categoryValidator.nameOk, categoriesController.update);
router.get('/:id', authMiddleware.isAdmin, categoriesController.getById);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);

module.exports = router;
