import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';      
import { NgForm, FormsModule } from '@angular/forms';     
import { CommonModule } from '@angular/common';         

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'] 
})
export class ForgotPasswordComponent {

  constructor(private router: Router) { }

  onSubmit(form: NgForm): void {
    console.log('Forgot Password Form Submitted!');
    console.log('Form valid:', form.valid);
    console.log('Email value:', form.value.email);

    if (form.invalid) {
      // Đánh dấu control là touched để hiển thị lỗi validation
      Object.values(form.controls).forEach(control => {
          control.markAsTouched();
      });
      console.log('Form is invalid. Please enter a valid email.');
      return;
    }

    // --- Logic xử lý gửi yêu cầu reset password (Giữ nguyên) ---
    const email = form.value.email;
    console.log(`Sending password reset request for email: ${email}`);

    // --- Giả lập gửi thành công để test điều hướng ---
    console.log('Simulating successful email sending...');
    alert(`Password reset instructions sent to ${email}. Redirecting to verification page.`); // Thông báo tạm
    // Điều hướng đến trang Verify Code theo app.routes.ts
    this.router.navigate(['/sign/verify']);
    // Nếu cần truyền email:
    // this.router.navigate(['/sign/verify'], { queryParams: { email: email } });
    // ----------------------------------------------------
  }

   // Các hàm social login (chỉ để log, vì nút là tượng trưng)
   loginWithFacebook(): void {
    console.log('Facebook login button clicked (decorative)');
  }

  loginWithGoogle(): void {
    console.log('Google login button clicked (decorative)');
  }

  loginWithApple(): void {
    console.log('Apple login button clicked (decorative)');
  }
}