export const getStudents = async (api) => {
    const jsonData = await api.post(api.baseUrl + "UczenStart/ListaUczniow");
    console.log(jsonData)
    let studentsArrayToReturn = [];
    jsonData.Data.forEach(student => {
        studentsArrayToReturn.push(student);
    });
    return studentsArrayToReturn;
}