import { Component, OnInit } from '@angular/core';
//import{ SigninComponent} from './app/signin.component';
//import { SigninComponent } from './signin.component';
import {  Router } from '@angular/router';
//import { AuthService } from '../app/components/auth.service';
import{HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
//import { Router } from '@angular/router';
import { Http } from '@angular/http';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
   
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Add Employee',  icon: 'speedometer', class: '' },
    { path: '/user-profile', title: 'View Employee Details',  icon:'person', class: '' },
    { path: '/table-list', title: 'View Holidays',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Leave Request',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Notice Board',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Iprocurement',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Attendence',  icon:'notifications', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  name:string='';
  array:any;

  photo:string;
  leavedata={
   
     email:localStorage.getItem('email')
   }
   id=this.leavedata.email;
   
   //console.log(this.leavedata.fullid)

  constructor(private http: HttpClient,private _router: Router,private http1:Http){}

  ngOnInit() {
    
    console.log(this.leavedata.email)
this.http1.post(` https://hrmsbackend.herokuapp.com/user/getuserdata`,
{
  email:this.leavedata.email
})
.subscribe(
  res=>{
    console.log("inside sidebar")
    console.log(res)
  
    this.array=res;
    var jsonObj = JSON.parse(this.array._body);
        console.log(jsonObj)
        this.photo=jsonObj.data.file
        this.name=jsonObj.data.firstname
        console.log(this.photo)
        console.log(this.name)
              localStorage.setItem('name',jsonObj.data.firstname)
    

  }
)
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logoutUser(){
    localStorage.removeItem('token')
this._router.navigate(['/signin'])
}

myfun() {
  $(".rotate").click(function () {
    $(this).toggleClass("down");
})
}
}

