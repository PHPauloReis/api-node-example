import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveryRepository } from '../repositories/SurveysRepository';

class SurveyController {

    async all(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveryRepository);
        const surveys = await surveysRepository.find();
        return response.status(200).json(surveys);
    }

    async view(request: Request, response: Response) {
        const { id } = request.params;
        const surveysRepository = getCustomRepository(SurveryRepository);
        
        try {
            const user = await surveysRepository.findOneOrFail(id);
            return response.status(200).json(user);
        } catch {
            return response.status(404).json({
                error: "Survey not found!"
            });
        }

    }

    async create(request: Request, response: Response) {
        const { title, description } = request.body;
        const surveryRepository = getCustomRepository(SurveryRepository);        
        
        const survey = surveryRepository.create({
            title, description
        });

        await surveryRepository.save(survey);

        return response.status(201).json(survey);
    }

    async update(request: Request, response: Response)
    {
        const { id } = request.params;
        const { title, description } = request.body;
        const surveysRepository = getCustomRepository(SurveryRepository);

        try {
            const survey = await surveysRepository.findOneOrFail(id);
            survey.title = title;
            survey.description = description;

            await surveysRepository.update({ id }, survey);

            return response.status(200).json(survey);
        } catch {
            return response.status(404).json({
                error: "Survey not found!"
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const surveysRepository = getCustomRepository(SurveryRepository);

        try {
            const survey = await surveysRepository.findOneOrFail(id);
            surveysRepository.delete({ id });

            return response.status(201).json({
                success: "Survey deleted successfully!"
            });
        } catch {
            return response.status(404).json({
                error: "User not found!"
            });
        }
    }

}

export { SurveyController }