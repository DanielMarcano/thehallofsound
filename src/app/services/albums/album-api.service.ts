import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Album } from './album-api-model';

export interface SavedAlbum extends Album {
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlbumApiService {
  constructor(private http: HttpClient) {}

  private url = 'https://api.imgur.com/3/image';
  private clientId = 'b258e79ed513678';

  albumBaseUrl = 'http://localhost:3000/album';
  albumsBaseUrl = 'http://localhost:3000/albums';

  imageLink: any;

  async uploadImage(imageFile: File, infoObject: any): Promise<any> {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);

    const header = new HttpHeaders({
      authorization: 'Client-ID ' + this.clientId,
    });

    const imageData: any = await this.http
      .post(this.url, formData, { headers: header })
      .toPromise();

    this.imageLink = imageData?.data.link;

    return this.imageLink;
  }

  async addAlbum(album: Album): Promise<Observable<any>> {
    if (album.coverUrl) {
      await this.uploadImage(album.coverUrl as File, {});
    }

    album.coverUrl = this.imageLink;

    return this.http.post<Album>(this.albumBaseUrl, album).pipe(
      catchError((err: HttpErrorResponse) => {
        let response = null;

        if (err?.error) {
          response = 'The album could not be saved. Please try again.';
        }

        if (
          err?.error?.error.includes(
            'The album could not be created. MongoError: E11000 duplicate key error collection: kenjo-cd-collection.albums index: title_1 dup key: { title:'
          )
        ) {
          response =
            'The title of the album already exists in our app, please try a different one.';
        }

        return throwError({ error: response });
      })
    );
  }

  addAlbums(albums: Album[]): Observable<Album[]> {
    return this.http.post<Album[]>(this.albumsBaseUrl, albums);
  }

  getAlbum(id: string): Observable<SavedAlbum | { error: string | null }> {
    return this.http.get<SavedAlbum>(`${this.albumBaseUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        let response = null;

        if (err?.error) {
          response =
            'The album was not found. You were redirected to the list!';
        }

        return throwError({ error: response });
      })
    );
  }

  getAlbums(): Observable<SavedAlbum[]> {
    return this.http.get<SavedAlbum[]>(`${this.albumsBaseUrl}/all`);
  }

  async updateAlbum(album: SavedAlbum): Promise<Observable<any>> {
    if (album.coverUrl && typeof album.coverUrl !== 'string') {
      await this.uploadImage(album.coverUrl as File, {});
    }

    album.coverUrl = this.imageLink;

    return this.http.put<SavedAlbum>(
      `${this.albumBaseUrl}/${album._id}`,
      album
    );
  }

  deleteAlbum(id?: string): Observable<SavedAlbum> {
    return this.http.delete<SavedAlbum>(`${this.albumBaseUrl}/${id}`);
  }
}
