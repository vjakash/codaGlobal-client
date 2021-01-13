import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { NewsfeedGuard } from './newsfeed.guard';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [{
  path:'',
  component:LoginComponent,
  canActivate:[LoginGuard]
},{
  path:'register',
  component:RegisterComponent
},{
  path:'newsfeed',
  component:DashboardComponent,
  canActivate:[NewsfeedGuard],
  children:[{
    path:'',
    component:NewsfeedComponent,
  },{
    path:'search/:term',
    component:SearchComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
