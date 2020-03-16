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
  bankdetailsarray:any;
  bankdetails:any;
  school:string='';
  collegeOne:string='';
  collegeTwo:String='';
  pg:String='';
  accountholder:String=''
  accountnumber:String=''
  bankname:String=''
  pannumber:String=''
  branch:String=''
  ifsccode:String=''
  array2:any;
  leavedata={
   
    email:localStorage.getItem('email')
  }
  educationaldata={
    tenth:'',
    intermediate:'',
    degree:'',
    pg:''

  }
  empData = { 
    
    token: localStorage.getItem('token'),
    id:localStorage.getItem('id')
  
  }

  constructor(private _auth: AuthService,
    private _router: Router, private _httpclient:HttpClient,private http:Http) { }

  ngOnInit() {





    this.http.post(`https://hrmsbackend.herokuapp.com/user/getuserdata`,
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
  educationaldetails(){
    const educationaldetails= new FormData()
    console.log(this.educationaldata+"data")
    // console.log(this.leavedata.holidayType+"type")
    educationaldetails.append('tenth',this.educationaldata.tenth)
    educationaldetails.append('intermediate',this.educationaldata.intermediate)
    educationaldetails.append('degree',this.educationaldata.degree)
    educationaldetails.append('pg',this.educationaldata.pg)
    educationaldetails.append('empname',localStorage.getItem('email'))
    this._auth.educationaldetails(educationaldetails).subscribe((res)=>{
      console.log(res);
    })

  }
  vieweducationdetails(){
    console.log("inside employee details");
    
    this.http.post('https://hrmsbackend.herokuapp.com/user/geteducationaldetails',{
      
        empname:localStorage.getItem('email')
      }).subscribe((res)=>{
          console.log(res);
          this.array2=res;
          var educationDetails = JSON.parse(this.array2._body);              
            this.school=educationDetails.data.tenth         
            this.collegeOne=educationDetails.data.intermediate
            this.collegeTwo=educationDetails.data.degree
            console.table(educationDetails)
      })

  }

}
