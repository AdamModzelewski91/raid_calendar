import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routes';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { RaidsViewComponent } from './components/raids-view/raids-view.component';
import { NavComponent } from './components/nav/nav.component';
import { FormService } from './service/form.service';
import { FilterPipe } from './components/raids-view/filter-pipe';
import { CreateRaidsComponent } from './components/create-raids/create-raids.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RaidsViewComponent,
    NavComponent,
    FilterPipe,
    CreateRaidsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    StoreModule.forRoot({}, {})
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
