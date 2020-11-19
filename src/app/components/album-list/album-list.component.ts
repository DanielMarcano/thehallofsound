import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AlbumApiService,
  SavedAlbum,
} from '../../services/albums/album-api.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit {
  fetchedAlbums: Observable<SavedAlbum[]>;

  constructor(private albumApiService: AlbumApiService) {
    this.fetchedAlbums = this.albumApiService.getAlbums();
  }

  ngOnInit(): void {}
}
