import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userDetails$: Observable<User>;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.userDetails$ = this.authService.currentUser$;
  }

  async signIn() {
    await this.authService.signIn();
  }

  async signOut() {
    await this.authService.signOut();
  }
}
