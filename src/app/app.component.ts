import { Component, OnInit } from "@angular/core";
import { Observable, Subject, zip } from "rxjs";
import { map, mergeMap, switchMap, take, tap } from "rxjs/operators";

type Durum = ["flat bread", "meat", "sauce", "tomato", "cabbage"];
interface Order {
  amount: number;
  customerId: number;
}
interface Product {
  product: Durum;
  customerId: number;
}

let flatBreadCounter = 0;
let meatCounter = 0;
let sauceCounter = 0;
let tomatoCounter = 0;
let cabbageCounter = 0;
let customerId = 0;
@Component({
  selector: "app-root",
  template: `
    <button (click)="dispatchOrder()">Order Durum</button>
    <hr />
    <button (click)="_flatBread.next('flat bread')">Add Flat Bread</button>
    <button (click)="_meat.next('meat')">Add Meat</button>
    <button (click)="_souse.next('sauce')">Add Souse</button>
    <button (click)="_tomato.next('tomato')">Add Tomato</button>
    <button (click)="_cabbage.next('cabbage')">Add Cabbage</button>
    <ng-container *ngIf="delivery$ | async as product">
      <section *ngIf="product?.product">
        <h4>Enjoy</h4>
        <img src="assets/durum.jpeg" alt="" width="400" />

        <h5>Ingredients:</h5>
        <pre>{{ product | json }}</pre>
      </section>
    </ng-container>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  durum$: Observable<Durum>;
  delivery$: Observable<Product>;

  _order = new Subject<Order>();
  _flatBread = new Subject<"flat bread">();
  _meat = new Subject<"meat">();
  _souse = new Subject<"sauce">();
  _tomato = new Subject<"tomato">();
  _cabbage = new Subject<"cabbage">();

  ngOnInit(): void {
    this.durum$ = zip(
      this._flatBread.pipe(
        map((ing) => `${ing}${++flatBreadCounter}`),
        tap(console.log)
      ),
      this._meat.pipe(
        map((ing) => `${ing}${++meatCounter}`),
        tap(console.log)
      ),
      this._souse.pipe(
        map((ing) => `${ing}${++sauceCounter}`),
        tap(console.log)
      ),
      this._tomato.pipe(
        map((ing) => `${ing}${++tomatoCounter}`),
        tap(console.log)
      ),
      this._cabbage.pipe(
        map((ing) => `${ing}${++cabbageCounter}`),
        tap(console.log)
      )
    ).pipe(tap((durum) => console.log("Enjoy!", durum)));

    this.delivery$ = this._order.pipe(
      tap((order) => console.log("New Order: ", order)),
      switchMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map((durum) => ({ product: durum, customerId }))
        )
      ),
      tap((product) => console.log("Delivered Product: ", product))
    );
  }
  dispatchOrder() {
    const amount = Math.floor(Math.random() * 3) + 1;
    ++customerId;
    this._order.next({ amount, customerId });
  }
}
