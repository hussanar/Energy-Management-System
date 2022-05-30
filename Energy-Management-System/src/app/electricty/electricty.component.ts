import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-electricty',
  templateUrl: './electricty.component.html',
  styleUrls: ['./electricty.component.css']
})
export class ElectrictyComponent implements OnInit {
  response: any | undefined;
  typedData: any;
  totalUseage: any | undefined
  tempr: any;
  total: any;
  value: any;
  arrayVal: any;
  id: any;
  type: string | undefined

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id)
    })
  }
  formval: FormGroup;
  empRecord: any = {
    name: '',
    useage: '',
    date: '',
    cooling: '',
    computer: '',
    type: 'electricty'
  };
  alluser: any;
  alluserData: any;
  store: any = []
  fields: any = []
  obj: any;
  idValue: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private acrouter: ActivatedRoute, private alert: NotificationService) {
    this.formval = this.fb.group({
      name: [this.empRecord.name],
      useage: [this.empRecord.useage],
      date: [this.empRecord.date],
      cooling: [this.empRecord.cooling],
      computer: [this.empRecord.computer],
      type: [this.empRecord.type]
    });
  }

  get name() {
    return this.formval.get('name')!;
  }
  get useage() {
    return this.formval.get('useage')!;
  }
  get date() {
    return this.formval.get('date')!;
  }
  get cooling() {
    return this.formval.get('cooling')!;
  }
  get gardening() {
    return this.formval.get('gadening')!;
  }
  get computer() {
    return this.formval.get('computer')!;
  }

  navigateHome() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.id } })
  }
  storing(doc: any, id: any) {

    console.log(doc);
    doc['user'] = this.id;
    console.log(id)
    this.api.add("energy-management-login", this.formval.value).subscribe((res: any) => {
      console.log(res);
      this.alert.showSuccess("Your Data is stored Successfully", "Success")
      console.log(doc)
      this.type = "electricty"
      this.data.postByTypedUser("energy-management-login", this.type, this.id).subscribe(res => {
        console.log(res)
        console.log(this.id)
      })

    }, rejects => {
      this.alert.showError("Sorry Can't post Data ", "Error")
    });


  }

  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "computer", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.formval.markAsUntouched();
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.computer) + parseInt(element.useage)
        console.log(this.typedData)
      });
      this.total = Number(this.typedData[1].useage) + Number(this.typedData[1].cooling) + Number(this.typedData[1].computer)
      console.log(this.total)


      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)
      }
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.computer) + parseInt(element.useage)
        console.log(this.typedData)

        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)

      });
      var result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(result)
      console.log(typeof (result))
    })
  }
  movetoTable() {
    this.router.navigate(['eletable', { queryparam: { data: this.id } }])
  }

}
