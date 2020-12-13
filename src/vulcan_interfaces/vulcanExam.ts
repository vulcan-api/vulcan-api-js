export interface vulcanExam {
    "Id": number,
    "IdPrzedmiot": number,
    "IdPracownik": number,
    "IdOddzial": number,
    "IdPodzial": number | null,
    "PodzialNazwa": string | null,
    "PodzialSkrot": string | null,
    "RodzajNumer": 1 | 2 | 3,
    "Opis": string,
    "Data": number,
    "DataTekst": string

}