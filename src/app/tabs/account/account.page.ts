import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loggedIn: boolean;
  userDetails: User

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.state.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    })
  }

  async signIn() {
    await this.auth.signIn();
    this.userDetails = await this.auth.getUserDetails();
  }

  async signOut() {
    await this.auth.signOut();
  }
}
