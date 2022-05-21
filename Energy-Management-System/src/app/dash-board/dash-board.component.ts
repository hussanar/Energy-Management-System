import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ele() {
    this.router.navigate(['ele'])
  }
  water() {
    this.router.navigate(['water']);
  }
  gas() {
    this.router.navigate(['gas']);
  }
  renewable() {
    this.router.navigate(['renewable'])
  }
  adddata() {
    this.router.navigate(['adddata'])
  }
}
