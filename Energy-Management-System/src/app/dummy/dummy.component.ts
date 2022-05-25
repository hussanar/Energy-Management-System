import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  temp: any;
  variable: any;
  id: any;

  constructor(private api: ApiService, private data: DataService, private route: Router) { }

  ngOnInit(): void {
    this.postNullObj({ "val": "null" });

  }
  getnumber() {
    let db = 'hussain_new_db';
    this.data.getnumbers(db).subscribe((res => {
      console.log(res);
      this.temp = res;
      console.log(this.temp.rows.length);

      // this.variable = this.temp.map((x: any) => x.total_rows)
      // console.log(this.variable)

    }))


  }
  postNullObj(obj: any) {
    this.api.add("energy-management-login", obj).subscribe(res => {
      console.log(res);
      this.temp = res;
      this.id = this.temp.id
      console.log(this.id)
      // this.route.navigate(['water'], { queryParams: { data: this.id } })
      console.log(this.id)
    }, rejects => {
      console.log(rejects)
    })
  }
}
