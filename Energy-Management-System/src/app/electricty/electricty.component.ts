import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { element } from 'protractor';

@Component({
  selector: 'app-electricty',
  templateUrl: './electricty.component.html',
  styleUrls: ['./electricty.component.css']
})
export class ElectrictyComponent implements OnInit {
  response: any | undefined;
  typedData: any;
  fileName = 'ExcelSheet.xlsx'
  totalUseage: any | undefined
  tempr: any;
  total: any;

  ngOnInit(): void {
  }
  formGroup: FormGroup;
  empRecord: any = {
    name: '',
    useage: '',
    date: '',
    cooling: '',
    computer: '',
    type: 'electricty'
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
      cooling: [this.empRecord.cooling],
      computer: [this.empRecord.computer],
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
  get computer() {
    return this.formGroup.get('computer')!;
  }
  // get type() {
  //   return this.formGroup.get('type')!;
  // }
  storing(doc: any) {
    console.log(doc);

    this.api.add("energy-management-login", this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      alert("Your Data is stored Successfully");

    }, rejects => {
      alert("Sorry Can't post Data ")
    });


    // const database = updateObj.database;
    // const id = updateObj.id;
    // const rev = updateObj.rev;
    // const changedObj = updateObj.changedVal;
    // const url = this.url + database + '/' + id + "?rev=" + rev;
    // return this.http.put( updateObj,url)
    //this.api.adduser(formdata).subscribe(res => {
    //   console.log("data stored successfully");
    //   alert("data stored successfully");
    // }, err => {
    //   console.log("can not store data");
    // })
    // }
  }
  // getData() {
  //   this.api.get('energy-management-login').subscribe((Response: any) => {
  //     console.log(Response);
  //     this.alluser = Response.rows;
  //     this.alluserData = this.alluser.map((x: any) => x.doc);
  //     console.log(this.alluserData)
  //   });
  // }
  //   login(val: any) {
  //   console.log(val);
  //   this.router.navigate(['dashboard']);;
  //   this.email = val.email
  //   this.password = val.password
  //   this.type = val.type
  //   console.log(this.type)
  //   this.data.login(this.email, this.password, this.type).subscribe(res => {
  //     console.log(res);
  //     this.response = res;
  //     this.logindata = this.response.docs
  //     console.log(this.logindata);
  //     this.formGroup.markAsUntouched();
  //   })
  // }
  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
    })

  }
  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "computer", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);
      this.formGroup.markAsUntouched();
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.computer) + parseInt(element.useage)
        console.log(this.typedData)
      });
      this.total = Number(this.typedData[1].useage) + Number(this.typedData[1].cooling) + Number(this.typedData[1].computer)
      console.log(this.total)


      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)
      }
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.computer) + parseInt(element.useage)
        console.log(this.typedData)

        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].computer)

      });
      var result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(result)
      console.log(typeof (result))
    })
  }
  viewele(obj: any) {
    this.router.navigate(['eleView'], { queryParams: { data: obj } });
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
