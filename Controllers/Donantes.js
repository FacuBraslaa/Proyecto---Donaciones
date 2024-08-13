import express from "express";
import {client} from "./dbconfig.js";

const app = express();
app.use(express.json());

app.get("/chau", async (req,res)=>{
    res.send('Chau')
})