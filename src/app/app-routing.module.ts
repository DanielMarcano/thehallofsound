import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { AlbumInfoComponent } from './components/album-info/album-info.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { EditAlbumComponent } from './components/edit-album/edit-album.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'albums', component: AlbumListComponent },
  { path: 'albums/:id', component: AlbumInfoComponent },
  { path: 'album/:id', component: EditAlbumComponent },
  { path: 'add-album', component: AddAlbumComponent },
  { path: 'add-artist', component: AddArtistComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
