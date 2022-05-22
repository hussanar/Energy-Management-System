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
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient) {
    this.formGroup = this.fb.group({

      email: [this.empRecord.email],
      password: [this.empRecord.password],
      type: [this.empRecord.type]
    });
  }
  login(val: any) {
    console.log(val);
    this.router.navigate(['dashboard']);;
    this.email = val.email
    this.password = val.password
    this.type = val.type
    console.log(this.type)
    this.data.login(this.email, this.password, this.type).subscribe(res => {
      console.log(res);
      this.response = res;
      this.logindata = this.response.docs
      console.log(this.logindata);
      this.formGroup.markAsUntouched();
    })


  }

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  view() {
    this.router.navigate(['login'])

  }
  dashboard() {

  }

}
