import { Period } from "./period";
import { Pupil } from "./pupil";
import { School } from "./school";
import { Unit } from "./unit";

export interface Student {
    symbol: string,
    symbol_code: string,
    pupil: Pupil,
    unit: Unit,
    school: School,
    periods: Period[]
}