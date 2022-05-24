import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';


@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit {
  response: any | undefined;
  typedData: any = [];
  fileName = 'ExcelSheet.xlsx'
  totalUseage: any | undefined
  tempr: Object | undefined

  ngOnInit(): void {
  }

  formGroup: FormGroup;
  empRecord: any = {
    name: '',
    useage: '',
    date: '',
    cooling: '',
    gardening: '',
    type: 'water'
  };
  total: any;
  alluser: any;
  alluserData: any;
  fields: any = []
  obj: any;
  idValue: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient) {
    this.formGroup = this.fb.group({
      name: [this.empRecord.name],
      useage: [this.empRecord.useage],
      date: [this.empRecord.date],
      cooling: [this.empRecord.cooling],
      gardening: [this.empRecord.gardening],
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
  get cooling() {
    return this.formGroup.get('cooling')!;
  }
  get gardening() {
    return this.formGroup.get('gadening')!;
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
  viewWater(obj: any) {
    this.router.navigate(['waterView'], { queryParams: { data: obj } });
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


  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.formGroup.markAsUntouched();
      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)
      }
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)

        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)

      });
      var result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(result)
    })
  }
  updateData(id: any) {
    console.log(id);
    this.router.navigate(['editform'], { queryParams: { data: id } });
    this.data.getDataById('energy-management-login', id).subscribe(res => {
      console.log(res)
    })
  }
  store() {
    this.data.store(this.total);
  }

  view(id: any) {
    console.log(id)
    alert('viewed' + id)

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



