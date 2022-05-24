import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
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

  ngOnInit(): void {
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
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient) {
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
  // get type() {
  //   return this.formGroup.get('type')!;
  // }
  view(obj: any) {
    this.router.navigate(['gasView'], { queryParams: { data: obj } });
    this.data.getDataById('energy-management-login', obj).subscribe(Response => {
      this.tempr = Response
      console.log(Response);
      // this.temp=this.res.rows
      this.data.save(this.tempr);
      alert('get data successfully');
    }, rej => {
      alert('sorry Cant Get the Object')
    }
    );
  }

  storing(doc: any) {
    console.log(doc);

    this.api.add("energy-management-login", this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      alert("Your Data is stored Successfully");

    }, rejects => {
      alert("Sorry Can't post Data ")
    });
  }
  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
    })

  }
  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "food", "power", "heateing", "vehical", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.formGroup.markAsUntouched();

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