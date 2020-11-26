import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.json';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    //Coger el token del request
    const token = <string> req.headers["authorization"];

    try{
        console.log('headers:', req.headers);
        console.log('tooken:', token);
        jwt.verify(token, config.jwtSecret);
        //res.locals.propiedad =

    }catch(error) {
        //si no ha sido válido el token que llega, devolvemos 401
        res.sendStatus(401);
    }

    ///Sigo el flujo a mi controlador
    next();
}
