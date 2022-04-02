import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorldViewerComponent } from './world-viewer/world-viewer.component';
import { MapBuilderComponent } from './map-builder/map-builder.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SpellInventoryComponent } from './spell-inventory/spell-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldViewerComponent,
    MapBuilderComponent,
    InfoBoxComponent,
    InventoryComponent,
    SpellInventoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
