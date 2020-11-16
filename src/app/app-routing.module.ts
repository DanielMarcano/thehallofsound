import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'add-album', component: AddAlbumComponent },
  { path: 'add-artist', component: AddArtistComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
