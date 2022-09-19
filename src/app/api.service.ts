import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJhNzE4ZWVkNy0zMzcwLTQ1YTMtOWE0Ni1jMjQ4M2U1MTkxYTQiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjM1NjIxMzAsImV4cCI6MTY2MzY0ODUzMCwiaWF0IjoxNjYzNTYyMTMwfQ.4XdlqdLYkcdXWOcoir8LZbSSuuMWP0uCCixCa5dD1IQ';

  constructor(private http: HttpClient) {}

  public postService(url: string, data: any) {
    const authValue = 'Bearer' + ' ' + this.token;

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: authValue,
      }),
    };

    let model: any;

    model = Object.assign({}, data);

    return this.http.post(url, model, httpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
