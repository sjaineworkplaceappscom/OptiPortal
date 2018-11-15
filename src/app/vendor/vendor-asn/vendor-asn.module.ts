import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VasnListComponent } from './vasn-list/vasn-list.component';
import { VasnDetailComponent } from './vasn-detail/vasn-detail.component';
import { VasnHomeComponent } from './vasn-home/vasn-home.component';
import { VasnContentComponent } from './vasn-content/vasn-content.component';

import { VasnAttatchmentComponent } from './vasn-attatchment/vasn-attatchment.component';
import { VasnNotesComponent } from './vasn-notes/vasn-notes.component';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';


const routes: Routes = [
  { path: '',component: VasnListComponent  },
  {path: 'list', component: VasnListComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [VasnListComponent, VasnDetailComponent, VasnHomeComponent, VasnContentComponent, VasnAttatchmentComponent, VasnNotesComponent]
})
export class VendorAsnModule { }
