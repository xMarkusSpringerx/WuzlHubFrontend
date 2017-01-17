import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {PlayerApi} from "../../../services/PlayerApi";
import {Player} from "../../../model/player";
import {RoleApi} from "../../../services/RoleApi";
import {Role} from "../../../model/role";
import {AttendanceService} from "../../_shared/attendance.service";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css'],
  providers: [AttendanceService]
})
export class PlayerAddComponent implements OnInit {

  fileToUpload: File;

  public addForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    username: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],


    attendanceMonday: [""],
    attendanceTuesday: [""],
    attendanceWednesday: [""],
    attendanceThursday: [""],
    attendanceFriday: [""],
    attendanceSaturday: [""],
    attendanceSunday: [""],

    file: [""],

    role:[""]
  });

  private roles : [Role];

  constructor(
    public fb: FormBuilder,
    private service : PlayerApi,
    private roleService : RoleApi,
    private attendanceService: AttendanceService,
    private playerService : PlayerApi,
    private _service: NotificationsService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.roleService.RoleGet().subscribe(
      (result) => {
        this.roles = result;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addPlayer() {

    var p = new Player();
    p.firstName = this.addForm.value.firstname;
    p.lastName = this.addForm.value.lastname;
    p.userName = this.addForm.value.username;
    p.email = this.addForm.value.email;
    p.password = this.addForm.value.password;
    p.roleId = this.addForm.value.role;
    p.attendance = this.attendanceService.AttendanceToNumber(
      this.addForm.value.attendanceSunday,
      this.addForm.value.attendanceMonday,
      this.addForm.value.attendanceTuesday,
      this.addForm.value.attendanceWednesday,
      this.addForm.value.attendanceThursday,
      this.addForm.value.attendanceFriday,
      this.addForm.value.attendanceSaturday
    );

    p.picturePath="";

    this.service.PlayerPost(p).subscribe(
      (result) => {
        console.log("playerpost");
        console.log(result);

        this.playerService.UploadProfilePic(result.id, this.fileToUpload).subscribe(
          (result) => {
            console.log("profilepic");
            console.log(result);
            this._service.success("Wohho", "Player erfolgreich angelegt");
            this.router.navigate(['/admin/players'])
          },
          (error) => {
            this._service.error("Fehler", "Es fehlen Felder oder der Username ist schon vorhanden");
            console.log(error);
          }
        )

      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.addForm.value);
  }

  fileChangeEvent(fileInput: any){
    this.fileToUpload = <File> fileInput.target.files[0];
  }

}
