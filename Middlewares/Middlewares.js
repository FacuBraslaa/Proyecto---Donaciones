import pool from '../dbconfig.js';

export const validarDonanteLogueado = async (req, res, next) => {
    next();
    //if (req.session.donanteId) next();
    //return res.status(403).json({ message: "Donante no autenticado" });
};


export const validarOngoscLogueado = async (req, res, next) => {
     next();
    //if (req.session.ongId) next();
    //return res.status(403).json({ message: "Ong no autenticado" });
};
