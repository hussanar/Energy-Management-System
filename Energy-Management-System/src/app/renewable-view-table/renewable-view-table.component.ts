import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-renewable-view-table',
  templateUrl: './renewable-view-table.component.html',
  styleUrls: ['./renewable-view-table.component.css']
})
export class RenewableViewTableComponent implements OnInit {
  value: any;
  arrayVal: any;
  id: any;
  tempr: any;
  type: string | undefined
  fileName = 'ExcelSheet.xlsx'
  totalUseage: any;
  typedData: any;
  response: any;
  localObject: any;
  constructor(private data: DataService, private acrouter: ActivatedRoute, private router: Router, private alert: NotificationService) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res => {
      this.id = res.data
      this.localObject = localStorage.getItem("userdetails")
      console.log(this.localObject)
      this.type = "renewable"
      let fields: Array<string> = ["_id", "name", "solar", "wind", "hydro", "nuclear", "tidal", "_rev", "date", "user"]
      let userObject: any = localStorage.getItem('userData')
      let user = JSON.parse(userObject.toString())
      user['_id']
      console.log(user)
      this.data.getByTypedUser(this.type, fields, this.localObject).subscribe(res => {
        console.log(res)
        this.value = res;
        this.arrayVal = this.value.docs
        console.log(this.arrayVal)
      }, err => { console.log(err) })
    })
  }
  getDataByUser(type: any) {

  }
  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
    })

  }
  nanvigateHome() {
    this.router.navigate(['dashboard'])
  }
  nanvigateback() {
    this.router.navigate(['gas'])
  }
  view(obj: any) {
    this.router.navigate(['renewableView'], { queryParams: { data: obj } });
    this.data.getDataById('energy-management-login', obj).subscribe(Response => {
      this.tempr = Response
      console.log(Response);
      // this.temp=this.res.rows
      this.data.save(this.tempr);
      this.alert.showSuccess("get data successfully", "Success")
    }, rej => {
      this.alert.showError("sorry Cant Get the Object", "Error")
    }
    );
  }
  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "solar", "wind", "hydro", "nuclear", "tidal", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);

      for (let array of this.typedData) {

        this.totalUseage += array.useage
        console.log(`${this.totalUseage += parseInt(array.useage)}`)
      }
    })
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
}
