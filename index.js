const express = require ("express")
const app = express();
const port = 3000;

app.use(express.json());

app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

app.listen(3000, ()=>{
    console.log("Mano a Mano app listening in port 3000")
})

//conexion
const userrouter = require ("./routes/users")
app.use("/users", usersrouter)



app.get('/Donantes', donantes.getdonantes)