import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { NotificationService } from '../notification.service';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-renewable-view-table',
  templateUrl: './renewable-view-table.component.html',
  styleUrls: ['./renewable-view-table.component.css']
})
export class RenewableViewTableComponent implements OnInit {
  term!: string
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
  reneewablelength: any;
  isDisabled: boolean | undefined
  constructor(private data: DataService, private acrouter: ActivatedRoute, private router: Router, private alert: NotificationService) { }

  ngOnInit(): void {
    this.getDataByUser();
    this.isDisabled = true;
  }
  getDataByUser() {
    this.acrouter.queryParams.subscribe(res => {
      this.id = res.data
      this.localObject = localStorage.getItem("userdetails")
      console.log(this.localObject)
      this.type = "renewable"

      let userObject: any = localStorage.getItem('userData')
      let user = JSON.parse(userObject.toString())
      console.log(user)
      this.data.getByTypedUser(this.type, this.localObject).subscribe(response => {
        console.log(response)
        this.value = response;
        this.arrayVal = this.value.docs
        console.log(this.arrayVal)
        this.reneewablelength = this.arrayVal.length
        console.log(this.reneewablelength)

        if (this.arrayVal.length != 0) {
          this.isDisabled = false;
        }
      }, err => { console.log(err) })
    })
  }

  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
      this.alert.showInfo("Your Data is Deleted Successfully", "Deleted");
      this.getDataByUser();
    }, _rej => {
      this.alert.showError("Data cant be Delete", "Can't deleted")
    })

  }
  nanvigateHome() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.localObject } })
  }
  nanvigateback() {
    this.router.navigate(['gas'], { queryParams: { data: this.localObject } })
  }
  view(obj: any) {
    this.router.navigate(['renewableView'], { queryParams: { data: obj } });
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

      }
    })
  }
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    ws['!cols'] = [];
    ws['!cols'][8] = { hidden: true };
    ws['!cols'][7] = { hidden: true };
    ws['!cols'][9] = { hidden: true };

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);

  }
  Update(id: any, rev: any) {
    this.router.navigate(['edit'], { queryParams: { data: id, rev } })
  }
}
