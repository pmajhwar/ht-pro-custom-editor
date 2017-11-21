import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HotTableModule } from 'angular-handsontable/index';
import { CustomEditorService } from './custom-editor.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HotTableModule
  ],
  providers: [CustomEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
