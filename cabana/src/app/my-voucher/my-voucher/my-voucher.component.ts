import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-voucher',
  imports: [NgIf, NgFor],
  templateUrl: './my-voucher.component.html',
  styleUrl: './my-voucher.component.css'
})
export class MyVoucherComponent {
  myVouchers = [
    { discount: '5% OFF', condition: 'For Whole Order', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: '05/08/2024 - 09/08/2024 • All products • Can be combined with 20% off over 560.000 VND or 15% off over 289.000 VND' },
    { discount: '10% OFF', condition: 'For Order Over 300.000 VND', code: 'CODE_123skidof', left: '', details: '05/08/2024 - 09/08/2024 • All products • Can be combined with other promotions' },
    { discount: '40.000 VND OFF', condition: 'For Third Order Over 500.000 VND', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Valid for 7 days from issuing or 7 days before birthday' },
    { discount: '100.000 VND OFF', condition: 'For Third Order Over 1.000.000 VND', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Same conditions as above' },
    { discount: '15% OFF', condition: 'For Tables Order', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Same conditions as above' },
    { discount: '10% OFF', condition: 'For New Customer', code: 'NewCustomer', left: '', details: 'Same conditions as above' }
  ];

  newVouchers = [
    { discount: '5% OFF', condition: 'For Whole Order', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Same conditions as above' },
    { discount: '10% OFF', condition: 'For Order Over 300.000 VND', code: 'CODE_123skidof', left: '', details: 'Same conditions as above' },
    { discount: '40.000 VND OFF', condition: 'For Third Order Over 500.000 VND', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Same conditions as above' },
    { discount: '100.000 VND OFF', condition: 'For Third Order Over 1.000.000 VND', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Same conditions as above' },
    { discount: '15% OFF', condition: 'For Tables Order', code: 'CODE_123skidof', left: 'Only 10 Uses Left!', details: 'Same conditions as above' },
    { discount: '10% OFF', condition: 'For Two Order Over 800.000 VND', code: 'Ding&Brand', left: '', details: 'Same conditions as above' }
  ];
}

