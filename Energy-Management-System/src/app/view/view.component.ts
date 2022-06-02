import { Component, OnInit } from '@angular/core';
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
  tempr: any;
  type: string | undefined
  response: any;
  typedData: any;
  constructor(public api: ApiService, private data: DataService, private router: Router) { }
  ngOnInit(): void {
    this.temp = this.data.pusharray
    console.log(this.temp[0])
    this.api.get("energy-management-login").subscribe(res => {
      this.alluser = res;
      this.alluser = this.alluser.rows;
      this.alluserData = this.alluser.map((el: any) => el.doc);
      console.log(this.alluserData[0]);
      this.api.array(this.alluserData);

      this.data.store(this.alluserData);
    }, rej => {
      alert("opps! Somthing went wrong" + rej);

    });


    this.type = "user"
    let fields: Array<string> = ["_id", "mobile", "email", "firstName", "lastName", "_rev", "password"]
    this.data.getByType(this.type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.docs
      console.log(this.typedData);


    })

  }

  deleteuser(id: any, datarev: any) {
    console.log(id);
    console.log(datarev)
    this.data.deleteData(id, datarev).subscribe(res => {
      console.log(res);
    })

  }

  view1(obj: any) {
    this.router.navigate(['view1comp'], { queryParams: { data: obj } });

    this.data.getDataById('energy-management-login', obj).subscribe(Response => {
      this.tempr = Response
      console.log(Response);
      this.data.save(this.tempr);
      alert('get data successfully');
    }, _rej => {
      alert('sorry Cant Get the Object')
    }
    );


  }
  refresh(): void {
    window.location.reload();
  }



}
