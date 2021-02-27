import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

    protected usersRepository: UsersRepository;

    async all(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.find();
        return response.json(users);
    }

    async view(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id)

        return response.json(user);
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

        const usersRepostitory = getCustomRepository(UsersRepository);

        const user = await usersRepostitory.findOne(id);
        user.name = name;
        user.email = email;
        
        usersRepostitory.update({ id }, user);

        response.json(user);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        usersRepository.delete({ id });

        response.status(204).json({});
    }

}

export { UserController }