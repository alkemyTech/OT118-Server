const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');
const testimonialsMiddleware = require('../middlewares/testimonials');
const paginationMiddleware = require('../middlewares/pagination')
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
 *     Testimonial:
 *      type: object
 *      required:
 *      - name
 *      - image
 *      - content      
 *      properties:
 *        name:
 *          type: string
 *          description: The testimonial name
 *        image:
 *          type: string
 *          description: The Image of the testimonial
 *        content:
 *          type: string
 *          description: Content of the testimonial 
 *      example:
 *        name: Mi tetimonio n
 *        image: http://img-n.jpg
 *        content: contenido del testimonio n     
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
 *     testimonialValidations:
 *        type: object
 *        properiest:
 * 
 * security:
 *    - bearerAuth: []
 * 
 */

/**
 * @swagger
* /testimonials/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []     
 *    summary: Return a Testimonial
 *    tags:
 *      - Testimonial
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Testimonial id          
 *    responses:
 *      200:
 *       description: return a testimonial by id
 *       content:
 *        application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Testimonial' 
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

router.get('/:id', authMiddleware.isAdmin, testimonialsController.getById);
/**
 * @swagger
 * /testimonials/{id}:
 *  put:
 *    security:
 *      - bearerAuth: [] 
 *    summary: Update a testimonial by the id
 *    tags: 
 *      - Testimonial
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The testimonial id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Testimonial'
 *    responses:
 *      200:
 *        description: The testimonial was updated succesfully
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                msg:
 *                 type: string   
 *                data:
 *                  $ref: '#/components/schemas/Testimonial'
 *      
 *      404:
 *        description: The testimonial was not found
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 *      401:
 *        description: Authorization information expired or is invalid
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
  *      400:
 *        description: Bad Request
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */     

router.put('/:id' , authMiddleware.isAdmin, testimonialsMiddleware.inputValidation ,  testimonialsController.update);

/**
 * @swagger
 * /testimonials/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: [] 
 *    summary: Delete a testimonial
 *    tags:
 *      - Testimonial
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The testimonial id          
 *    responses:
 *      200:
 *       description: testimonial deleted 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                type: string  
 *      401:
 *       description: Authorization information expired or  is invalid
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
 *      404:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */

router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);
/**
 * @swagger
 * /testimonials:
 *  post:
 *    security:
 *      - bearerAuth: [] 
 *    summary: Create a Testimonial
 *    tags:
 *      - Testimonial
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Testimonial' 
 *    responses:
 *      201:
 *       description: Testimonial created successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *      401:
 *       description: Authorization information expired or  is invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 *      
 *      400:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */

router.post('/',authMiddleware.isAdmin, testimonialsMiddleware.inputValidation, testimonialsController.create);

/**
 * @swagger
 * /testimonials:
 *  get:
 *    security:
 *      - bearerAuth: [] 
 *    summary: Return a list of Testimonials
 *    tags:
 *      - Testimonial
 *    responses:
 *      200:
 *       description: The list of testimonials
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Testimonial'
 *      401:
 *       description: Authorization information expired or  is invalid
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

router.get('/',authMiddleware.isAdmin, paginationMiddleware.validator, testimonialsController.getAll);

module.exports = router;
