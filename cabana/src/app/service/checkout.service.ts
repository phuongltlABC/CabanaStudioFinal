import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _currentStep = 1; // Bước mặc định là Cart

  get currentStep(): number {
    return this._currentStep;
  }

  nextStep(): void {
    if (this._currentStep < 3) {
      this._currentStep++;
    }
  }

  prevStep(): void {
    if (this._currentStep > 1) {
      this._currentStep--;
    }
  }
}
