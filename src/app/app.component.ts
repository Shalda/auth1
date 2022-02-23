import {Component, OnInit} from '@angular/core';
import {AzureAuthService} from 'ngx-bstal13';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App 1';
  loginStatus = false

  constructor(private auth: AzureAuthService, private _httpClient: HttpClient,) {
  }

  onLogin(): void {
    this.auth.logIn();
  }

  onLogout(): void {
    this.auth.logOut()
  }

  onHttpReq() {
    this._httpClient.get('https://httpbin.org/get').subscribe(
      response => console.log(response))
  }

  ngOnInit() {
    this.auth.getAuthStatus().subscribe(status => {
      this.loginStatus = status
    })
  }
}
