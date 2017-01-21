import {Injectable} from '@angular/core';
import {Player} from "../../model/player";

@Injectable()
export class AttendanceService {


  constructor() {
    console.log(Player.AttendanceEnum);
  }

  public AttendanceToNumber(sunday: boolean,
                            monday: boolean,
                            tuesday: boolean,
                            wednesday: boolean,
                            thursday: boolean,
                            friday: boolean,
                            saturday: boolean): number {
    var result = 0;
    if (sunday) {
      result += 1;
    }
    if (monday) {
      result += 64;
    }
    if (tuesday) {
      result += 32;
    }
    if (wednesday) {
      result += 16;
    }
    if (thursday) {
      result += 8;
    }
    if (friday) {
      result += 4;
    }
    if (saturday) {
      result += 2;
    }

    return result;
  }

  public NumberToAttendance(attendance: number) {

    var result = {
      attendanceMonday: false,
      attendanceTuesday: false,
      attendanceWednesday: false,
      attendanceThursday: false,
      attendanceFriday: false,
      attendanceSaturday: false,
      attendanceSunday: false
    };

    var temp_attendance = attendance;

    if ((temp_attendance - 64) >= 0) {
      result.attendanceMonday = true;
      temp_attendance -= 64;
    }
    if ((temp_attendance - 32) >= 0) {
      result.attendanceTuesday = true;
      temp_attendance -= 32;
    }
    if ((temp_attendance - 16) >= 0) {
      result.attendanceWednesday = true;
      temp_attendance -= 16;
    }
    if ((temp_attendance - 8) >= 0) {
      result.attendanceThursday = true;
      temp_attendance -= 8;
    }
    if ((temp_attendance - 4) >= 0) {
      result.attendanceFriday = true;
      temp_attendance -= 4;
    }
    if ((temp_attendance - 2) >= 0) {
      result.attendanceSaturday = true;
      temp_attendance -= 2;
    }
    if ((temp_attendance - 1) >= 0) {
      result.attendanceSunday = true;

    }
    console.log(attendance);
    console.log(result);
    return result;
  }


}
