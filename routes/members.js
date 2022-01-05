const express = require("express");

const router = express.Router();
const membersController = require("../controllers/members");
const authMiddleware = require("../middlewares/auth");
const memberMiddleware = require("../middlewares/members");

router.get("/", authMiddleware.isAdmin, membersController.getAll);
router.post( "/",  authMiddleware.isAuth, memberMiddleware.validator, membersController.create);
router.put("/:id", authMiddleware.isAuth, membersController.update);
router.delete("/:id", authMiddleware.isAdmin, membersController.remove);

module.exports = router;
