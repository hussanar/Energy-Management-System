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

  response: any | undefined;
  typedData: any = [];
  fileName = 'ExcelSheet.xlsx'
  totalUseage: any | undefined
  tempr: Object | undefined
  water: any
  result: Number | undefined
  result1: Number | undefined
  constructor(private data: DataService, private Acrouter: ActivatedRoute) {

  }
  total: any;
  alluser: any;
  alluserData: any;
  fields: any = []
  obj: any;
  ngOnInit(): void {
    this.getData('water')
    this.getData1('electricty')
  }
  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)
      }
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)

        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)

      });
      this.result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      // console.log(typeof (result))
      console.log(this.result)
      // this.water = result.toString()

    })
  }
  getData1(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "computer", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)
      }
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)

        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)

      });
      this.result1 = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      // console.log(typeof (result))
      console.log(this.result1)
      // this.water = result.toString()

    })
  }
}
