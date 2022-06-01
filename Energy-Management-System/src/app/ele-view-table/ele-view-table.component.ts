import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-ele-view-table',
  templateUrl: './ele-view-table.component.html',
  styleUrls: ['./ele-view-table.component.css']
})
export class EleViewTableComponent implements OnInit {
  term!: string
  tempr: any;
  arrayVal: any;
  value: any;
  id: any;
  fileName = 'ExcelSheet.xlsx'
  localObject: any;
  viewVal: any = [];
  sample: any;
  responseData: any;
  length: any;
  Excel: any;
  isDisabled: boolean | undefined

  constructor(private api: ApiService, private router: Router, private data: DataService, private acrouter: ActivatedRoute, private alert: NotificationService) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id)
      this.localObject = localStorage.getItem("userdetails")
      this.isDisabled = true
      this.getDataByUser('electricty')
    })
  }
  getDataByUser(type: any) {
    let userObject: any = localStorage.getItem('userData')
    this.localObject = localStorage.getItem("userdetails")
    console.log(this.localObject)
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)
    this.data.getByTypedUser(type, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs

      if (this.arrayVal.length != 0) {
        this.isDisabled = false;
      }
    }, err => {
      console.log(err)
      this.alert.showError("can't get Data", "can't Get");
    })


  }

  nanvigateHome() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.localObject } })
  }
  nanvigateback() {
    this.router.navigate(['ele'], { queryParams: { data: this.localObject } })
  }

  viewele(obj: any) {
    this.router.navigate(['eleView'], { queryParams: { data: obj } });
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

  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
      this.alert.showInfo("your Data Deleted Successfully", "Data Deleted")
    }, ref => {
      this.alert.showError("data Can't Be Deleted", "Cant Deleted")
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
