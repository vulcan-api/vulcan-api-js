import { HebePeriod } from "./period";
import { HebePupil } from "./pupil";
import { HebeSchool } from "./school";
import { HebeUnit } from "./unit";

export interface HebeStudent {
    TopLevelPartition: string,
    Partition: string,
    Pupil: HebePupil,
    Unit: HebeUnit,
    ConstituentUnit: HebeSchool,
    Periods: HebePeriod[]
}