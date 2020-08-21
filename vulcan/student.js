export const getStudents = async (api) => {
    const jsonData = await api.post(api.baseUrl + "UczenStart/ListaUczniow");
    let studentsArrayToReturn = [];
    jsonData.Data.forEach(student => {
        studentsArrayToReturn.push(student);
    });
    return studentsArrayToReturn;
}