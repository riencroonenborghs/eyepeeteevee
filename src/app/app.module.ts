import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DPlayerModule } from 'angular-dplayer';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';


import { PlaylistComponent } from './components/playlist/playlist.component';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DPlayerModule.forRoot({ // Global config
      autoplay: true      // All player can autoplay by default
    }),

    MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
