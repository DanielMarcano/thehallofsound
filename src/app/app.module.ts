import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeDiscComponent } from './components/home-disc/home-disc.component';
import { HomeComponent } from './components/home/home.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { PanelComponent } from './components/panel/panel.component';

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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
