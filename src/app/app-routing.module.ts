import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RucheComponent } from './ruche/ruche.component';
import { BenchmarkComponent } from './benchmark/benchmark.component'
import { SignupComponent } from './signup/signup.component'
import { AuthorizeGuard } from './guards/authorize.guard'
const routes: Routes = [{
  path:'login', component:LoginComponent
},
{
  path:'ruche', component:RucheComponent,canActivate: [AuthorizeGuard]
},
{
  path:'ruche/:id', component:BenchmarkComponent,canActivate: [AuthorizeGuard]
},
{
  path:'signup', component:SignupComponent
},
{
  path:'',redirectTo:'ruche',pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
