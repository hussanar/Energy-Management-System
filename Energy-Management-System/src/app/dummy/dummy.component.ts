import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  temp: any;
  variable: any;

  constructor(private api: ApiService, private data: DataService) { }

  ngOnInit(): void {
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
}
