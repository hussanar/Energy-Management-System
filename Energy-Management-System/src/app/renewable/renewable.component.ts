import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-renewable',
  templateUrl: './renewable.component.html',
  styleUrls: ['./renewable.component.css']
})
export class RenewableComponent implements OnInit {
  id: any;
  type: string | undefined
  value: any;
  arrayVal: any;


  ngOnInit(): void {
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id)
    })
  }

  response: any | undefined;

  fileName = 'ExcelSheet.xlsx'
  totalUseage: any | undefined
  tempr: any;


  formGroup: FormGroup;
  empRecord: any = {
    name: '',
    solar: '',
    date: '',
    wind: '',
    hydro: '',
    nuclear: '',
    tidal: '',
    type: 'renewable'
  };
  alluser: any;
  alluserData: any;
  store: any = []
  fields: any = []
  obj: any;
  idValue: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private data: DataService, private http: HttpClient, private acrouter: ActivatedRoute, private alert: NotificationService) {
    this.formGroup = this.fb.group({
      name: [this.empRecord.name],
      solar: [this.empRecord.solar],
      date: [this.empRecord.date],
      wind: [this.empRecord.wind],
      hydro: [this.empRecord.hydro],
      nuclear: [this.empRecord.nuclear],
      tidal: [this.empRecord.tidal],
      type: [this.empRecord.type]
    });
  }

  get name() {
    return this.formGroup.get('name')!;
  }
  get solar() {
    return this.formGroup.get('solar')!;
  }
  get date() {
    return this.formGroup.get('date')!;
  }
  get wind() {
    return this.formGroup.get('wind')!;
  }
  get hydro() {
    return this.formGroup.get(' hydro')!;
  }
  get nuclear() {
    return this.formGroup.get('nuclear')!;
  }
  get tidal() {
    return this.formGroup.get('tidal')!;
  }

  storing(doc: any, id: any) {

    console.log(doc);
    doc['user'] = this.id;
    console.log(id)
    this.api.add("energy-management-login", this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      this.alert.showSuccess("Your Data is stored Successfully", "Success")
      console.log(doc)
      this.type = "gas"
      this.data.postByTypedUser(this.type, this.id).subscribe(res => {
        console.log(res)
        console.log(this.id)
      })

    }, _rejects => {
      this.alert.showError("Sorry Can't post Data", "Error")
    });


  }
  navigateToHme() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.id } })
  }
  getDataByUser(type: any) {

    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    console.log(user)
    this.data.getByTypedUser(type, this.id).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      console.log(this.arrayVal)
    }, err => { console.log(err) })
  }

  movetoTable() {
    this.router.navigate(['rennewabletable', { queryparam: { data: this.id } }])
  }

}
