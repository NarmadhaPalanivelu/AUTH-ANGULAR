import { HttpClient } from '@angular/common/http';
import { compileInjectable } from '@angular/compiler';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { LoginService } from 'src/app/service/login.service';

 
@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {

  public loginForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private http: HttpClient,private router:Router,private _loginService:LoginService) { }

  ngOnInit() :void{

    this.loginForm = this.formBuilder.group({

      email:['',[Validators.required]],

      password:['',[Validators.required]]

    })

  }

  login(){
    console.log('A')
    this._loginService.login(this.loginForm.value).subscribe((data)=>{

      if(data.length>0){

        const user = data.find((a:any)=>{

             return a.email === this.loginForm.value.email &&  a.password  === this.loginForm.value.password

        });

        if(user){
          alert("you did it!");

          this.router.navigate(['/dashboard'])
        }

        else{

          alert("enter valid details")

        }
      }

      else{

        alert('data is not available')

      }

    })

    // this.http.get<any>("http://localhost:3000/login")

    // .subscribe(res=>{

    //   console.log(res)

    //   const user = res.find((a:any)=>{

    //     return a.email === this.loginForm.value.email &&  a.password  === this.loginForm.value.password

 

    //   });

    //   if(user){

    //     alert('login successfull');  

    //     this.router.navigate(['dashboard'])

    //   }

 

    // } ,err=>{

    //   console.log(err)

    //   alert("something went wrong!")

    // })

 

  }

 

}