import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  reason:string='';
  Type:string='';
  date:string='';
  day:string='';
  file1:string;
  myArray:any;
  array1:any;
  array:any;

  // day:string='';
  // reason1:string='';
  // holidaytype1:string='';
  // date1:string='';
  // day1:string='';
  // reason2:string='';
  // holidaytype2:string='';
  // date2:string='';
  // day2:string='';
  // reason3:string='';
  // holidaytype3:string='';
  // date3:string='';
  // day3:string='';
  leavedata={
    type:'',
     fromDate:'',
     toDate:'',
     reason:'',
     holidayType:'MandatoryHoliday',
     holidayType1:'OptionalHoliday',
    
     fullid:localStorage.getItem('fullid')
   }
 




  constructor(private _auth: AuthService,
    private _router: Router, private _httpclient:HttpClient,private http1:Http,) { }

  ngOnInit() {
    // this._httpclient.get('http://localhost:3000/Holiday/ViewHoliday')
    // .subscribe(
    //   (res:any[])=>{
     
    //     console.log( localStorage.getItem('token'))
   

    //       console.log(res)
       
        
    //             this.reason=res[0].reason;
       
    //              this.holidaytype=res[0].holidaytype;
    //              this.date=res[0].date;
    //              this.day=res[0].dayofweek;
    //              this.reason1=res[1].reason;
          
    //              this.holidaytype1=res[1].holidaytype;
    //              this.date1=res[1].date;
    //              this.day1=res[1].dayofweek;
    //              this.reason2=res[2].reason;

    //              this.holidaytype2=res[2].holidaytype;
    //              this.date2=res[2].date;
    //              this.day2=res[2].dayofweek;
    //              this.reason3=res[3].reason;
      
    //              this.holidaytype3=res[3].holidaytype;
    //              this.date3=res[3].date;
    //              this.day3=res[3].dayofweek;
                
              
      
            
    //   }
        
    // )
  
    $(document).ready(function(){
      $(".bt").on('click', function(){
        $(".cover").show();
        $(".pop").show();
        
      });
      $("#close").on('click', function(){
        $(".cover").hide();
        $(".pop").hide();
        
      });
    });
    var html = `<tr>
    <div class="row inputfields">
      <div class="col-md-6 ">
          <td><input class="form-control form-control-inline input-medium date" type="date" value="" placeholder="Date"></td>

      </div>
      <div class="col-md-6">
          <td><input class="form-control form-control-inline" type="text" name="occasion[0]" placeholder="Occasion"></td>
      </div>
      </div>
      </tr>`;
 
$(function() {
   
 
    $('#addRow').click(function(){
        $('tbody').append(html);
    });
 
    $(document).on('click', '.remove', function() {
        $(this).parents('tr').remove();
    });
 
   
});
  }
  holidaytype( data)

  {
 
    const holidaytype1= new FormData()
    console.log("holiday type is" +data)
    holidaytype1.append('holidaytype',data)

    this._auth.holidaytype(holidaytype1)
    .subscribe(
      res => {
        console.log("holiday")
        console.log(res)
        this.myArray=res
        this.myArray=res;
        var jsonObj = JSON.parse(this.myArray._body);
        console.log(jsonObj.data)
        this.array1=jsonObj.data

        // console.log(this.myArray[0].date)
        // this.reason=res[0].reason
        // this.Type=res[0].holidaytype
        // this.date=res[0].date
        // this.day=res[0].dayofweek
        // this.file1=res[0].file
        // console.log(res[0].file+"photo")

      }
    )
  }
  allholidaytype(){
    this.http1.get('https://hrmsbackend.herokuapp.com/user/allholidays')
    .subscribe(
      (res)=>{
        console.log(res)
        this.array=res;
       
        var jsonObj = JSON.parse(this.array._body);
        console.log(jsonObj.data)
        this.array1=jsonObj.data;

      }
    )

  }

}
