import { Component } from '@angular/core';

import { Ng2Cable, Broadcaster } from 'ng2-cable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster) {
      this.ng2cable.subscribe('http://localhost:28080/chat', 'ChatChannel', { room: 'My room'});
      //By default event name is 'channel name'. But you can pass from backend field { action: 'MyEventName'}

      this.broadcaster.on<string>('ChatChannel').subscribe(
        message => {
          console.log(message);
        }
      );
    }
  }
