import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-water-aditionalinfo',
  templateUrl: './water-aditionalinfo.component.html',
  styleUrls: ['./water-aditionalinfo.component.css']
})
export class WaterAditionalinfoComponent implements OnInit {
  type: string | undefined
  id: any;
  value: any;
  temp: any;
  viewVal: any = [];
  userId: any

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private acrouter: ActivatedRoute, private alert: NotificationService) {
    this.formGroup = this.fb.group({
      uniquenumber: [this.empRecord.uniquenumber],
      useagetype: [this.empRecord.useagetype],
      address: [this.empRecord.address],
      city: [this.empRecord.city],
      state: [this.empRecord.state],
      pin: [this.empRecord.pin],
      type: [this.empRecord.type]
    });
  }
  ngOnInit() {
    this.acrouter.queryParams.subscribe((params) => {
      console.log(params)
      this.id = params.data
      this.getData();

    })
  }
  formGroup: FormGroup;
  empRecord: any = {
    uniquenumber: '',
    useagetype: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    type: 'aditionalinfo'

  };
  storeing(doc: any, id: any) {
    console.log(doc)
    doc['water'] = this.id;

    this.api.add("energy-management-login", this.formGroup.value).subscribe(res => {
      console.log(res)
      this.alert.showSuccess("Data Stored Successfully", "Success")
      this.userId = localStorage.getItem('userData')
      this.router.navigate(['water'], { queryParams: { data: this.id } })
    })
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    console.log(user)
    console.log(this.id)

  }
  getData() {
    let fields: Array<string> = ["_id", "useagetype"]
    this.type = "useagetype"
    this.data.getByType(this.type, fields).subscribe(res => {
      console.log(res)
      this.value = res
      this.temp = this.value.docs
      console.log(this.temp)
      console.log(this.viewVal)
    })
  }



}