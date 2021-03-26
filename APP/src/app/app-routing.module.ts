import { BlogComment } from './shared/entities/blogComment.entity';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlogCommentComponent } from './home/comment/blogComment.component';
import { BlogCommentListComponent } from './home/comment-list/blogComment-list.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [

  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'blogComment', component: BlogCommentComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin'] } },
      { path: 'blogComment-list', component: BlogCommentListComponent }
    ]
  },

  { path: 'forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/user/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
