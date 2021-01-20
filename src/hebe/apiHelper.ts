import { DATA_BY_PERIOD, DATA_BY_PERSON, DATA_BY_PUPIL, DATA_ROOT } from "./endpoints";

export enum FilterType {
    BY_PUPIL = 0,
    BY_PERSON = 1,
    BY_PERIOD = 2
}

export const getEndpoint = (type: FilterType) => {
    switch (type) {
        case FilterType.BY_PUPIL:
            return DATA_BY_PUPIL;
        case FilterType.BY_PERSON:
            return DATA_BY_PERSON;
        case FilterType.BY_PERIOD:
            return DATA_BY_PERIOD;
        default:
            return null;
    }
}

export class ApiHelper {
    private api: any; // TODO: replace any with api

    constructor(api: any) {
        this.api = api;
    }

    public getList = (endpoint: string,
        deleted: boolean,
        dateFrom: Date,
        dateTo: Date,
        lastSync: number,
        params: Object,
        filterType?: FilterType
    ) => {
        let url = "";
        if (!this.api) {
            throw Error("You must select a student!");
        }
        if (deleted) {
            throw Error("Getting deleted data IDs is not implemented yet.");
        }
        if (filterType) {
            url = `${DATA_ROOT}/${endpoint}/${getEndpoint(filterType)}`;
        } else {
            url = `${DATA_ROOT}/${endpoint}`;
        }
    }
}