import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
  employees={token: localStorage.getItem('token')};
  array:any;
  email1:String='';
  found:boolean=false;
  image:String='';
  name:string;
  DOJ:string;
  DOB:string;
  phone:string;
  photo:string;
  gender11:string='';
  reportingmanager:string;
  nexttoreportingmanager:string;
  hrmanager:String;




  id:number;
  bankdetailsarray:any;
  bankdetails:any;
  school:string='';
  collegeOne:string='';
  collegeTwo:String='';
  collegeThree:String='';

  pg:String='';
  accountholder:String=''
  accountnumber:String=''
  bankname:String=''
  pannumber:String=''
  branch:String=''
  ifsccode:String=''
  array2:any;
  array3:any;
  viewprofile:any;
  lastname:String='';
  primaryemail:String='';
  secondaryemail:String='';
  primaryphone:String=''
  secondaryphone:String=''
  guardian:String=''
  empid:String=''
  guardianphone:String='';
  personaldetailsarray:any
  personaldetails1:any;

  leavedata={
   
    email:localStorage.getItem('email')
  }
  educationaldata={
    tenth:'',
    intermediate:'',
    degree:'',
    pg:''

  }
  bankdata={
    accountholder:'',
    accountnumber:'',
    bankname:'',
    pannumber:'',
    ifsccode:'',
    branch:'',

  }
  personaldetailsdata={
    primaryemail:'',
    secondaryemail:'',
    primaryphone:'',
    secondaryphone:'',
    guardian:'',
    guardiannumber:'',

  }
  profiledetailsdata={
    fullname:'',
    DOB:'',
    DOJ:'',
    email:'',
    phone:'',
    gender:'',
    reportingmanager:'',
    nextreportingmanager:'',
    hrmanager:'',

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
     this.email1=jsonObj.data.email
    
      this.name=jsonObj.data.name
      this.name=jsonObj.data.firstname
      this.lastname=jsonObj.data.lastname
      this.name=this.name+" "+ this.lastname
      this.id=jsonObj.data.fullid
      localStorage.setItem('fid','this.id')
      this.DOJ=jsonObj.data.DOJ
      this.DOB=jsonObj.data.DOB
      this.reportingmanager=jsonObj.data.reportmanager
      this.nexttoreportingmanager=jsonObj.data.immediatereportmanager
      this.hrmanager=jsonObj.data.HRmanager
      this.phone=jsonObj.data.phonenumber
    this.gender11=jsonObj.data.gender
    this.photo=jsonObj.data.photo
    this.empid=jsonObj.data._id
    console.log(this.empid)
    localStorage.setItem('empid',jsonObj.data._id)


    console.log(this.reportingmanager+"manager is")

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
      this.array3=res;
    
      var jsonObj = JSON.parse( this.array3._body);
      console.log(jsonObj.msg)
      if(jsonObj.msg=="data inserted"){
        Swal.fire('','upadated Sucessfuly','success')
        this._router.navigate(['/homepage'])

      }
      else{
        Swal.fire('','Failed to updated','error')
        this._router.navigate(['/homepage'])
      }
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
            this.collegeThree=educationDetails.data.pg
            console.table(educationDetails)
      })

  }
  dankdetails(){
    console.log("inside bankdetails");
    const bankdetails= new FormData()
    console.log(this.educationaldata+"data")
    // console.log(this.leavedata.holidayType+"type")
    bankdetails.append('Accountholdername',this.bankdata.accountholder)
    bankdetails.append('Accountnumber',this.bankdata.accountnumber)
    bankdetails.append('Bankname',this.bankdata.bankname)
    bankdetails.append('pannumber',this.bankdata.pannumber)
    bankdetails.append('IFSCcode',this.bankdata.ifsccode)
    bankdetails.append('branch',this.bankdata.branch)
    bankdetails.append('empname',localStorage.getItem('email'))
    this._auth.bankdetails(bankdetails).subscribe((res)=>{
      console.log(res);
      // var jsonObj = JSON.parse( this.array2._body);
      // console.log(jsonObj.msg)
      this.array2=res;
    
      var jsonObj = JSON.parse( this.array2._body);
      console.log(jsonObj.msg)
      if(jsonObj.msg=="data inserted"){
        Swal.fire('','upadated Sucessfuly','success')
        this._router.navigate(['/homepage'])

      }
      else{
        Swal.fire('','Failed to updated','error')
        this._router.navigate(['/homepage'])
      }
    })

  }
  viewbankdetails(){
    this.http.post(' https://hrmsbackend.herokuapp.com/user/getbankdetails',{
      
      empname:localStorage.getItem('email')
    }).subscribe((res)=>{
      console.log("bank details");
        console.log(res); 
        this.bankdetailsarray=res;
        var bankdetails = JSON.parse(this.bankdetailsarray._body);              
          this.accountholder=bankdetails.data.Accountholdername         
          this.accountnumber=bankdetails.data.Accountnumber
          this.bankname=bankdetails.data.Bankname
          this.pannumber=bankdetails.data.pannumber         
          this.branch=bankdetails.data.branch
          this.ifsccode=bankdetails.data.IFSCcode
          console.log( this.ifsccode);
          console.table(bankdetails)
    })

  }
  personaldetails(){
    const personaldetails= new FormData()
    console.log(this.educationaldata+"data")
    // console.log(this.leavedata.holidayType+"type")
    personaldetails.append('primaryemailid',this.personaldetailsdata.primaryemail)
    personaldetails.append('secondaryemailid',this.personaldetailsdata.secondaryemail)
    personaldetails.append('primaryphone',this.personaldetailsdata.primaryphone)
    personaldetails.append('secondaryphone',this.personaldetailsdata.secondaryphone)
    personaldetails.append('gaurdain',this.personaldetailsdata.guardian)
    personaldetails.append('gaurdainnumber',this.personaldetailsdata.guardiannumber)
    personaldetails.append('empname',localStorage.getItem('email'))
    console.log(this.personaldetailsdata.primaryphone,this.personaldetailsdata.secondaryphone)
    this._auth.personaldetails(personaldetails).subscribe((res)=>{
      console.log(res);
      console.log("hello")
     
      this.array2=res;
    
      var jsonObj = JSON.parse( this.array2._body);
      console.log(jsonObj.msg)
      if(jsonObj.msg=="data inserted"){
        Swal.fire('','upadated Sucessfuly','success')
        this._router.navigate(['/homepage'])

      }
      else{
        Swal.fire('','Failed to updated','error')
        this._router.navigate(['/homepage'])
      }
    })
  }
  viewpersonaldetails(){
    this.http.post(' https://hrmsbackend.herokuapp.com/user/getpersonaldetails',{
      
      empname:localStorage.getItem('email')
    }).subscribe((res)=>{
      console.log("personal details");
        console.log(res);
        this.personaldetailsarray=res;
        var personaldetails1 = JSON.parse(this.personaldetailsarray._body);              
          this.primaryemail=personaldetails1.data.primaryemailid         
          this.secondaryemail=personaldetails1.data.secondaryemailid
          this.primaryphone=personaldetails1.data.primaryphone
          this.secondaryphone=personaldetails1.data.secondaryphone         
          this.guardian=personaldetails1.data.gaurdain
          this.guardianphone=personaldetails1.data.gaurdainnumber
          console.log( this.ifsccode);
          console.table(personaldetails1)
    })
  }
  editprofile(){
    const profiledetails= new FormData()
    console.log(this.profiledetailsdata)
    // console.log(this.leavedata.holidayType+"type")
    profiledetails.append('fullname',this.profiledetailsdata.fullname)
    profiledetails.append('DOB',this.profiledetailsdata.DOB)
    profiledetails.append('DOJ',this.profiledetailsdata.DOJ)
    profiledetails.append('email',this.profiledetailsdata.email)
    profiledetails.append('gender',this.profiledetailsdata.gender)
    profiledetails.append('phone',this.profiledetailsdata.phone)
    profiledetails.append('reportingmanager',this.profiledetailsdata.reportingmanager)
 
    profiledetails.append('nextreportingmanager',this.profiledetailsdata.nextreportingmanager)
    profiledetails.append('hrmanager',this.profiledetailsdata.hrmanager)
    profiledetails.append('empname',localStorage.getItem('email'))
    profiledetails.append('id',localStorage.getItem('empid'))
    this._auth.profileldetails(profiledetails).subscribe((res)=>{
      console.log(res);
      this.array2=res;
    
      var jsonObj = JSON.parse( this.array2._body);
      console.log(jsonObj.msg)
      if(jsonObj.msg=="data inserted"){
        Swal.fire('','upadated Sucessfuly','success')
        this._router.navigate(['/homepage'])

      }
      else{
        Swal.fire('','Failed to updated','error')
        this._router.navigate(['/homepage'])
      }
    })
  }
  viewprofiledetails(){
    console.log("inside viewprofile");
    this.http.post(' https://hrmsbackend.herokuapp.com/user/getprofiledetails',{
      
      empname:localStorage.getItem('email')
    }).subscribe((res)=>{
      console.log("personal details");
        console.log(res);
        this.viewprofile=res;
        var jsonObj = JSON.parse(this.viewprofile._body);
        console.log(jsonObj.data);
        this.email1=jsonObj.data.email
    
        // this.name=jsonObj.data.name
        this.name=jsonObj.data.fullname
        // this.lastname=jsonObj.data.lastname
        // this.name=this.name+" "+ this.lastname
        this.phone=jsonObj.data.phone;
        this.gender11=jsonObj.data.gender;
      // this.id=localStorage.getItem('fid')
        this.DOJ=jsonObj.data.DOJ
        this.DOB=jsonObj.data.DOB
        this.reportingmanager=jsonObj.data.reportingmanager
        this.nexttoreportingmanager=jsonObj.data.nextreportingmanager
        this.hrmanager=jsonObj.data.hrmanager
    })
  }

}
