import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormGroup } from '@rxweb/types';
import {
  AlbumApiService,
  SavedAlbum,
} from '../../services/albums/album-api.service';
import { removeEmptyProps } from '../../utilities/utilities';
import { NotificationsService } from '../notifications.service';
import { ReadonlyMode } from './../input-file-control/input-file-control.component';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss'],
})
export class EditAlbumComponent implements OnInit {
  editAlbumForm: IFormGroup<SavedAlbum>;

  album: SavedAlbum | undefined;

  loadingSave = false;

  public selectedFile = '';

  constructor(
    private fb: FormBuilder,
    private albumApiService: AlbumApiService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editAlbumForm = this.fb.group({
      _id: [null, Validators.required],
      title: [null, Validators.required],
      // artistId: [''],
      coverUrl: [null],
      year: [
        null,
        [Validators.maxLength(4), Validators.min(1909), Validators.max(2030)],
      ],
      genre: [null],
    }) as IFormGroup<SavedAlbum>;
  }

  ngOnInit(): void {
    this.getAlbum();
  }

  get albumCover(): ReadonlyMode | undefined {
    if (this.coverUrl !== undefined) {
      return {
        imgUrl: this?.coverUrl?.value,
        imgTitle: this?.title?.value,
      };
    }

    return;
  }

  getAlbum(): void {
    this.loadingSave = true;

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.albumApiService.getAlbum(id).subscribe((res: any) => {
        if (res?.error) {
          this.notificationsService.add({
            type: 'error',
            text:
              'The album could not be fetched. Please try reloading the page.',
          });
        } else {
          this.album = res;

          this.editAlbumForm.patchValue({
            _id: this.album?._id,
            title: this.album?.title,
            coverUrl: this.album?.coverUrl,
            year: this.album?.year,
            genre: this.album?.genre,
          });
        }

        this.loadingSave = false;
      });
    }
  }

  onDeleted(): void {
    this.editAlbumForm.patchValue({
      coverUrl: undefined,
    });
  }

  goBack(): void {
    this.router.navigate([`/albums/${this.album?._id}`]);
  }

  onSubmit(): void {
    this.submit();
  }

  get title(): AbstractControl | null {
    return this.editAlbumForm.get('title');
  }

  get coverUrl(): AbstractControl | null {
    return this.editAlbumForm.get('coverUrl');
  }

  get year(): AbstractControl | null {
    return this.editAlbumForm.get('year');
  }

  get genre(): AbstractControl | null {
    return this.editAlbumForm.get('genre');
  }

  get untypedForm(): FormGroup {
    return this.editAlbumForm as FormGroup;
  }

  goUp(): void {
    window.scroll(0, 0);
  }

  async submit(): Promise<any> {
    this.loadingSave = true;

    const parsedValue: SavedAlbum = removeEmptyProps(this.editAlbumForm.value);

    const response = await this.albumApiService.updateAlbum(parsedValue);

    response.subscribe(
      (data: any) => {
        this.notificationsService.add({
          type: 'success',
          text: 'The album was successfully updated!',
        });

        this.loadingSave = false;
      },
      () => {
        this.notificationsService.add({
          type: 'error',
          text: 'The album could not be updated. Please try again.',
        });

        this.loadingSave = false;
      }
    );
  }
}
