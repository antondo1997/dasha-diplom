import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/auth.service';
import {Router} from '@angular/router';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dasha-diplom';

  constructor(
    public auth: AuthService,
    private router: Router,
    private localeServer: BsLocaleService
  ) {
  }

  ngOnInit(): void {
    this.localeServer.use('ru');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/', 'login']);
  }
}
