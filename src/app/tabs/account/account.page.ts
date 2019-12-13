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
    this.auth.authenticated.subscribe(res => {
      this.loggedIn = res;
      if (this.loggedIn) {
        this.updateUser();
      }
    })
  }

  async updateUser() {
    this.userDetails = await this.auth.getUserDetails();
  }

  async signIn() {
    await this.auth.signIn();
    await this.updateUser();
  }

  async signOut() {
    await this.auth.signOut();
  }
}
