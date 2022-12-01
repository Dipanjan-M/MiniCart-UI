import { Component, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  options: AnimationOptions = {
    path: '/assets/lottie-assets/71390-shopping-cart-loader.json'
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '100%',
    margin: '0 auto'
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
