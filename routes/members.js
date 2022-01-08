const express = require("express");

const router = express.Router();
const membersController = require("../controllers/members");
const authMiddleware = require("../middlewares/auth");
const memberMiddleware = require("../middlewares/members");
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
 *     Member:
 *      type: object
 *      required:
 *      - name
 *      - content
 *      - image
 *      - categoryId
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the member  
 *        facebookUrl:
 *          type: string
 *          description: Faceook of the member
 *        instagramUrl:
 *          type: string
 *          description: Instagram of the member
 *        linkedinUrl:
 *          type: string
 *          description: Linkedin of the member
 *        image:
 *          type: string
 *          description: Image of the member
 *        description:
 *          type: string
 *          description: description of the member
 *      example:
 *        name: Daniel
 *        facebookUrl: facebook.com  
 *        instagramUrl: instagram.com
 *        linkedinUrl: likedin.com
 *        image: image.png
 *        description: Some description      
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
 * /members:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Return a list of members
 *    parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: number of the pagination
 *    tags:
 *      - members
 *    responses:
 *      200:
 *       description: The list of members
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
 *                   $ref: '#/components/schemas/Member'
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
router.get("/", authMiddleware.isAdmin, paginationMiddleware.validator, membersController.getAll);

/**
 * @swagger
 * /members:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Create a member
 *    tags:
 *      - members
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Member' 
 *    responses:
 *      201:
 *       description: Member created successfully
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               msg:
 *                type: string
 *               data:
 *                 $ref: '#/components/schemas/Member' 
 *             
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
 */
router.post( "/",  authMiddleware.isAuth, memberMiddleware.validator, membersController.create);

/**
 * @swagger
 * /members/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a member by the id
 *    tags: 
 *      - members
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The member id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Member'
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
 *                  $ref: '#/components/schemas/Member'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/badRequest'
 *      401:
 *        description: Authorization information is missing or invalid
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tokenError'
 *      404:
 *        description: Member not found
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 * 
 */
router.put("/:id", authMiddleware.isAuth, membersController.update);

/**
 * @swagger
 * /members/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a member
 *    tags:
 *      - members
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The member id          
 *    responses:
 *      200:
 *       description: member deleted
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
 *        description: Member not found
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/badRequest'
 */
router.delete("/:id", authMiddleware.isAdmin, membersController.remove);

module.exports = router;
