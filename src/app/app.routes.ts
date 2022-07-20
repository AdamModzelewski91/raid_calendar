import { RouterModule, Routes } from "@angular/router";
import { CreateRaidsComponent } from "./components/create-raids/create-raids.component";
import { FormComponent } from "./components/form/form.component";
import { RaidsViewComponent } from "./components/raids-view/raids-view.component";

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'raids-view', component: RaidsViewComponent},
  {path: 'create-raids', component: CreateRaidsComponent},
];

export const routing = RouterModule.forRoot(routes)