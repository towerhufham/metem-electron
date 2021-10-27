import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WorldViewerComponent } from './world-viewer/world-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldViewerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
