import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  userData: any = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1 555-123-4567',
    shippingAddress: '123 Main Street, Anytown, CA 91234'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // dữ liệu ảo đã được gán trực tiếp
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}