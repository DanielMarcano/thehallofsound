import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  @Input() title: string;

  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';

  constructor() {
    this.title = '';
  }

  ngOnInit(): void {}
}
