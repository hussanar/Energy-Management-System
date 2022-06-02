import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-gas-view-table',
  templateUrl: './gas-view-table.component.html',
  styleUrls: ['./gas-view-table.component.css']
})
export class GasViewTableComponent implements OnInit {
  arrayVal: any;
  value: any;
  id: any;
  tempr: any;
  localObject: any;
  isDisabled: boolean | undefined
  term!: string

  constructor(private api: ApiService, private router: Router, private data: DataService, private alert: NotificationService) { }
  fileName = 'ExcelSheet.xlsx'
  ngOnInit(): void {
    this.localObject = localStorage.getItem("userdetails")
    console.log(this.localObject)
    this.isDisabled = true
    this.getDataByUser("gas")
  }

  getDataByUser(type: any) {
    let fields: Array<string> = ["_id", "name", "useage", "food", "power", "heateing", "vehical", "_rev", "date", "user"]
    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)

    this.data.getByTypedUser(type, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      console.log(this.arrayVal)
      if (this.arrayVal.length != 0) {
        this.isDisabled = false;
      }
    }, err => { console.log(err) })
  }
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);

  }
  nanvigateHome() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.localObject } })
  }
  nanvigateback() {
    this.router.navigate(['gas'], { queryParams: { data: this.localObject } })
  }

  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
      this.alert.showInfo("Data Deleted successfully", "Data Deleted")
      this.getDataByUser("gas")
    }, rej => {
      this.alert.showError("cant Delete", "can't delete")
    })

  }

  view(obj: any) {
    this.router.navigate(['gasView'], { queryParams: { data: obj } });
    this.data.getDataById('energy-management-login', obj).subscribe(Response => {
      this.tempr = Response
      console.log(Response);
      this.data.save(this.tempr);
      this.alert.showSuccess("get data successfully", "Success")
    }, rej => {
      this.alert.showError("sorry Cant Get the Object", "Error")
    }
    );
  }
}
