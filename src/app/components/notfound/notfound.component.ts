import { Component, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  options: AnimationOptions = {
    path: '/assets/lottie-assets/70383-page-not-found-error-404.json'
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '35%',
    margin: '0 auto'
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
