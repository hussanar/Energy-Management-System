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
  sample: any;
  temp: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private alert: NotificationService) {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [this.empRecord.lastName, Validators.required],
      email: [this.empRecord.email, [Validators.required, Validators.email]],
      password: [this.empRecord.password, [Validators.required]],
      mobile: [this.empRecord.mobile, [Validators.required]],
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
    console.log(this.formGroup.value.email)
    this.data.login(this.formGroup.value.email, this.formGroup.value.password, "login").subscribe(res => {
      this.sample = res
      this.temp = this.sample.docs.length
      if (this.temp == 0) {
        this.api.add("energy-management-login", this.formGroup.value).subscribe(result => {
          console.log(result);
          this.alert.showSuccess("Success", "Data Posted Success Fully")
          this.router.navigate(['loginmain']);

        }, rej => {
          this.alert.showError("opps! Can not post data", "Error")
          this.alert.error(rej.error.reason);
        });
      }
      else {
        this.alert.showError(" this Email is already Exist", "Already Exist")
      }

    })


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
