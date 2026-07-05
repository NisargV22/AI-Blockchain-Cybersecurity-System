const express = require("express");
const userController = require("./user.controller");
const { auth } = require("../../middleware/auth");
const { authorize } = require("../../middleware/rbac");

const router = express.Router();

router.use(auth);
router.use(authorize("admin"));

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id/role", userController.updateRole);

module.exports = router;
