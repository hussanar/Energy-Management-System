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
    this.getData('water')
    this.getDataele1('electricty')
    this.getDatagas('gas')
    this.getDataRenew('renewable')
  }
  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      // for (var i = 0; i < length; i++) {
      //   this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)
      // }
      var i = 0
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)

        // this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)

      });
      this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      // console.log(typeof (result))
      console.log(this.result)
      console.log(this.typedData.length)
      this.resultweek = Number(this.result) / Number(this.typedData.lenth) * 7
      this.resultmonthly = (Number(this.response) + Number(this.typedData.length) * 30)
      // this.water = result.toString()

    })
  }

  getDataele(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "computer", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      var total = Number(this.typedData[1].useage) + Number(this.typedData[1].cooling) + Number(this.typedData[1].computer)
      console.log(total)

      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.computer) + parseInt(element.useage)
        console.log(this.typedData)
      });

      this.electricty = _.sumBy(this.typedData, function (sum: any) { return sum.total })
      // console.log(length)


      // this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)


      // this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })


      // console.log(typeof (result))
      console.log(this.electricty)
      // this.water = result.toString()


    })
  } //  name: [this.empRecord.name],
  // useage: [this.empRecord.useage],
  // date: [this.empRecord.date],
  // food: [this.empRecord.food],
  // power: [this.empRecord.power],
  // vehical: [this.empRecord.vehical],
  // heateing:

  getDatagas(type: string) {
    let fields: Array<string> = ["_id", "name", "useage", "food", "power", "_rev", "date", "heateing", "vehical"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.heateing) + parseInt(element.useage) + parseInt(element.power) + parseInt(element.food) + parseInt(element.vehical)
      });
      console.log(this.typedData)
      this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(this.result)
      this.gas = this.result
    })
  }


  getDataRenew(type: string) {
    let fields: Array<string> = ["_id", "name", "solar", "wind", "hydro", "_rev", "date", "tidal", "nuclear"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.solar) + parseInt(element.wind) + parseInt(element.hydro) + parseInt(element.tidal) + parseInt(element.nuclear)
      });
      console.log(this.typedData)
      this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(this.result)
      this.renewable = this.result
    })
  }
  // name: '',
  // useage: '',
  // date: '',
  // cooling: '',
  // computer: '',
  // type: 'el
  getDataele1(type: string) {
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "computer", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.useage) + parseInt(element.cooling) + parseInt(element.computer);
      });
      console.log(this.typedData)
      this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(this.result)
      this.electricty = this.result
      length = this.typedData.length

      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)

      }
      console.log(this.total)
    })
  }
}
