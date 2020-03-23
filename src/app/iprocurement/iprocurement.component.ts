import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DilogeComponent } from 'app/diloge/diloge.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-iprocurement',
  templateUrl: './iprocurement.component.html',
  styleUrls: ['./iprocurement.component.scss']
})
export class IprocurementComponent implements OnInit {
  file:any;
  item:string='';
  description:string='';
  amount:string='';
  tid:string='';
  item1:string='';
  description1:string='';
  amount1:string='';
  tid1:string='';
  item2:string='';
  description2:string='';
  amount2:string='';
  tid2:string='';
  item3:string='';
  description3:string='';
  amount3:string='';
  tid3:string='';
  array1:any;
  array2:any;
  empData = { 
    item:'',
     description:'',
     amount:'',
     file:'',
     email:localStorage.getItem('email'),
     name:localStorage.getItem('name')
     
   
   }
  myArray:any;
  constructor(private _auth: AuthService,
    private _router: Router, private _httpclient:HttpClient,private _fb: FormBuilder,public dialog: MatDialog) { }
    //selectedFile: ImageSnippet;
    public emoployeeData: FormGroup
    public filesToUpload: Array<File> = [];
   


  ngOnInit() {
    // this._httpclient.get('http://localhost:3000/IProcurement/getData')
    // .subscribe(
    //   (res)=>{
    //     console.log("iprocurement")
     
    //     console.log(res)
    //     this.myArray=res
    //     console.log(this.myArray[0].item)
   
    //   }
    // )
    console.log("helloo inside bar")
    const iprocurementdata1 = new FormData();
    iprocurementdata1.append('email',this.empData.email)
    this._auth.getiprodata(iprocurementdata1).subscribe((res)=>{
      console.log(res)
      this.myArray=res
        this.myArray=res;
        var jsonObj = JSON.parse(this.myArray._body);
        console.log(jsonObj.data)
        this.array1=jsonObj.data
    })
    

}
fileChangeEvent(fileInput: any) {
  this.filesToUpload = <Array<File>>fileInput.target.files;

}
addiprocurement1(){
  const iprocurementdata = new FormData();

  iprocurementdata.append('file', this.filesToUpload[0], this.filesToUpload[0].name);
  console.log(File+" file")
  iprocurementdata.append('item',this.empData.item);
  iprocurementdata.append('description',this.empData.description);
  iprocurementdata.append('amount',this.empData.amount)
  iprocurementdata.append('email',this.empData.email)
  iprocurementdata.append('employeename',this.empData.name)
  iprocurementdata.append('empname',localStorage.getItem('email'))

  console.log(this.empData )
  console.log(iprocurementdata+"data")
  this._auth.uploadSheet(iprocurementdata)
  .subscribe(
    (res) => {
      console.log(res)
      this.array2=res;
        console.log(this.array1._body)
        var jsonObj = JSON.parse( this.array2._body);
        console.log(jsonObj.msg)
        if(jsonObj.msg=="added Iprocumerent"){
          Swal.fire('','Request send  Successful','success')
          this._router.navigate(['/homepage'])

        }
        else{
          Swal.fire('','Request send Failed','error')
          this._router.navigate(['/homepage'])
        }
     
      console.log(this.empData.amount )
      console.log("hello")
}
  )

}
addiprocurement()
{
  this._httpclient.get('http://localhost:3000/IProcurement/update')
    .subscribe(
      (res)=>{
        console.log(res)
      }
    )
}
openDialog(): void {
  const dialogRef = this.dialog.open(DilogeComponent, {
 
  });

  dialogRef.afterClosed().subscribe(result => {
   
  });
}
}
