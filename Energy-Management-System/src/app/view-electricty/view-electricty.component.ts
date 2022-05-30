import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { parseMessage } from '@angular/localize/src/utils';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-view-electricty',
  templateUrl: './view-electricty.component.html',
  styleUrls: ['./view-electricty.component.css']
})
export class ViewElectrictyComponent implements OnInit {
  temp: any;
  localObject: any;
  id: any;

  constructor(private acrouter: ActivatedRoute, private data: DataService, private router: Router, private alert: NotificationService) { }

  ngOnInit(): void {
    this.localObject = localStorage.getItem('userDetail')
    this.acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      console.log(params.data)
      this.id = params.data
      this.data.getDataById('energy-management-login', params.data).subscribe(Response => {
        this.temp = Response
        console.log(this.temp);
        console.log(this.temp.cooling)
        this.alert.showSuccess("get data successfully", "Success")


      }, rej => {
        this.alert.showError("sorry Cant Get the Object", "Error")
      }
      );

    })
    this.temp = this.data.pusharray;
    console.log(this.temp)
  }
  nanvigateHome() {
    this.router.navigate(['dashboard'], { queryParams: { data: this.id } })
  }
  nanvigateback() {
    this.router.navigate(['ele'], { queryParams: { data: this.id } })
  }
}
