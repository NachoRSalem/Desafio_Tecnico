const express = require("express");
const app = express();
const path = require("path"); 
const session = require("express-session");
const cookies = require("cookie-parser");
const cors = require("cors");


const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(
    session({
        secret: "Desafio--Tecnico",
        resave: false,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: false,  
          sameSite: 'lax',
        }
    })
);

app.use(cookies());
app.use(userLoggedMiddleware);


app.use(cors({
  origin: 'http://localhost:3000', // Origen del frontend
  credentials: true // Permitir el envío de cookies
}));
  

//archivos estáticos desde la carpeta public 
app.use(express.static(path.join(__dirname, 'public')));


const mainRouter = require("./routes/mainRouter");
app.use(mainRouter);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
