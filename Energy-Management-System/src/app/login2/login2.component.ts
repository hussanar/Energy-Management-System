import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {


  formGroup: FormGroup;
  empRecord: any = {

    email: '',
    password: '',
    type: 'login'
  };
  email: any;
  password: any;
  store: any = []
  obj: any;
  type: any;
  response: any;
  logindata: any;
  id: any;
  value: any;
  array: any;
  private _id: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient) {
    this.formGroup = this.fb.group({

      email: [this.empRecord.email],
      password: [this.empRecord.password],
      type: [this.empRecord.type]
    });
  }
  login(val: any) {
    console.log(val);
    this.email = val.email
    this.password = val.password
    this.data.checkuserlogin(this.email, this.password).subscribe(data => {
      console.log(data);
      this.value = data
      this.array = this.value.docs
      this._id = this.array[0]._id
      console.log(this._id)

      if ((data.docs[0].password == this.password)) {
        alert("success!!")

        localStorage.setItem('userData', JSON.stringify(data.docs[0]))
        this.router.navigate(['dashboard'], { queryParams: { data: this._id } });
      }
      else {

        alert("Login authentication failed");
      }
    })


    // this.type = val.type
    // console.log(this.type)
    // this.data.login(this.email, this.password, this.type).subscribe(res => {
    //   console.log(res);
    //   this.response = res;
    //   this.logindata = this.response.docs
    //   console.log(this.logindata);
    //   this.id = this.logindata[3]._id
    //   console.log(this.id)
    //   this.router.navigate(['water'], { queryParams: { data: this.id } })
    //   this.formGroup.markAsUntouched();
    //   this.api.get('energy-managemet-login').subscribe(res => {
    //     console.log(res);

    // })
    // })

    // this.router.navigate(['dashboard']);


  }



  // getuser() {
  //   this.api.getEmployee().subscribe(res => {
  //     console.log(res);
  //     console.log("response is comming");
  //     this.alluser = res;
  //     this.alluser = this.alluser.data;
  //     this.alluser = this.alluser.rows;
  //     console.log(this.alluser);
  //     for (const key in this.alluser) {
  //       if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
  //         const element = this.alluser[key];
  //         console.log(element.id);
  //         this.api.getAllEmployee(element.id).subscribe(res => {
  //           console.log(res);
  //           this.exchange = res;
  //           this.exchange = this.exchange.data;
  //           this.store.push(this.exchange);
  //           console.log("data is came");
  //         }, rej => {
  //           console.log("error" + rej);
  //         })

  //       }
  //     }
  //   }, rej => {
  //     console.log("opps! Somthing went wrong" + rej);
  //   })
  // }

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  view() {
    this.router.navigate(['login'])

  }
  dashboard() {

  }

}
