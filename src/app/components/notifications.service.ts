import { Injectable } from '@angular/core';

interface INotification {
  text: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notification: INotification | undefined;

  add(notification: INotification): void {
    this.notification = notification;

    setTimeout(() => {
      this.notification = undefined;
    }, 5000);
  }

  clear(): void {
    this.notification = undefined;
  }
}
