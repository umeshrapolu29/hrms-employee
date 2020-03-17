import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import{Headers} from '@angular/http'
import 'rxjs/add/operator/map'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _loginUrl = "http://localhost:3000/users/login";
  // private _login1Url = "http://localhost:3002/user/login";
  // private _addemployeeUrl = "http://localhost:3000/Admin/uploads";
  // private _leaverequestUrl = "http://localhost:3002/user/leaverequest";
  // private _leavestatusUrl = "http://localhost:3002/user/leaveapproveddata";
  // private _viewholidayUrl = "http://localhost:3002/user/viewholiday";
  // private _addiprocurementUrl = "http://localhost:3002/user/addiprocurement";
  // private _getiprodataUrl = "http://localhost:3002/user/getapprovediprodata";
  // private _downloadpayslipsUrl = "http://localhost:3002/user/getpayslips";
  private _loginUrl = " https://hrmsbackend.herokuapp.com/users/login";
  private _login1Url = " https://hrmsbackend.herokuapp.com/user/login";
  private _addemployeeUrl = " https://hrmsbackend.herokuapp.com/Admin/uploads";
  private _leaverequestUrl = "https://hrmsbackend.herokuapp.com/user/leaverequest";
  private _leavestatusUrl = " https://hrmsbackend.herokuapp.com/user/leaveapproveddata";
  private _viewholidayUrl = " https://hrmsbackend.herokuapp.com/user/viewholiday";
  private _addiprocurementUrl = "https://hrmsbackend.herokuapp.com/user/addiprocurement";
  private _getiprodataUrl = " https://hrmsbackend.herokuapp.com/user/getapprovediprodata";
  private _downloadpayslipsUrl = " https://hrmsbackend.herokuapp.com/user/getpayslips";
  private _resetpasswordUrl = "  https://hrmsbackend.herokuapp.com/user/resetpassword";
  private _forgotpasswordUrl = "  https://hrmsbackend.herokuapp.com/user/forgotpassword";
  private _educationaldetailsUrl = "  https://hrmsbackend.herokuapp.com/user/educationdetails";
  private _bankdetailsUrl = "https://hrmsbackend.herokuapp.com/user/bankdetails";
  private _personaldetailsUrl = "https://hrmsbackend.herokuapp.com/user/personaldetails";


  constructor(private http: HttpClient,private http1: Http,
    private _router: Router) { }

    loginUser(loginUserData){
      return this.http.post<any>(this._loginUrl, loginUserData)
    }
    loginUser1(loginUserData){
      return this.http1.post(this._login1Url, loginUserData)
    }
    getToken() {
      return localStorage.getItem('token')
    }
    loggedIn() {
      return !!localStorage.getItem('token')    
    }
    
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/signin'])
  }
addemployee(empData)
{
  return this.http.post<any>(this._addemployeeUrl , empData)

} 
leaverequest(leaveempdata)

{
  return this.http1.post(this._leaverequestUrl, leaveempdata)
 
}
uploadSheet(iprocurementdata)
{
  console.log(iprocurementdata)
  return this.http1.post(this._addiprocurementUrl, iprocurementdata)

}

downloadpayslips(sendyear)
{
  // return this.http.post<any>(this._uploadUrl, upload)
  return this.http1.post(this._downloadpayslipsUrl, sendyear)

}
holidaytype(holidaytype1)
{

  return this.http1.post(this._viewholidayUrl, holidaytype1)
}
// getusername(holidaytype1)
// {
//   const headers=new HttpHeaders()
//    return this.http.post("http://localhost:3000/Admin/getUsers",holidaytype1,
//    {headers:headers})
// }
leavestatus(leavestatus)
{
  
  return this.http1.post(this._leavestatusUrl, leavestatus)
}
getiprodata(getiprodata)
{
  
  return this.http1.post(this._getiprodataUrl, getiprodata)
}
download(sendfullid)
{
  const headers=new HttpHeaders()
  return this.http.post("http://localhost:3000/payslips/download",sendfullid,
  {headers:headers}
  )
}
resetpassword(getiprodata)
{
  
  return this.http1.post(this._resetpasswordUrl, getiprodata)
}
forgotpassword(getiprodata)
{
  
  return this.http1.post(this._forgotpasswordUrl, getiprodata)
}
educationaldetails(getiprodata)
{
  
  return this.http1.post(this._educationaldetailsUrl, getiprodata)
}
bankdetails(getiprodata)
{
  
  return this.http1.post(this._bankdetailsUrl, getiprodata)
}
personaldetails(getiprodata)
{
  
  return this.http1.post(this._personaldetailsUrl, getiprodata)
}

}
