import { NgModule } from '@angular/core';

import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import player from 'lottie-web';


export function playerFactory() {
  return player;
}

const LottieThings = [
  LottieModule.forRoot({ player: playerFactory }),
  LottieCacheModule.forRoot()
];

@NgModule({
  imports: [LottieThings],
  exports: [LottieThings]
})
export class CustomLottiePlayerModule { }
