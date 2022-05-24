import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';




@Component({
  selector: 'app-view-gas',
  templateUrl: './view-gas.component.html',
  styleUrls: ['./view-gas.component.css']
})
export class ViewGasComponent implements OnInit {
  temp: any;

  constructor(private router: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      console.log(params);
      console.log(params.data)
      this.data.getDataById('energy-management-login', params.data).subscribe(Response => {
        this.temp = Response
        console.log(this.temp);
        console.log(this.temp.cooling)
        alert('get data successfully');
      }, rej => {
        alert('sorry Cant Get the Object')
      }
      );

    })
    this.temp = this.data.pusharray;
    console.log(this.temp)
  }

}
