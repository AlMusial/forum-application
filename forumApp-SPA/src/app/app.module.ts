import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

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
import { UserDetailResolver } from './resolvers/user-detail.resolver';
import { ThreadDetailResolver } from './resolvers/thread-detail.resolver';
import { ThreadListResolver } from './resolvers/thread-list.resolver';

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
      ProfileEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
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
      UserDetailResolver,
      ThreadDetailResolver,
      ThreadListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
