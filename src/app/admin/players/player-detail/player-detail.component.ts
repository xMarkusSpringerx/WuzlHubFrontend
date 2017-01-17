import { Component, OnInit } from '@angular/core';
import {PlayerApi} from "../../../services/PlayerApi";
import {Player} from "../../../model/player";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {environment} from "../../../../environments/environment";
import {Validators, FormBuilder} from "@angular/forms";
import {AttendanceService} from "../../_shared/attendance.service";
import {Role} from "../../../model/role";
import {RoleApi} from "../../../services/RoleApi";

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  providers: [AttendanceService]
})
export class PlayerDetailComponent implements OnInit {

  private player : Player = new Player;
  private editModus : boolean = false;

  private roles : [Role];

  private edit_attendance = {
    attendanceMonday: false,
    attendanceTuesday: false,
    attendanceWednesday: false,
    attendanceThursday: false,
    attendanceFriday: false,
    attendanceSaturday: false,
    attendanceSunday: false
  };

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

  constructor(
    private playerService : PlayerApi,
    private activatedRoute : ActivatedRoute,
    private alertService : NotificationsService,
    public fb: FormBuilder,
    private router: Router,
    private attendanceService: AttendanceService,
    private roleService : RoleApi
  ) { }


  updatePlayer() {

    var p = this.player;

    p.id = this.player.id;

    if (this.addForm.value.firstname != "")
      p.firstName = this.addForm.value.firstname;

    if (this.addForm.value.firstname != "")
      p.lastName = this.addForm.value.lastname;

    if (this.addForm.value.firstname != "")
      p.userName = this.addForm.value.username;

    if (this.addForm.value.firstname != "")
      p.email = this.addForm.value.email;

    if (this.addForm.value.firstname != "")
      p.password = this.addForm.value.password;

    if (this.addForm.value.role != "")
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


    console.log(p);

    this.playerService.PlayerByPlayerIdPut(p.id, p).subscribe(
      (result) => {
        console.log("playerpost");

        this.playerService.UploadProfilePic(p.id, this.fileToUpload).subscribe(
          (result) => {
            console.log("profilepic");
            console.log(result);
            this.alertService.success("Wohho", "Player erfolgreich geupdated");
            this.editModus = false;
            this.ngOnInit();
          },
          (error) => {
            this.alertService.error("Fehler", "Es fehlen Felder oder der Username ist schon vorhanden");
            console.log(error);
          }
        )

      },
      (error) => {
        console.log(error);
      }
    );

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

    this.activatedRoute.params.subscribe(
      (param: any) => {
        let playerId = param['playerId'];
        console.log(playerId);

        this.playerService.PlayerByPlayerIdGet(playerId).subscribe(
          (result) => {
            this.player = result.player;
            this.player.picturePath = environment.baseApiPath + this.player.picturePath;
            console.log(this.player);

          },
          (error) => {
            this.alertService.alert("Fehler", "Eintrag konnte nicht geladen werden");
            console.log(error);
          }
        )
      });
  }

  editPlayer(){
    this.editModus = true;
    this.edit_attendance = this.attendanceService.NumberToAttendance(this.player.attendance);
  }

  fileChangeEvent(fileInput: any){
    this.fileToUpload = <File> fileInput.target.files[0];
  }

}
