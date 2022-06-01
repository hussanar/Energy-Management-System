import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Energy-Management-System';

  constructor(private router: Router) {
    const userData = localStorage.getItem('userData')
    if (userData) {
      router.navigate(['dashboard']);
    }
  }
}
