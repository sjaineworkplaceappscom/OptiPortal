import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      },
      isolate:true
  }),        
  ],
  declarations: []
})
export class TranslateLazyModule {
  constructor(translate: TranslateService){
    let userLang: string = 'en';
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use(userLang);

    // Get Language from local storage
    let currentLang = 'en';
    translate.use(currentLang);
  }
 }
