export const isAValidCertObj = (cert) => {
    if (cert === undefined) return false;
    return ((typeof(cert["AdresBazowyRestApi"]) === "string") && (typeof(cert["CertyfikatKlucz"]) === "string")
    && (typeof(cert["CertyfikatKluczSformatowanyTekst"]) === "string") && (typeof(cert["CertyfikatPfx"]) === "string"))
    ? true : false;
}
export const isAValidDate = (date) => {
    return (date instanceof Date) ? true : false;
}
export const isAValidStudentObj = (student) => { // TODO implement type checking for student
    if (student === undefined || typeof(student) !== "object"){
        return false;
    }
    let studentTemplateKeys = [
        "IdOkresKlasyfikacyjny",
        "OkresPoziom",
        "OkresNumer",
        "OkresDataOd",
        "OkresDataDo",
        "OkresDataOdTekst",
        "OkresDataDoTekst",
        "IdJednostkaSprawozdawcza",
        "JednostkaSprawozdawczaSkrot",
        "JednostkaSprawozdawczaNazwa",
        "JednostkaSprawozdawczaSymbol",
        "IdJednostka",
        "JednostkaNazwa",
        "JednostkaSkrot",
        "OddzialSymbol",
        "OddzialKod",
        "UzytkownikRola",
        "UzytkownikLogin",
        "UzytkownikLoginId",
        "UzytkownikNazwa",
        "Przedszkolak",
        "Wychowanek",
        "Id",
        "IdOddzial",
        "Imie",
        "Imie2",
        "Nazwisko",
        "Pseudonim",
        "UczenPlec",
        "Pozycja",
        "LoginId",
    ]
    let isValid = true;
    studentTemplateKeys.map(item => {
        if (student[item] === undefined){
            isValid = false;
        }
    });
    return isValid;
}