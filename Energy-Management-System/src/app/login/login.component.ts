import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAllJSDocTags } from 'typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  formGroup: FormGroup;
  empRecord: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    type: 'login'
  };
  alluser: any;
  alluserData: any;
  store: any = []
  obj: any;
  idValue: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient) {
    this.formGroup = this.fb.group({
      firstName: [this.empRecord.firstName],
      lastName: [this.empRecord.lastName],
      email: [this.empRecord.email],
      password: [this.empRecord.password],
      mobile: [this.empRecord.mobile],
      type: [this.empRecord.type]
    });
  }

  ngOnInit() {
    const body = { title: 'Angular put request ' };
  }
  get firstName() {
    return this.formGroup.get('firstName')!;
  }
  get email() {
    return this.formGroup.get('email')!;
  }
  get mobile() {
    return this.formGroup.get('mobile')!;
  }
  get password() {
    return this.formGroup.get('password')!;
  }
  storing(formdata: NgForm) {
    // console.log(formdata);
    // this.store.pushData(formdata);
    console.log(formdata)
    this.api.add("energy-management-login", this.formGroup.value).subscribe(res => {
      console.log(res);
      alert("Your data was posted successfully!");
      // this.empRecord.reset();
      this.router.navigate(['login']);

    }, rej => {
      alert("opps! Can not post data" + rej);
    });
    this.api.get("energy-management-login").subscribe(res => {
      // console.log(res);
      this.alluser = res;
      this.alluser = this.alluser.rows;
      this.alluserData = this.alluser.map((el: any) => el.doc);
      console.log(this.alluserData[0]);
      this.api.array(this.alluserData);
      this.data.store(this.alluserData);

      /**
      for (const array in this.alluserData) {
        console.log(`${this.store.push(this.alluserData[array])}`);
        console.log(this.alluserData[array].email)
        console.log(this.alluserData[array].firstName)
        console.log(this.alluserData[array].lastName)
        console.log(this.alluserData[array].password)
        console.log(this.alluserData[array].mobile)
      }

      //  this.res['rows'].map(el => el.doc.firstName)
      // this.alluser=this.alluser
      
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          console.log(element.id);
        }
      } */
      // this.api.getalluserdata(element.id).subscribe(res => {
      //   console.log(res);
      //   this.store.push(res);
      //   console.log("data is came");
      // }, rej => {
      //   console.log("error" + rej);
      // })

      // }
      // }
    }, rej => {
      alert("opps! Somthing went wrong" + rej);
      // alert("Your data was posted successfully!");
      // this.empRecord.reset();
    });
  }

  getdata() {
    this.api.get("energy-management-login").subscribe(res => {
      // console.log(res);
      this.alluser = res;
      this.alluser = this.alluser.rows;
      this.alluserData = this.alluser.map((el: any) => el.doc);
      console.log(this.alluserData[0]);
      this.api.array(this.alluserData);

      this.data.store(this.alluserData);
    }, rej => {
      alert("opps! Somthing went wrong" + rej);
      // alert("Your data was posted successfully!");
      // this.empRecord.reset();
    });


  }
  view1(id: any) {
    // this.router.navigate(['view'])
    this.idValue = id
    console.log(this.idValue)
    this.data.getDocByIds("energy-management-login", id).subscribe(res => {
      console.log(res);
      let temp = res;
      var record = [res];
      //console.log(record[0])
      alert("get the data successfully!");
      //  console.log(this.empRecord);
    }, rej => {
      alert("opps! Can not get data" + rej);
    });
  }

  click() {
    this.router.navigate(['login']);
  }
  view() {
    this.router.navigate(['view'])
  }

}
