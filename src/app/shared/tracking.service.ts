import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as firebase from 'firebase/app';
import 'firebase/analytics';

@Injectable({ providedIn: 'root' })
export class TrackingService {
  analytics: firebase.analytics.Analytics;

  initializeAnalytics() {
    firebase.initializeApp(environment.firebaseConfig);
    this.analytics = firebase.analytics();
  }

  logEvent(eventName: string, eventParams?: { [key: string]: any }): void {
    this.analytics.logEvent(eventName, {
      ...eventParams,
      timeline:
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      host: location.host
    });
  }
}
