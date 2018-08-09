import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalHomeRoutingModule } from './portal-home-routing.module';
import { PortalHomeComponent } from './portal-home.component';
import { PortalLeftComponent } from './portal-left/portal-left.component';
import { PortalTopComponent } from './portal-top/portal-top.component';
import { PortalRightComponent } from './portal-right/portal-right.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    PortalHomeRoutingModule
  ],
  declarations: [PortalHomeComponent, PortalLeftComponent, PortalTopComponent, PortalRightComponent,DashboardComponent]
})
export class PortalHomeModule { }
