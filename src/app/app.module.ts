import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { InputComponent } from './components/atoms/input/input.component';
import { DiscoverPageComponent } from './discover-page/discover-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviePosterComponent } from './components/molecules/movie-poster/movie-poster.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DetailsPageComponent,
    DiscoverPageComponent,
    InputComponent,
    MoviePosterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
