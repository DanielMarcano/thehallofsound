import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-disc',
  templateUrl: './home-disc.component.html',
  styleUrls: ['./home-disc.component.scss'],
})
export class HomeDiscComponent implements OnInit {
  @Input() color: 'first' | 'second' | 'third';
  @Input() text: string;
  @Input() link: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.color = 'first';
    this.text = '';
    this.link = '';
  }

  ngOnInit(): void {}

  onClick(): void {
    this.router.navigate([this.link]);
  }
}