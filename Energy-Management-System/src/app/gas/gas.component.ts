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
  selector: 'app-gas',
  templateUrl: './gas.component.html',
  styleUrls: ['./gas.component.css']
})
export class GasComponent implements OnInit {


  response: any | undefined;
  typedData: any;
  fileName = 'ExcelSheet.xlsx'
  totalUseage: any | undefined
  tempr: any;
  id: any;
  type: string | undefined
  value: any;
  arrayVal: any;

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id)
    })
  }
  formGroup: FormGroup;
  empRecord: any = {
    name: '',
    useage: '',
    date: '',
    food: '',
    power: '',
    vehical: '',
    heateing: '',
    type: 'gas'
  };
  alluser: any;
  alluserData: any;
  store: any = []
  fields: any = []
  obj: any;
  idValue: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private acrouter: ActivatedRoute, private alert: NotificationService) {
    this.formGroup = this.fb.group({
      name: [this.empRecord.name],
      useage: [this.empRecord.useage],
      date: [this.empRecord.date],
      food: [this.empRecord.food],
      power: [this.empRecord.power],
      vehical: [this.empRecord.vehical],
      heateing: [this.empRecord.heateing],
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
  get food() {
    return this.formGroup.get('food')!;
  }
  get power() {
    return this.formGroup.get('power')!;
  }
  get vehical() {
    return this.formGroup.get('vehical')!;
  }
  get heateing() {
    return this.formGroup.get('heateing')!;
  }

  navigateHome() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.id } })
  }
  movetoTable() {
    this.router.navigate(['gastable'], { queryParams: { data: this.id } })
  }
  storing(doc: any, id: any) {

    console.log(doc);
    doc['user'] = this.id;
    console.log(id)
    this.api.add("energy-management-login", this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      this.alert.showSuccess("Your Data is stored Successfully", "Success")
      console.log(doc)
      this.type = "gas"
      this.data.postByTypedUser("energy-management-login", this.type, this.id).subscribe(res => {
        console.log(res)
        console.log(this.id)
      })

    }, rejects => {
      this.alert.showError("Sorry Can't post Data", "Error")
    });


  }
  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
    }, rej => {
      this.alert.showError("can't Delete", "can't delete")
    })

  }



}