import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-addentry',
  templateUrl: './addentry.component.html',
  styleUrls: ['./addentry.component.css']
})
export class AddentryComponent implements OnInit {
  resultweek: Number | undefined
  response: any | undefined;
  typedData: any = [];
  fileName = 'ExcelSheet.xlsx'
  totalUseage: any | undefined
  tempr: Object | undefined
  water: any
  result: Number | undefined
  result1: Number | undefined
  total1: number | undefined
  electricty: Number | undefined
  renewable: Number | undefined
  id: any;
  localObject: string | null | undefined;
  value: any;
  arrayVal: any;
  lenght: any;
  average: number | undefined

  constructor(private data: DataService, private Acrouter: ActivatedRoute, private router: Router) {

  }
  total: any;
  alluser: any;
  alluserData: any;
  fields: any = []
  obj: any;
  resultmonthly: Number | undefined
  gas: Number | undefined
  ngOnInit(): void {

    this.Acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id)
      this.localObject = localStorage.getItem("userdetails")
      console.log(this.localObject)


    })
    this.getDataByUserele('electricty')
    this.getDataByUsergas('gas')
    this.getDataByUserrenewable('renewable')
    this.getDataByUser("water")
  }
  // getData(type: string) {
  //   console.log(type);
  //   let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date"]
  //   this.data.getByType(type, fields).subscribe(res => {
  //     console.log(res);
  //     this.response = res;
  //     this.typedData = this.response.docs
  //     console.log(this.typedData);
  //       var i = 0
  //     this.typedData.forEach((element: any) => {
  //       element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)
  //       });
  //     this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
  //     console.log(this.result)
  //     console.log(this.typedData.length)
  //     this.resultweek = Number(this.result) / Number(this.typedData.lenth) * 7
  //     this.resultmonthly = (Number(this.response) + Number(this.typedData.length) * 30)
  // })
  // }

  getDataByUser(type: any) {
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date", "user"]
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)
    this.data.getByTypedUser(type, fields, this.id).subscribe(res => {
      console.log(res)
      this.value = res;
      var lenght = this.value.length
      console.log(lenght)
      this.arrayVal = this.value.docs

      this.lenght = this.arrayVal.length
      console.log(lenght)
      console.log(this.arrayVal)
      this.arrayVal.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)


      });
      this.result = _.sumBy(this.arrayVal, function (Total: any) { return Total.total })
      console.log(this.result)
      this.average = Number(this.result) / 2
      console.log(this.average)

    }, err => { console.log(err) })
  }

  getDataByUserele(type: any) {
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "computer", "_rev", "date"]
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)
    this.data.getByTypedUser(type, fields, this.id).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      console.log(this.arrayVal)
      this.arrayVal.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.computer) + parseInt(element.useage)


      });
      this.electricty = _.sumBy(this.arrayVal, function (Total: any) { return Total.total })
      console.log(this.electricty)
    }, err => { console.log(err) })
  }
  getDataByUsergas(type: any) {
    let fields: Array<string> = ["_id", "name", "useage", "food", "power", "_rev", "date", "heateing", "vehical"]
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)
    this.data.getByTypedUser(type, fields, this.id).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      console.log(this.arrayVal)
      this.arrayVal.forEach((element: any) => {
        element['total'] = parseInt(element.heateing) + parseInt(element.useage) + parseInt(element.power) + parseInt(element.food) + parseInt(element.vehical)

      });
      this.gas = _.sumBy(this.arrayVal, function (Total: any) { return Total.total })
      console.log(this.gas)
    }, err => { console.log(err) })
  }

  getDataByUserrenewable(type: any) {
    let fields: Array<string> = ["_id", "name", "solar", "wind", "hydro", "_rev", "date", "tidal", "nuclear"]
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)
    this.data.getByTypedUser(type, fields, this.id).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      console.log(this.arrayVal)
      this.arrayVal.forEach((element: any) => {
        element['total'] = parseInt(element.solar) + parseInt(element.wind) + parseInt(element.hydro) + parseInt(element.tidal) + parseInt(element.nuclear)

      });
      this.renewable = _.sumBy(this.arrayVal, function (Total: any) { return Total.total })
      console.log(this.renewable)
    }, err => { console.log(err) })
  }

  waterviewtable() {
    this.router.navigate(['watertable'], { queryParams: { data: this.id } })
  }
  eleviewtable() {
    this.router.navigate(['eletable'], { queryParams: { data: this.id } })
  }
  gasviewtable() {
    this.router.navigate(['gastable'], { queryParams: { data: this.id } })
  }
  renewableviewtable() {
    this.router.navigate(['rennewabletable'], { queryParams: { data: this.id } })
  }
}
