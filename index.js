import express from "express";
const app = express();
const port = 3000;



app.use(express.json());

app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

app.listen(3000, ()=>{
    console.log("Example app listening in port 3000")
})