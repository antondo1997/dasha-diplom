import {Component} from '@angular/core';
import {AuthService} from './shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dasha-diplom';

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/', 'login']);
  }
}
