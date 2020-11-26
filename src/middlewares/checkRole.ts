import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.json';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

export const checkRole = (roles: Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        //Coger el token del request
        const token = <string>req.headers["authorization"];

        try {
            // console.log('headers:', req.headers);
            // console.log('tooken:', token);
            const payload = <any>jwt.decode(token);
            console.log('payload:', payload);
            // jwt.decode(token, config.jwtSecret);

            //check if user is admin
            // const role = await Role.findOne({where:{name: 'ADMIN'}});
            const rolesFound = await Role.findAll({ where: { name: roles } });
            if (rolesFound.length > 0) {
                let userFound: boolean = false;
                for (const itemRole of rolesFound) {
                    const user = await User.findOne({ where: { email: payload.email, password: payload.password, roleId: itemRole.id } });
                    if (user) {
                        console.log('Correcto usuario encontrado con role:', itemRole.name);
                        userFound = true;
                        next();
                        break;
                    }
                }
                if(!userFound){
                    console.log('No hay usuario con ese rol email o password');
                    res.sendStatus(401);
                }
            } else {
                console.log('No existe ese rol');
                res.sendStatus(401);
            }

            // const role = await Role.findOne({where:{name: 'ADMIN'}});
            // if(role){
            //     const user = await User.findOne({where:{email:payload.email, password:payload.password, roleId:role.id}});
            //     if(user){
            //         console.log('Correcto usuario es ADMIN');
            //         next();
            //     }else{
            //         console.log('No hay usuario con ese rol email o password');
            //         res.sendStatus(401);
            //     }
            // }else{
            //     console.log('No existe ese rol');
            //     res.sendStatus(401);
            // }


        } catch (error) {
            //si no ha sido válido el token que llega, devolvemos 401
            res.sendStatus(401);
        }

        ///Sigo el flujo a mi controlador
    };    // next();
};
