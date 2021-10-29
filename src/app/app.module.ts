import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorldViewerComponent } from './world-viewer/world-viewer.component';
import { MaterialCollectsComponent } from './material-collects/material-collects.component';
import { AstralCollectsComponent } from './astral-collects/astral-collects.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldViewerComponent,
    MaterialCollectsComponent,
    AstralCollectsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
