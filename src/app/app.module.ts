import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { FormComponent } from './component/form/form.component';
import { RaidsViewComponent } from './component/raids-view/raids-view.component';
import { NavComponent } from './component/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RaidsViewComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
