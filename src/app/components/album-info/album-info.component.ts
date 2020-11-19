import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlbumApiService,
  SavedAlbum,
} from '../../services/albums/album-api.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.scss'],
})
export class AlbumInfoComponent implements OnInit {
  @Input()
  album: SavedAlbum | undefined;

  aboutToDelete: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumApiService: AlbumApiService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getAlbum();
  }

  delete(forceValue?: boolean): void {
    if (!this.aboutToDelete) {
      this.aboutToDelete = true;
      return;
    } else if (forceValue !== undefined) {
      this.aboutToDelete = forceValue;
      return;
    }

    this.albumApiService.deleteAlbum(this.album?._id).subscribe((_) => {
      this.notificationsService.add({
        type: 'success',
        text: `The album ${this.album?.title} was deleted. You were redirected to the list!`,
      });

      this.router.navigate([`/albums`]);
    });
  }

  editAlbum(): void {
    this.router.navigate([`/album/${this.album?._id}`]);
  }

  getAlbum(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.albumApiService.getAlbum(id).subscribe((res: any) => {
        if (res?.error) {
          this.notificationsService.add({
            type: 'error',
            text: res.error,
          });

          this.router.navigate([`/albums`]);
        } else {
          this.album = res;
        }
      });
    }
  }
}
