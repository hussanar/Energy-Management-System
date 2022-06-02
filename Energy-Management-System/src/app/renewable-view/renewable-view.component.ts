import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-renewable-view',
  templateUrl: './renewable-view.component.html',
  styleUrls: ['./renewable-view.component.css']
})
export class RenewableViewComponent implements OnInit {
  temp: any;

  constructor(private router: ActivatedRoute, private data: DataService, private alert: NotificationService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      console.log(params);
      console.log(params.data)
      this.data.getDataById('energy-management-login', params.data).subscribe(Response => {
        this.temp = Response
        console.log(this.temp);
        this.alert.showSuccess("get data successfully", "Success")
      }, _rej => {
        this.alert.showError("Sorry Cant Get the Object", "Error")
      }
      );

    })
    this.temp = this.data.pusharray;
    console.log(this.temp)
  }
}


