import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private notificationService: NotificationService) { }

  public ShowNotification(message = '', style: any = 'success') {
    debugger;
    this.notificationService.show({      
      content: "hi",
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'left', vertical: 'top' },
      type: { style: 'success', icon: true },
      closable: true
    });
  }

}
