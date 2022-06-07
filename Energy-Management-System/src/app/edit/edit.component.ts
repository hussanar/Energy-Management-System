import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private acrouter: ActivatedRoute, private data: DataService, private alert: NotificationService) { }
  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res => {
      console.log(res)
      this._id = res.data
      this.rev = res.rev
      this.data.getDataById("energy-management-login", this._id).subscribe(res => {
        console.log(res)
        this.temp = res
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

  updateData(doc: object) {
    this.data.updateData(this.temp, doc).subscribe(result => {
      console.log(result)
      this.alert.showSuccess("Your Date edited successfully", "Edited Successfully ")
    })

  }
}


