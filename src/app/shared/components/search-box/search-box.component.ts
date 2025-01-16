import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debounser: Subject<string> = new Subject<string>;
  private debuncerSuscription?: Subscription;

  @ViewChild('searchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>;

  @Output()
  public onDebounce = new EventEmitter<string>;

  ngOnInit(): void {
    this.debuncerSuscription = this.debounser
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.debuncerSuscription?.unsubscribe();
  }

  public emitValue( value: string) {
    this.onValue.emit(value);
  }

  public onKeyPress(serchTerm: string) {
    this.debounser.next(serchTerm);
  }
}
