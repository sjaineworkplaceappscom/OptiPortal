import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
}) 
export class ToastService {

  constructor(private notificationService: NotificationService) { }
  hideAfter:number=2000;

  public showSuccess(message:string){
    
    this.notificationService.show({      
      content: message,
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style: 'success', icon: true },
      closable: false,
      hideAfter: this.hideAfter
    });
  } 

  public showError(message:string){
    this.notificationService.show({      
      content: message,
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'error', icon: true },
      closable: false,
      hideAfter: this.hideAfter
    });
  } 

  public showInfo(message:string){
    this.notificationService.show({      
      content: message,
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'info', icon: true },
      closable: false,
      hideAfter: this.hideAfter

    });
  } 



}
