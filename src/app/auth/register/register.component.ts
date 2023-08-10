import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} 
from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, debounceTime, map, takeUntil } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  private destroy$=new Subject<void>()
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm?.valueChanges?.subscribe((data) => {
      if (data) {
        this.registerForm.updateValueAndValidity({
          onlySelf: false,
          emitEvent: true,
        });
      }
    });
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', [Validators.required]],
        email: ['', [Validators.required, this.customEmailValidator]],
        password: ['', [Validators.required, Validators.pattern('.{8,}')]], // condition to give password using 8+ characters not numbers
        mobile: [null, [Validators.required]],
      },
      {
        validators: [this.checkDuplicateData('email', 'mobile')],
      }
    );
  }
  allRecords: Array<any> = [];
  ngOnInit(): void {
    // this.getAllRecords();
    this.registerForm.reset();
  }
  //It is the condtion for the email (i.e.,)must contains @ and .com
  customEmailValidator(control: AbstractControl) {
    if (
      !control.value ||
      !control.value.endsWith('.com') ||
      !control.value.includes('@')
    ) {
      return { invalidEmail: true };
    }
    return null;
  }
  //this condition is used to check, while the user enter the same data to register
  checkDuplicateData(field1: string, field2: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const value1 = group.controls[field1].value;
      const value2 = group.controls[field2].value;

      if (value1 && value2 && this.checkIfDataExists(value1, value2)) {
        return { duplicateData: true };
      }

      return null;
    };
  }

  // condition to check with  the already given data or existing data
  checkIfDataExists(email: string, mobile: number): boolean {
    if(this.allRecords.length>0){
      console.log("hi");
      this.allRecords.forEach(element => {
        if(element.email === email && element.mobile === mobile){
          return new Error("This Data is already Exist")
        }else{
          return null
        }
      });
    }

    return false;
  }
  // getAllRecords = () => {
  //   // this.http.get<any>('http://localhost:3000/getData').subscribe((data) => {
  //   //   if (data) {
  //       // TODO
  //       // this.allRecords = {};
  //   //     console.log(data)
  //   //   }
  //   // });
  // };
  register(event:any) {
    if (event && this.registerForm.valid) {
      this.http
        .post<any>('http://localhost:3000/login', this.registerForm.value)
        // .pipe(debounceTime(100))
        .subscribe(
          (res) => {
            alert('Registered Successfully');
            this.registerForm.reset();
            this.router.navigate(['login']);
          },
          (err) => {
            console.log(err);
            alert('Something went wrong');
          }
        );
    } else {
      alert('Form not Valid!');
    }
  }
}
