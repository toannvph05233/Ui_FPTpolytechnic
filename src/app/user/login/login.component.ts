import {Component, OnInit} from '@angular/core';
import {UserLogin} from '../../models/userLogin';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../Services/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UserToken} from '../../models/user-token';
import {first} from 'rxjs/operators';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // userLogin: UserLogin;
  // userToken: any;
  // username: string;
  // password: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  returnUrl: string;
  loading = false;
  submitted = false;
  currentUser: UserToken;
  hasRoleAdmin = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

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
          console.log('data');
          console.log(data);
          for (const role of roleList) {
            if (role.authority === 'ROLE_ADMIN') {
              this.returnUrl = '/admin';
            }else {
              this.returnUrl = '/index';
            }
          }

          this.router.navigate([this.returnUrl]);
          // this.router.navigate([this.returnUrl]).finally(() => {
          // });


          // $(function() {
          //   const Toast = Swal.mixin({
          //     toast: true,
          //     position: 'top-end',
          //     showConfirmButton: false,
          //     timer: 3000
          //   });
          //
          //   Toast.fire({
          //     type: 'success',
          //     title: 'Đăng nhập thành công'
          //   });
          // });
          // },
          // () => {
          //   this.loading = false;
          //   $(function() {
          //     const Toast = Swal.mixin({
          //       toast: true,
          //       position: 'top-end',
          //       showConfirmButton: false,
          //       timer: 3000
          //     });
          //
          //     Toast.fire({
          //       type: 'error',
          //       title: 'Đăng nhập thất bại'
          //     });
          //   });
          // });
        })
  }


// submitLogin(): void {
//   // console.log('this.userLogin');
//   console.log(this.username);
//   console.log(this.password);
//   const userLogin = {username: this.username, password: this.password};
//   console.log('this.userLogin');
//   console.log(userLogin);
//   const url = 'http://localhost:8080/login';
//   this.http.post(url, userLogin).subscribe((resJson) => {
//     this.userToken = resJson;
//     console.log('this.listPost');
//     console.log(resJson);
//     console.log(this.userToken);
//
//   });
}
