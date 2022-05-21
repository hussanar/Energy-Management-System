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
  constructor(public api: ApiService, private data: DataService, private router: Router) { }
  ngOnInit(): void {
    this.temp = this.data.pusharray
    console.log(this.temp)
    for (let user of this.alluserData) {
      console.log(this.temp[user].email);
    }



  }
  view(id: any) {
    // this.router.navigate(['view'])
    this.data.getDocByIds("hussain_new_db", id).subscribe(res => {
      console.log(res);
      let temp = res;
      var record = [res];
      //console.log(record[0])
      alert("get the data successfully!");
      //  console.log(this.empRecord);
    }, rej => {
      alert("opps! Can not get data" + rej);
    });
  }
  deleteuser(id: any, datarev: any) {
    console.log(id);
    this.data.deleteData(id).subscribe(res => {
      console.log(res);
    })
    alert("pass the component")

  }
  view1(obj: any, index: any) {
    this.title = 'update';
    this.home = obj;
    this.activeindex = index;
  }


}
