import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, delay, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DurumService {
  constructor(private http: HttpClient) {}

  makeDurum(customerId: number) {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/posts/${customerId}`)
      .pipe(
        map(() => ({ product: ["meat", "cabbage"], amount: 1 })),
        catchError(() => of({ product: ["meat", "cabbage"], amount: 1 }))
      );
  }
}
