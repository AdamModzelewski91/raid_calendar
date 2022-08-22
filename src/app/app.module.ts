import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { RaidsViewComponent } from './components/raids-view/raids-view.component';
import { NavComponent } from './components/nav/nav.component';
import { FormService } from './service/form.service';
import { FilterPipe } from './components/raids-view/filter-pipe';
import { CreateRaidsComponent } from './components/create-raids/create-raids.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule} from '@angular/cdk/drag-drop'


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
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    routing,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    ReactiveFormsModule, NgbModule,
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
