import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private notificationService: NotificationService) { }

  public ShowNotification() {
    debugger;
    this.notificationService.show({      
      content: "Your data has been saved. Time for tea!",
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'success', icon: true },
      closable: true
    });
  }

}
