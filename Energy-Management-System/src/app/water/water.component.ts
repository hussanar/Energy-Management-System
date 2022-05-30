import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';





@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit {
  response: any | undefined;
  typedData: any = [];

  totalUseage: any | undefined
  tempr: Object | undefined
  id: any;
  type: string | undefined
  value: any;
  arrayVal: any;
  localObject: any;

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id)
      this.localObject
    })

  }

  formGroup: FormGroup;
  empRecord: any = {
    name: '',
    useage: '',
    date: '',
    cooling: '',
    gardening: '',
    type: 'water'
  };
  total: any;
  alluser: any;
  alluserData: any;
  fields: any = []
  obj: any;
  idValue: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private acrouter: ActivatedRoute, private alert: NotificationService) {
    this.formGroup = this.fb.group({
      name: [this.empRecord.name],
      useage: [this.empRecord.useage],
      date: [this.empRecord.date],
      cooling: [this.empRecord.cooling],
      gardening: [this.empRecord.gardening],
      type: [this.empRecord.type]
    });
  }
  get name() {
    return this.formGroup.get('name')!;
  }
  get useage() {
    return this.formGroup.get('useage')!;
  }
  get date() {
    return this.formGroup.get('date')!;
  }
  get cooling() {
    return this.formGroup.get('cooling')!;
  }
  get gardening() {
    return this.formGroup.get('gadening')!;
  }

  storing(doc: any, id: any) {

    console.log(doc);
    doc['user'] = this.id;
    doc['date'] = new Date
    console.log(id)
    this.api.add("energy-management-login", this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      this.alert.showSuccess("Your Data Stored Successfully", "Success")
      console.log(doc)
      this.type = "water"
    }, rejects => {
      alert("Sorry Can't post Data " + rejects)
      this.alert.showError("Sorry Can't Post Data", "Error")
    });
  }
  navigateBack() {
    this.router.navigate(['dashboard'],
      { queryParams: { data: this.id } })
  }
  aditionalinfo() {
    this.router.navigate(['aditionalInfo'], { queryParams: { data: this.id } })
  }
  movetoTable() {
    this.router.navigate(['watertable', { queryparam: { data: this.id } }])
  }
}



