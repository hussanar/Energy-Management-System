import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-addentry',
  templateUrl: './addentry.component.html',
  styleUrls: ['./addentry.component.css']
})
export class AddentryComponent implements OnInit {


  constructor(private data: DataService) {

  }

  ngOnInit(): void {
  }

}
