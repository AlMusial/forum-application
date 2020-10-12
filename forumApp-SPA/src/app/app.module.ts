import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { ThreadComponent } from './threads/thread/thread.component';
import { ThreadCardComponent } from './threads/thread-card/thread-card.component';
import { ThreadSiteComponent } from './threads/thread-site/thread-site.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import { ProfileEditComponent } from './profiles/profile-edit/profile-edit.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AlertifyService } from './services/alertify.service';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { ThreadService } from './services/thread.service';
import { ProfileDetailResolver } from './resolvers/profile-detail.resolver';
import { ThreadDetailResolver } from './resolvers/thread-detail.resolver';
import { ThreadListResolver } from './resolvers/thread-list.resolver';
import { ProfileEditResolver } from './resolvers/profile-edit.resolver';
import { PreventUnsaved } from './guards/prevent-unsaved.guard';
import { AddCommentComponent } from './threads/add-comment/add-comment.component';
import { CommentComponent } from './threads/comment/comment.component';
import { AddThreadComponent } from './threads/add-thread/add-thread.component';
import { PhotoComponent } from './profiles/photo/photo.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ThreadComponent,
      FavouriteComponent,
      MessagesComponent,
      ThreadCardComponent,
      ThreadSiteComponent,
      ProfileComponent,
      ProfileEditComponent,
      AddCommentComponent,
      AddThreadComponent,
      CommentComponent,
      PhotoComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      AlertifyService,
      UserService,
      ThreadService,
      ErrorInterceptorProvider,
      AuthGuard,
      ProfileDetailResolver,
      ProfileEditResolver,
      ThreadDetailResolver,
      ThreadListResolver,
      PreventUnsaved
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
