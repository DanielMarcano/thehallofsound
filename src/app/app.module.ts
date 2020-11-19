import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeDiscComponent } from './components/home-disc/home-disc.component';
import { HomeComponent } from './components/home/home.component';
import { InputControlModule } from './components/input-control/input-control.module';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { PanelComponent } from './components/panel/panel.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlbumInfoComponent } from './components/album-info/album-info.component';
import { EditAlbumComponent } from './components/edit-album/edit-album.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HomeDiscComponent,
    PageContainerComponent,
    PanelComponent,
    AddArtistComponent,
    AddAlbumComponent,
    NotificationsComponent,
    AlbumListComponent,
    ListItemComponent,
    NotFoundComponent,
    AlbumInfoComponent,
    EditAlbumComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InputControlModule,
  ],
  providers: [ErrorHandler],
  bootstrap: [AppComponent],
})
export class AppModule {}
