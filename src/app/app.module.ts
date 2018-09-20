import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BullseyeComponent } from './components/bullseye/bullseye.component';

@NgModule({
  declarations: [
    AppComponent,
    BullseyeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
