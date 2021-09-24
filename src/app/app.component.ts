
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import { tap } from 'rxjs/operators';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage'];
@Component({
  selector: 'app-root',
  template: `
    <button (click)="_flatBread.next('flat bread')">Add Flat Bread</button>
    <button (click)="_meat.next('meat')">Add Meat</button>
    <button (click)="_souse.next('sauce')">Add Souse</button>
    <button (click)="_tomato.next('tomato')">Add Tomato</button>
    <button (click)="_cabbage.next('cabbage')">Add Cabbage</button>
    <ng-container *ngIf="durum$ | async as durum">
      <section *ngIf="durum?.length > 0">
        <h4>Enjoy</h4>
        <img src="assets/durum.jpeg" alt="" width="400">

        <h5>Ingredients:</h5>
        <pre>{{ durum | json }}</pre>
      </section>
    </ng-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  durum$: Observable<Durum>;

  _flatBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _souse = new Subject<'sauce'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  ngOnInit(): void {
    this.durum$ = zip(
      this._flatBread,
      this._meat,
      this._souse,
      this._tomato,
      this._cabbage
    ).pipe(
      tap((durum) => console.log('Enjoy!', durum))
    );
  }
}
