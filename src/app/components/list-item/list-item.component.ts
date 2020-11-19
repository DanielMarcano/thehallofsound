import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavedAlbum } from '../../services/albums/album-api.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input()
  album: SavedAlbum | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openAlbum(): void {
    if (this.album?._id) {
      this.router.navigate([`/albums/${this.album._id}`]);
    }
  }
}
