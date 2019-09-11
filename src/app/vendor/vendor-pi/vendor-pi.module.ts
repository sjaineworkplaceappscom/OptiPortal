import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPiListComponent } from './vendor-pi-list/vendor-pi-list.component';
import { VendorPiHeaderComponent } from './vendor-pi-header/vendor-pi-header.component';
import { VendorPiAttchmentsComponent } from './vendor-pi-attchments/vendor-pi-attchments.component';
import { VendorPiNotesComponent } from './vendor-pi-notes/vendor-pi-notes.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { VendorPiDetailComponent } from './vendor-pi-detail/vendor-pi-detail.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { VendorPiContentComponent } from './vendor-pi-content/vendor-pi-content.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

const routes: Routes = [
  { path: '',component: VendorPiListComponent  },
  {path: 'list', component: VendorPiListComponent}
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
  exports: [RouterModule,VendorPiListComponent,VendorPiDetailComponent],
  declarations: [VendorPiListComponent, VendorPiHeaderComponent, VendorPiAttchmentsComponent, VendorPiNotesComponent, VendorPiDetailComponent, VendorPiContentComponent]
})
export class VendorPiModule { }
