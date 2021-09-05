import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  search = false;

  constructor() { }

  ngOnInit(): void {
  }

  clearSearch() {
    this.search = !this.search;
  }

}
