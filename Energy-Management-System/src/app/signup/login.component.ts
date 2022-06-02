import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



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
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private alert: NotificationService) {
    this.formGroup = this.fb.group({
      firstName: [this.empRecord.firstName, Validators.required],
      lastName: [this.empRecord.lastName, Validators.required],
      email: [this.empRecord.email, [Validators.required, Validators.pattern("[a-zA-Z0-9]*@gmail.com")]],
      password: [this.empRecord.password, [Validators.required, Validators.pattern("[a-zA-z@_]{6,}")]],
      mobile: [this.empRecord.mobile, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      type: [this.empRecord.type]
    });
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
    console.log(formdata)
    this.api.add("energy-management-login", this.formGroup.value).subscribe(res => {
      console.log(res);
      this.alert.showSuccess("Success", "Data Posted Success Fully")
      this.router.navigate(['loginmain']);

    }, _rej => {
      this.alert.showError("opps! Can not post data", "Error")
    });

    this.api.get("energy-management-login").subscribe(res => {
      this.alluser = res;
      this.alluser = this.alluser.rows;
      this.alluserData = this.alluser.map((el: any) => el.doc);
      console.log(this.alluserData[0]);
      this.api.array(this.alluserData);
      this.data.store(this.alluserData);


    });

  }

  click() {
    this.router.navigate(['login']);
  }


}
