import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { TrackingService } from './shared/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;

  constructor(
    private _platform: Platform,
    private _authService: AuthService,
    private _router: Router,
    private _ga: TrackingService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
    this._ga.initializeAnalytics();
  }

  ngOnInit() {
    this.authSub = this._authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this._router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
  }

  onLogout() {
    this._authService.logout();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
