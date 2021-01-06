import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'books', component:BookListComponent
  },
  {
    path:'add_book', component:BookCreateComponent,canActivate:[AuthGuard]
  },
  {
    path:'books/:id', component:BookDetailsComponent
  },
  {
    path:'update_book', component:BookUpdateComponent
  },
  {
    path:'authors', component:AuthorListComponent
  },
  {
    path:'add_author', component:AuthorCreateComponent,canActivate:[AuthGuard]
  },
  {
    path:'authors/:id', component:AuthorDetailsComponent
  },
  {
    path:'update_author', component:AuthorUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
