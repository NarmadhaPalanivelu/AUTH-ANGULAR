import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router, private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  
  login(dataset: any): Observable<any> {
    
    return this.http.get<Response>(
      `${this.baseUrl}/login`
      
    ).pipe(first(),map((data) => data))
  }

  // login(dataset: any): Observable<any> {
  //   console.log("DATA Set", dataset)
  //   return this.http.get<Response>(`${this.baseUrl}/login`, {
  //       ...dataset,
  //     })
  //     .pipe(
  //       first(),
  //       map((data) => {
  //         console.log("Final Data",data)
  //         return data
  //       })
  //     );
  // }
 }
