const { Router } = require("express");
const router = Router();
const userControllerAPI = require("../../controllers/api/userControllerAPI");

router.get('/', userControllerAPI.list);


module.exports = router;