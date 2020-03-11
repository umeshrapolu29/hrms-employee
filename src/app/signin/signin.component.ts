import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';
import{HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  name:string='';
  password:number;
  name1:string='';
  name2:string='jhsfdgkis'
  array:any;
  array1:any;

  leavedata={
    type:'',
     fromDate:'',
     toDate:'',
     reason:'',
     fullid:localStorage.getItem('fullid')
   }
 
  loginUserData = {
    email:"",
    password:"",
   
  }

  constructor(private _auth: AuthService,
              private _router: Router) { }

  

 
  ngOnInit() {

   
  }
  
  loginUser() {
   
    console.log(this.loginUserData)
    this._auth.loginUser1(this.loginUserData)
    .subscribe(
      res => {
        console.log("second")
        console.log(res);
        // console.log(JSON.stringify(res))
        this.array=res
        console.log(this.array._body);
        this.array1=this.array._body
        var jsonObj = JSON.parse(this.array._body);
        console.log(jsonObj.msg)
        console.log(jsonObj.data.email)
        localStorage.setItem('email',jsonObj.data.email)
        if(jsonObj.msg=="login successfull")
        {
          console.log("login successfull");
          // Swal.fire('','login Successful','success')
          this._router.navigate(['/homepage'])
        }
        else{
          Swal.fire('','login Failed','error')
          this._router.navigate(['/signin'])
        }
      
        
      }     
    )
   
   

  }
  







}

