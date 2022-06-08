import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  _id: any;
  rev: any;
  temp: any;
  type: any;
  constructor(private acrouter: ActivatedRoute, private data: DataService, private alert: NotificationService, private router: Router) { }
  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res => {
      console.log(res)
      this._id = res.data
      this.rev = res.rev
      this.data.getDataById("energy-management-login", this._id).subscribe(Response => {
        console.log(Response)
        this.temp = Response
        console.log(this.temp.name)
        console.log(this.formGroup)
        this.setValueToForm()
      })
    })
  }
  formGroup = new FormGroup({
    name: new FormControl(''),
    solar: new FormControl(''),
    date: new FormControl(''),
    wind: new FormControl(''),
    hydro: new FormControl(''),
    nuclear: new FormControl(''),
    tidal: new FormControl(''),

  });
  setValueToForm() {
    this.formGroup.setValue({ name: this.temp.name, date: this.temp.date, solar: this.temp.solar, wind: this.temp.wind, hydro: this.temp.hydro, nuclear: this.temp.nuclear, tidal: this.temp.tidal })
  }

  updateData(doc: any) {
    console.log(doc)
    this.type = "renewable"
    doc['type'] = this.type
    doc['user'] = localStorage.getItem('userdetails')
    this.data.updateDataUser(doc, this.temp._id, this.temp._rev).subscribe(result => {
      console.log(result)
      this.alert.showSuccess("Your Date edited successfully", "Edited Successfully ")
      this.router.navigate(['rennewabletable'], { queryParams: { data: localStorage.getItem('userdetails') } })
    }, _rej => {
      this.alert.showError("data cant be deleted", "Updation Failed")
    })

  }
}


