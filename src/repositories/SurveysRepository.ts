import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveryRepository extends Repository<Survey> {

}

export { SurveryRepository }