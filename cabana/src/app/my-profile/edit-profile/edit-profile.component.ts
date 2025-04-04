import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  userData: any = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1 555-123-4567',
    shippingAddress: '123 Main Street, Anytown, CA 91234'
  };
  password = '********';
  confirmPassword = '********';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // dữ liệu ảo đã được gán trực tiếp
  }

  saveChanges() {
    console.log('Saving data:', this.userData);
    alert('Changes saved!');
    this.router.navigate(['/profile']);
  }
}