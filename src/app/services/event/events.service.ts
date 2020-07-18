import { Injectable ,EventEmitter} from '@angular/core';
// import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  upEvent = new EventEmitter<boolean>();

  constructor() { }

  sendMessage(data: boolean) {
    this.upEvent.emit(data);
  }
}
