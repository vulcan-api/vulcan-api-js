import { bind, Serializable } from "../serialize";

export class PresenceType extends Serializable {

  @bind('Id') id: number = 0;
  @bind('Name') name: string = '';
  @bind('Symbol') symbol: string = '';
  @bind('CategoryId') category_id: number = 0;
  @bind('CategoryName') category_name: string = '';
  @bind('Position') position: number = 0;
  @bind('Presence') presence: boolean = false;
  @bind('Absence') absence: boolean = false;
  @bind('LegalAbsence') exemption: boolean = false;
  @bind('Late') late: boolean = false;
  @bind('AbsenceJustified') justified: boolean = false;
  @bind('Removed') deleted: boolean = false;
}