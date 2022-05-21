import { viewClassName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, Validator } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-addentry',
  templateUrl: './addentry.component.html',
  styleUrls: ['./addentry.component.css']
})
export class AddentryComponent implements OnInit {
  formGroup: FormGroup;
  dataRecord: any = {
    data: {
      name: '',
      gas: '',
      electricty: '',
      water: '',
      renewable: '',
      type: 'energy'
    }
  }
  alluser: any;
  alluserData: any;
  allbooks: any;

  constructor(private fb: FormBuilder, private api: ApiService, private data: DataService) {
    this.formGroup = this.fb.group({
      name: [this.dataRecord.name, Validators.required],
      gas: [this.dataRecord.gas, Validators.required],
      electricty: [this.dataRecord.electricty, Validators.required],
      water: [this.dataRecord.water, Validators.required],
      renewable: [this.dataRecord.renewable, Validators.required]
    })
  }

  ngOnInit(): void {
  }
  get name() {
    return this.formGroup.get('name')!;
  }
  get gas() {
    return this.formGroup.get('gas')!;
  }
  get electricty() {
    return this.formGroup.get('electricty')!;
  }
  get water() {
    return this.formGroup.get('water')!;
  }
  get renewable() {
    return this.formGroup.get('renewable')!;
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
  deleteuser(id: any) {
    console.log(id);
    this.data.BookDelete(id)
      .subscribe(book => {
        this.getsoftBooks();
        alert('deleted successfully')
      })
  }
  getsoftBooks() {
    this.allbooks = this.getData();
  }

  view() {

  }
}
