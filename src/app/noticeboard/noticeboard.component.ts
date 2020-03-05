import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.scss']
})
export class NoticeboardComponent implements OnInit {
  success:any;
  Yes:any;
  array:any;

  title:string='';
description:string='';
date:string='';
  constructor(private _auth: AuthService,
    private _router: Router, private _httpclient:HttpClient,private http1:Http,) { }

  ngOnInit() {
   
    this.http1.get(' https://hrmsbackend.herokuapp.com/user/viewnotice')
    .subscribe(
      (res)=>{
        console.log("inside notice board")
        console.log(res)
        this.array=res;
       
        var jsonObj = JSON.parse(this.array._body);
        console.log(jsonObj.data)
        this.array=jsonObj.data;

      }
    ) 
  }
  viewnotification()
  {
    this._httpclient.get('http://localhost:3000/NoticeBoard/ViewFiveNotice')
    .subscribe(
      (res)=>{
      }
    )

  }
}

  

