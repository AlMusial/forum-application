import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { ErrorInterceptorProvider } from './services/error.interceptor';
=======
>>>>>>> 459758f815f73327b3b5bf0232ab875c1b84a886

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
<<<<<<< HEAD
      AuthService,
      ErrorInterceptorProvider
=======
      AuthService
>>>>>>> 459758f815f73327b3b5bf0232ab875c1b84a886
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
