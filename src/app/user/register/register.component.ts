import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Post} from "../../models/post";
import {HttpClient} from "@angular/common/http";
import {UserToken} from "../../models/user-token";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('uploadFile', { static: true }) public avatarDom: ElementRef | undefined;
  arrayPicture = 'https://firebasestorage.googleapis.com/v0/b/upload-file-project-id.appspot.com/o/avata1.jpeg?alt=media&token=be43046f-a7ee-4f57-92a5-de9129e2cb27';
  selectedImage: any = null;
  currentUser: UserToken;


  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl(''),
    phone: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private storage: AngularFireStorage,private http: HttpClient) { }

  ngOnInit(): void {
  }

  register(){
    let user = {
      username : this.registerForm.value.userName,
      password : this.registerForm.value.password,
      firstName : this.registerForm.value.firstName,
      lastName : this.registerForm.value.lastName,
      email : this.registerForm.value.email,
      phoneNumber : this.registerForm.value.phone,
      gender : this.registerForm.value.gender,
      imageUrls : this.arrayPicture
    }
    console.log(user);
    const url = 'http://localhost:8080/register';
    this.http.post<UserToken>(url, user).subscribe((resJson) => {
      this.currentUser = resJson;
      alert("register thanh cong")
    });
  }

  submit() {
    if (this.selectedImage != null) {
      const filePath=this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {this.arrayPicture = url;
          console.log(url);
          alert("upload ảnh thành công")})))
      ).subscribe();
    }
  }

  uploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }
}
