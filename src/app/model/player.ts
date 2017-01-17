export class Player {

  id?: number;

  roleId?: number;

  firstName?: string;

  lastName?: string;

  userName?: string;

  password?: string;

  email?: string;

  picturePath?: string;

  attendance?: Player.AttendanceEnum;
}

export namespace Player {

  export enum AttendanceEnum {
    Sunday = <any> true,
    Saturday = <any> 'Saturday',
    Friday = <any> 'Friday',
    Thursday = <any> 'Thursday',
    Wednesday = <any> 'Wednesday',
    Tuesday = <any> 'Tuesday',
    Monday = <any> 'Monday',
  }
}
