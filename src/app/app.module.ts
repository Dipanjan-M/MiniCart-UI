import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyMaterialModule } from './myModules/my-material/my-material.module';
import { MyBootstrapModule } from './myModules/my-bootstrap/my-bootstrap.module';
import { CustomLottiePlayerModule } from './myModules/custom-lottie-player/custom-lottie-player.module';

import { AppComponent } from './app.component';
import { routingComponents as RoutingComponents } from './app-routing.module';


import { AuthService } from './services/auth.service';
import { AuthGuard } from './utils/auth.guard';
import { ApiInterceptorService } from './utils/api-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    CustomLottiePlayerModule,
    MyBootstrapModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
