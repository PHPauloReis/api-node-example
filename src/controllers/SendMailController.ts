import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveryUsersRepository } from "../repositories/SurveysUsersRepository";
import { SurveryRepository } from "../repositories/SurveysRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
import { env } from "process";

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const surveryUsersRepository = getCustomRepository(SurveryUsersRepository);
        const userRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveryRepository)

        let userAlreadyExists: any;

        try {
            userAlreadyExists = await userRepository.findOneOrFail({ email });
        } catch {
            return response.status(400).json({
                error: "User does not exists"
            });
        }

        let surveyAlreadyExists: any;

        try {
            surveyAlreadyExists = await surveysRepository.findOneOrFail({ id: survey_id });
        } catch {
            return response.status(400).json({
                error: "Survey does not exists"
            });
        }

        const surveyUser = surveryUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveryUsersRepository.save(surveyUser);
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            user_id: userAlreadyExists.id,
            link: process.env.URL_MAIL
        }
        await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);

        return response.status(200).json({
            message: "Sended mail!!!"
        });

    }

}

export { SendMailController }