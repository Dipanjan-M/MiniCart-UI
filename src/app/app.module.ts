import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyMaterialModule } from './myModules/my-material/my-material.module';
import { MyBootstrapModule } from './myModules/my-bootstrap/my-bootstrap.module';
import { CustomLottiePlayerModule } from './myModules/custom-lottie-player/custom-lottie-player.module';

import { AppComponent } from './app.component';
import { routingComponents as RoutingComponents } from './app-routing.module';
import { LeftnavComponent } from './components/common/leftnav/leftnav.component';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    LeftnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    CustomLottiePlayerModule,
    MyBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
