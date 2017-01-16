import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {PlayerApi} from "../../../services/PlayerApi";
import {Player} from "../../../model/player";
import {RoleApi} from "../../../services/RoleApi";
import {Role} from "../../../model/role";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

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

    role:[""]
  });

  private roles : [Role];

  constructor(public fb: FormBuilder, private service : PlayerApi, private roleService : RoleApi) {

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


    /* TODO */
    p.picturePath = "";
    p.attendance = 100;


    this.service.PlayerPost(p).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.addForm.value);
  }

}
