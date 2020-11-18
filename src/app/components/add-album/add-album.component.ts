import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFormGroup } from '@rxweb/types';
import { Album } from '../../services/albums/album-api-model';
import { AlbumApiService } from '../../services/albums/album-api.service';
import { removeEmptyProps } from '../../utilities/utilities';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss'],
})
export class AddAlbumComponent implements OnInit {
  addAlbumForm: IFormGroup<Album>;

  public selectedFile = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private albumApiService: AlbumApiService,
    private notificationsService: NotificationsService
  ) {
    this.addAlbumForm = this.fb.group({
      title: ['', Validators.required],
      // artistId: [''],
      coverUrl: [''],
      year: [
        null,
        [Validators.maxLength(4), Validators.min(1909), Validators.max(2030)],
      ],
      genre: [''],
    }) as IFormGroup<Album>;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submit();
  }

  get title(): AbstractControl | null {
    return this.addAlbumForm.get('title');
  }

  get coverUrl(): AbstractControl | null {
    return this.addAlbumForm.get('coverUrl');
  }

  get year(): AbstractControl | null {
    return this.addAlbumForm.get('year');
  }

  get genre(): AbstractControl | null {
    return this.addAlbumForm.get('genre');
  }

  resetForm(): void {
    this.addAlbumForm.reset();
  }

  get untypedForm(): FormGroup {
    return this.addAlbumForm as FormGroup;
  }

  async submit(): Promise<any> {
    const parsedValue: Album = removeEmptyProps(this.addAlbumForm.value);

    const response = await this.albumApiService.addAlbum(parsedValue);

    response.subscribe((data: any) => {
      if (data.error) {
        this.notificationsService.add({
          type: 'error',
          text: data.error,
        });
      } else {
        this.notificationsService.add({
          type: 'success',
          text: 'The album was successfully saved!',
        });
        this.resetForm();
      }
    });
  }
}
