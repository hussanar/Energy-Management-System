import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';

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
  adminPwd: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private alert: NotificationService) {
    this.formGroup = this.fb.group({

      email: [this.empRecord.email],
      password: [this.empRecord.password],
      type: [this.empRecord.type]
    });
  }
  login(val: any) {
    console.log(val);
    this.email = val.email
    this.password = btoa(val.password)

    this.data.checkuserlogin(this.email).subscribe(data => {
      console.log(data);
      this.value = data
      this.array = this.value.docs
      this._id = this.array[0]?._id
      console.log(this._id)


      if ((data.docs[0].password == this.password)) {

        localStorage.setItem('userData', JSON.stringify(data.docs[0]))
        this.router.navigate(['dashboard'], { queryParams: { data: this._id } });
        this.alert.showSuccess("Login Successfully", "Success");
      }
      else if ((data.docs[0].password == this.adminPwd)) {
        localStorage.setItem('userData', JSON.stringify(data.docs[0]))
        this.router.navigate(['admin'], { queryParams: { data: this._id } });
        this.alert.showSuccess("Login Successfully", "Success")
      }
      else {

        this.alert.showError("login authendication Failed", "Error")
      }
    })
  }
  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  view() {
    this.router.navigate(['login'])

  }


}
