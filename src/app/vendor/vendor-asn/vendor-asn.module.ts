import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VasnListComponent } from './vasn-list/vasn-list.component';
import { VasnDetailComponent } from './vasn-detail/vasn-detail.component';
import { VasnHomeComponent } from './vasn-home/vasn-home.component';
import { VasnContentComponent } from './vasn-content/vasn-content.component';

import { VasnAttatchmentComponent } from './vasn-attatchment/vasn-attatchment.component';
import { VasnNotesComponent } from './vasn-notes/vasn-notes.component';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { VasnAddComponent } from './vasn-add/vasn-add.component';
import { VasnUpdateComponent } from './vasn-update/vasn-update.component';
import { HomeAddComponent } from './home-add/home-add.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FileDropModule } from 'ngx-file-drop';
import { VasnContentAddComponent } from './vasn-content-add/vasn-content-add.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


const routes: Routes = [
  { path: '',redirectTo:'vasnlist', pathMatch:'full'},
  {path: 'vasnlist', component: VasnListComponent}
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
    DateInputsModule,
    DateInputsModule,
    DropDownsModule,
    FileDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  declarations: [VasnListComponent, VasnDetailComponent, VasnHomeComponent, VasnContentComponent, VasnAttatchmentComponent, VasnNotesComponent, VasnAddComponent, VasnUpdateComponent, HomeAddComponent, VasnContentAddComponent],
  exports:[VasnListComponent, VasnDetailComponent, VasnHomeComponent, VasnContentComponent, VasnAttatchmentComponent, VasnNotesComponent, VasnAddComponent, VasnUpdateComponent, HomeAddComponent]
})
export class VendorAsnModule { }
