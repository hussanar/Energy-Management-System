import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit {


  ngOnInit(): void {
  }
  formGroup: FormGroup;
  dataRecord: any = {
    data: {
      name: '',
      useage: '',
      date: '',
      cooling: '',
      gardening: '',
      type: 'water'
    }
  }
  alluser: any;
  alluserData: any;
  allbooks: any;

  constructor(private fb: FormBuilder, private api: ApiService, private data: DataService) {
    this.formGroup = this.fb.group({
      name: [this.dataRecord.name, Validators.required],
      useage: [this.dataRecord.useage, Validators.required],
      date: [this.dataRecord.date, Validators.required],
      cooling: [this.dataRecord.cooling, Validators.required],
      gardening: [this.dataRecord.gardening, Validators.required],
      type: [this.dataRecord.type]
    })
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
  getData() {
    this.api.get('energy-management-login').subscribe((Response: any) => {
      console.log(Response);
      this.alluser = Response.rows;
      this.alluserData = this.alluser.map((x: any) => x.doc);
      console.log(this.alluserData)
    });
  }


  view(id: any) {
    console.log(id)
    alert('viewed' + id)

  }
}



