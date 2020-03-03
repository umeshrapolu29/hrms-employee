import { Component, OnInit } from '@angular/core';

import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';
import{HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.scss']
})
export class LeaverequestComponent implements OnInit {
  mydate=Date.now();
  success:any;
  Yes:any;
  leaveType:any;
  array:any;
  array1:any;


  leavedata={
   type:'',
    fromDate:'',
    toDate:'',
    reason:'',
    emailto:'',
    email:localStorage.getItem('email'),
    name:localStorage.getItem('name')
  }
  leavestatus:string='';
  date:string='';
  myArray:any;
  

  // constructor(private _auth: AuthService,
  //   private _router: Router) { }
    constructor(private _auth: AuthService,
      private _router: Router,private _snackBar: MatSnackBar,public dialog: MatDialog) { }
      openSnackBar() {      
         this._snackBar.open("submit Successfully !!", "", { 
          duration: 3000,
          });                      
      }


  ngOnInit() {
    let date=new Date()
    console.log("inside leaverequest")
 
   
    const leavestatus = new FormData();
    leavestatus.append('requestto', this. leavedata.email);
    console.log( this. leavedata.email)
    this._auth.leavestatus(leavestatus)
    .subscribe(
      res=>
      {
       
        console.log(res)
        this.myArray=res;
        console.log(this.myArray._body)
        var jsonObj = JSON.parse( this.myArray._body);
        console.log(jsonObj.data.status)
        this.leavestatus=jsonObj.data.status
       
     
      }
    )



  }
  leaverequest(){
    const leaveempdata = new FormData();
    leaveempdata.append('reqtype',this. leavedata.type);
    leaveempdata.append('fromdate',this. leavedata.fromDate);
    leaveempdata.append('todate',this. leavedata.toDate);
    leaveempdata.append('reason', this. leavedata.reason);
    leaveempdata.append('requestto', this. leavedata.email);
    leaveempdata.append('name', this.leavedata.name);
    leaveempdata.append('emailto', this.leavedata.emailto);
    console.log(this.leavedata.name)
    this._auth.leaverequest(leaveempdata)
    .subscribe(
      (res) => {
        console.log(res)
         this.array1=res;
        console.log(this.array1._body)
        var jsonObj = JSON.parse( this.array1._body);
        console.log(jsonObj.msg)

        if(jsonObj.msg=="leave request data inserted"){
          Swal.fire('','Request send Successful','success')
          this._router.navigate(['/homepage'])

        }
        else{
          Swal.fire('','Request Failed','error')
          this._router.navigate(['/homepage'])
        }
      })
       
  

    }
  }
