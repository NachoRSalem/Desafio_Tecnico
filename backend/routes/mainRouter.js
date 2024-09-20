const { Router } = require("express");
const router = Router();

const usersRouter = require("./userRouter")
router.use(usersRouter);
router.use("/usuarios", usersRouter);


const apiRouter = require("./api/mainRouterAPI")
router.use("/api", apiRouter);

module.exports = router;
