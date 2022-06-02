import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-water-view-table',
  templateUrl: './water-view-table.component.html',
  styleUrls: ['./water-view-table.component.css']
})
export class WaterViewTableComponent implements OnInit {
  term!: string
  value: any;
  arrayVal: any;
  fileName = 'ExcelSheet.xlsx'
  tempr: any;
  id: any
  localObject: any;
  temp: any;
  viewVal: any = [];
  sample: any;
  responseData: any;
  length: any;
  Excel: any;
  isDisabled: boolean | undefined

  constructor(private api: ApiService, private data: DataService, private router: Router, private acrouter: ActivatedRoute, private alert: NotificationService) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
    })
    this.localObject = localStorage.getItem("userdetails")
    console.log(this.localObject)
    this.isDisabled = true
    this.getDataByView("water")
  }
  getDataByUser(type: any) {

    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    console.log(user)
    console.log(this.id)
    this.data.getByTypedUser(type, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      this.length = this.arrayVal.length
      console.log(this.length)
      console.log(this.arrayVal)
      this.arrayVal.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)
      });
      var result = _.sumBy(this.arrayVal, function (Total: any) { return Total.total })
      console.log(result)
    }, err => {
      console.log(err)
      this.alert.showError("Can't Get Data", "Can't Get Data")
    })
  }
  getDataByView(type: string) {
    let userObject: any = localStorage.getItem('userData')
    this.data.getDataByViewDoc('energy-management-login', type, userObject['_id']).subscribe(res => {
      console.log(res)
      this.responseData = res
      this.sample = this.responseData.rows
      console.log(this.sample);

      this.viewVal = this.sample.map((el: any) => el.doc)
      this.length = this.viewVal.length
      console.log(this.length)
      if (this.length != 0) {
        this.isDisabled = false;
      }
    }, _rej => {
      this.alert.showError("Cant Get Data", "Cant Get Data")
    })
  }
  navigateHome() {
    this.router.navigate(['dashboard'],
      { queryParams: { data: this.localObject } })
  }
  navigateBack() {
    this.router.navigate(['water'],
      { queryParams: { data: this.localObject } })
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
    this.alert.showSuccess("Exported Successfully", "success")

  }
  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
      this.alert.showInfo("Your Data deleted successfully", "Deleted");
    }, _rej => {
      this.alert.showError("Can't Delete Data", "Can't Delete Data")
    })

  }
  viewWater(obj: any) {
    this.router.navigate(['waterView'], { queryParams: { data: obj } });
    this.data.getDataById('energy-management-login', obj).subscribe(Response => {
      this.tempr = Response
      console.log(Response);
      this.data.save(this.tempr);
      this.alert.showSuccess("get data successfully", "Success")
    }, _rej => {
      this.alert.showError("sorry Cant Get the Object", "Error")
    }
    );
  }

}
