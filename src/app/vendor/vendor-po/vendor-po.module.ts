import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPoHeaderComponent } from './vendor-po-header/vendor-po-header.component';
import { VendorPoAttchmentsComponent } from './vendor-po-attchments/vendor-po-attchments.component';
import { VendorPoListComponent } from './vendor-po-list/vendor-po-list.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { VendorPoDetailComponent } from './vendor-po-detail/vendor-po-detail.component';
import { VendorPoContentComponent } from './vendor-po-content/vendor-po-content.component';
import { VendorPoNotesComponent } from './vendor-po-notes/vendor-po-notes.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { VendorPouListComponent } from './vendor-pou-list/vendor-pou-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  { path: '', redirectTo:'vpoulist', pathMatch:'full'  },
  {path: 'vpoulist', component: VendorPouListComponent},
  {path: 'vpolist', component: VendorPoListComponent}
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  declarations: [ VendorPoHeaderComponent, VendorPoAttchmentsComponent,VendorPoListComponent, VendorPoDetailComponent, VendorPoContentComponent, VendorPoNotesComponent, VendorPouListComponent],
  exports:[VendorPoListComponent, VendorPoDetailComponent]
})
export class VendorPoModule { }
