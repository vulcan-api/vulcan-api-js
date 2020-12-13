import { vulcanMessageRecipient } from './vulcanMessageRecipient';
export interface vulcanMessage {
    "WiadomoscId": number,
    "Nadawca": null | string,
    "NadawcaId": number,
    "Adresaci": null | Array<vulcanMessageRecipient>,
    "Tytul": string,
    "Tresc": string,
    "DataWyslania": string,
    "DataWyslaniaUnixEpoch": number,
    "GodzinaWyslania": string,
    "DataPrzeczytania": null | string,
    "DataPrzeczytaniaUnixEpoch": null | number,
    "GodzinaPrzeczytania": null | string,
    "StatusWiadomosci": string,
    "FolderWiadomosci": string,
    "Nieprzeczytane": string,
    "Przeczytane": string

}