import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

    async all(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.find();
        return response.json(users);
    }

    async view(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        try {
            const user = await usersRepository.findOneOrFail(id);
            return response.status(200).json(user);
        } catch(e) {
            return response.status(404).send({
                error: "User not found!"
            });
        }
    }

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            });
        }
        
        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        try {
            const user = await usersRepository.findOneOrFail(id);
            user.name = name;
            user.email = email;
            
            usersRepository.update({ id }, user);

            return response.json(user);
        } catch {
            return response.status(404).send({
                error: "User not found!"
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        try {
            const user = await usersRepository.findOneOrFail(id);
            usersRepository.delete({ id });

            return response.status(201).json({
                success: "User deleted successfully!"
            });
        } catch {
            return response.status(404).json({
                error: "User not found!"
            });
        }
    }

}

export { UserController }
