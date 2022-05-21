import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  temp: any = [];

  variable: any;
  alluser: any;
  alluserData: any = [];
  activeindex: any;
  home: any;
  title: string | undefined;
  value: any;
  constructor(public api: ApiService, private data: DataService, private router: Router) { }
  ngOnInit(): void {
    this.temp = this.data.pusharray
    console.log(this.temp[0])
    for (let user of this.alluserData) {
      console.log(this.temp[user].email);
    }



  }

  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
      this.refresh();
    })

  }

  view1(obj: any) {
    this.router.navigate(['view1comp']);
    this.data.getDataById('energy-management-login/', obj).subscribe(res => {
      console.log(res);
      this.data.save(res);
      alert('get data successfully');
    }, rej => {
      alert('sorry Cant Get the Object')
    }
    );


  }
  refresh(): void {
    window.location.reload();
  }

  //user.email,user.lastName,user.mobile,user.password,user._id
  edit(user: Object) {
    //console.log(user.temp[0]);

  }

}
