import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../Services/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UserToken} from '../../models/user-token';
import {first} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // userLogin: UserLogin;
  // userToken: any;
  // username: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  returnUrl: string;
  loading = false;
  submitted = false;
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {

    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_ADMIN') {
          this.hasRoleAdmin = true;
        }
      }
    }
    if (this.authenticationService.currentUserValue) {
      if (this.hasRoleAdmin) {
        this.router.navigate(['/admin']);
      } else {
        console.log('toan');
        // this.router.navigate(['/']);
      }
    }


  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';

  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          const roleList = data.roles;

          this.geoFindMe(data.id,this.http);

          console.log('data');
          console.log(data);
          for (const role of roleList) {
            if (role.authority === 'ROLE_ADMIN') {
              this.returnUrl = '/admin';
            } else {
              this.returnUrl = '/index';
            }
          }

          this.router.navigate([this.returnUrl]);
        });
  }

  geoFindMe(id,http) {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(longitude);
      console.log(latitude);
      let location = {
        latitude: latitude,
        longitude: longitude
      };

      const url = 'http://localhost:8080/location/updateLocation/' + id;
      http.post(url, location).subscribe((resJson) => {
        alert('update Location thành công');
      }, error => {
        alert('update Location lỗi');
      });

    }

    function error() {
      console.log('lỗi');
    }

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }

}
