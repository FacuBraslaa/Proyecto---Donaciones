import mysql from "mysq12/promise";

export const conn = await mysql.createConection({
    host:"localhost",
    user: "root",
    password: "rootroot",
    datbase: "base de datos de aplicacion de donaciones",
})

