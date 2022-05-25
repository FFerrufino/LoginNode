const express = require("express");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("connect-mongo");

const app = express();
app.use("/main", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const MongoStore = connectMongo.create({
  mongoUrl:
    "mongodb+srv://ferru:ferru2647@cluster0.lpvnv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  ttl: 600,
});

app.use(cookieParser());
app.use(
  session({
    store: MongoStore,
    secret: ".",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Servidor express ok!");
});

app.post("/con-session", (req, res) => {
  req.session.usuario = req.body;
  res.send(`Bienvenido ${req.body.Nombre} ${req.body.Apellido}
  <a href="http://localhost:8080/logout"><button id="logout">Logout</button></a>`);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.redirect("http://localhost:8080/main");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
