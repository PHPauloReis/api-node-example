import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveryUsersRepository extends Repository<SurveyUser> {

}

export { SurveryUsersRepository }