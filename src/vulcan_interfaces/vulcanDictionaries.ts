import { vulcanGradeCategory } from './vulcanGradeCategory';
import { vulcanLessonTime } from './vulcanLessonTime';
import { vulcanSubject } from './vulcanSubject';
import { vulcanEmployee } from './vulcanEmployee';
import { vulcanTeacher } from './vulcanTeacher';
import { vulcanNoteCategory } from './vulcanNoteCategory';
import { vulcanAttendanceCategory } from './vulcanAttendanceCategory';
import { vulcanAttendanceType } from './vulcanAttendanceType';

export interface vulcanDictionaries {
    "Nauczyciele": Array<vulcanTeacher>,
    "Pracownicy": Array<vulcanEmployee>,
    "Przedmioty": Array<vulcanSubject>,
    "PoryLekcji": Array<vulcanLessonTime>,
    "KategorieOcen": Array<vulcanGradeCategory>,
    "KategorieUwag": Array<vulcanNoteCategory>,
    "KategorieFrekwencji": Array<vulcanAttendanceCategory>,
    "TypyFrekwencji": Array<vulcanAttendanceType>
}