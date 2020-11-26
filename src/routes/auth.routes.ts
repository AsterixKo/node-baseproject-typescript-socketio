import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

class AuthRoutes {

    public router: Router = Router();

    constructor(){
        
        this.router.post('/login', authController.index);
        // this.router.get('/:id', usersController.showById);
        // this.router.post('/', usersController.create);
        // this.router.delete('/:id', usersController.delete);
        // this.router.put('/:id', usersController.update);

        // this.router.get('/providers', usersController.providers);
    }
}

export const authRoutes = new AuthRoutes();
