import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';


@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
  employees={token: localStorage.getItem('token')};
  array:any;
  email:String='';
  found:boolean=false;
  image:String='';
  name:string;
  DOJ:string;
  DOB:string;
  phone:string;
  photo:string;
  gender:string;
  id:number;
  leavedata={
   
    email:localStorage.getItem('email')
  }
  empData = { 
    
    token: localStorage.getItem('token'),
    id:localStorage.getItem('id')
  
  }

  constructor(private _auth: AuthService,
    private _router: Router, private _httpclient:HttpClient,private http1:Http) { }

  ngOnInit() {
    this.http1.post(`http://localhost:3002/user/getuserdata`,
{
  email:this.leavedata.email
})
.subscribe(
  res=>{
    //console.log("hello")
    console.log("inside view details");
    console.log(this.leavedata.email)
    console.log(res);
    this.array=res;
    var jsonObj = JSON.parse(this.array._body);
        console.log(jsonObj)
        this.photo=jsonObj.data.file
        console.log(this.photo)
     this.email=jsonObj.data.email
    
      this.name=jsonObj.data.name
      this.id=jsonObj.data.fullid
      this.DOJ=jsonObj.data.DOJ
      this.DOB=jsonObj.data.DOB
      this.phone=jsonObj.data.phonenumber
    this.gender=jsonObj.data.gender
    this.photo=jsonObj.data.photo

  }
)
    
  }

}
