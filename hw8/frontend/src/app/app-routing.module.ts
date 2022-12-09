import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchYelpComponent  } from "./search-yelp/search-yelp.component";
import { BookingsComponent } from "./bookings/bookings.component";
import {AppComponent} from './app.component'



const routes: Routes = [

  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchYelpComponent},
  { path: 'bookings', component: BookingsComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
