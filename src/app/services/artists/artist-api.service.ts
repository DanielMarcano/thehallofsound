import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from './artist-api';

@Injectable({
  providedIn: 'root',
})
export class ArtistApiService {
  constructor(private http: HttpClient) {}

  artistBaseUrl = 'http://localhost:3000/artist';
  artistsBaseUrl = 'http://localhost:3000/artists';

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.artistBaseUrl, artist);
  }

  addArtists(artists: Artist[]): Observable<Artist[]> {
    return this.http.post<Artist[]>(this.artistsBaseUrl, artists);
  }

  getArtist(id?: string): Observable<Artist | Artist[]> {
    const url = id ? `${this.artistBaseUrl}/${id}` : this.artistsBaseUrl;
    return this.http.get<Artist>(url);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.artistBaseUrl}/${artist._id}`, artist);
  }

  deleteArtist(id?: string): Observable<Artist> {
    return this.http.delete<Artist>(`${this.artistBaseUrl}/${id}`);
  }
}
