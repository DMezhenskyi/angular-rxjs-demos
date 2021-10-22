import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { DurumService } from "./durum.service";

@Component({
  selector: "app-root",
  template: `
    <button (click)="order.next({ id: 1 })">Client 1 orders</button>
    <button (click)="order.next({ id: 2 })">Client 2 orders</button>
    <button (click)="order.next({ id: 3 })">Client 3 orders</button>
  `,
})
export class AppComponent implements OnInit {
  order = new Subject<{ id: number }>();

  constructor(private durum: DurumService) {}

  ngOnInit(): void {
    this.order
      .pipe(
        tap((order) => console.log("order for user: ", order.id)),
        switchMap((user) => this.durum.makeDurum(user.id))
      )
      .subscribe(console.log);
  }
}
