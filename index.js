import express from "express";
const app = express();
const port = 3000;

import Donantes from "./Donantes.js";
import ongosc from "./ongosc.js";
import Opciones from "./Opciones.js";
import Like from "./Like.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("Proyecto funcionando");
});

app.listen(3000, ()=>{
    console.log("Example app listening in port 3000")
})