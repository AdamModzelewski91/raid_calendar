import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./component/form/form.component";
import { RaidsViewComponent } from "./component/raids-view/raids-view.component";

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'raids-view', component: RaidsViewComponent},
];

export const routing = RouterModule.forRoot(routes)