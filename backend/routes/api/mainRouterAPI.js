const { Router } = require("express");
const router = Router();

const usersRouterAPI = require("./userRouterAPI")
router.use("/usuarios", usersRouterAPI);

module.exports = router;