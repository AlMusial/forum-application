import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, (e: any) => {
    if (e) {
      okCallback();
    } else {}
  });
}

successMessage(message: string) {
  alertify.success(message);
}

errorMessage(message: string) {
  alertify.error(message);
}

warningMessage(message: string) {
  alertify.warning(message);
}

message(message: string) {
  alertify.message(message);
}

}
