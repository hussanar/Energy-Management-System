import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-edit-from',
  templateUrl: './edit-from.component.html',
  styleUrls: ['./edit-from.component.css']
})
export class EditFromComponent implements OnInit {



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
  constructor(private fb: FormBuilder, private api: ApiService, private router: ActivatedRoute, private data: DataService, private http: HttpClient) {
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
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.data.getDataById('energy-management-login', params.data).subscribe(res => {
        console.log(res)
      })
    })
  }
  storing(obj: any) {

  }

}
