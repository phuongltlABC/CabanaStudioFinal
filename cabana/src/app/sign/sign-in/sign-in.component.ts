import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
    console.log('Form Submitted!');
    console.log('Form valid:', form.valid);
    console.log('Form values:', form.value);

    if (form.invalid) {
      // Đánh dấu tất cả các control là touched để hiển thị lỗi validation (nếu có)
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('Form is invalid. Please check the fields.');
      return; // Dừng lại nếu form không hợp lệ
    }

    // --- Logic xử lý đăng nhập (Giữ nguyên) ---
    const { emailOrPhone, password, rememberMe } = form.value;

    // --- Giả lập đăng nhập thành công để test điều hướng ---
    console.log('Simulating successful login...');
    alert('Login successful! Redirecting to home page.'); // Thông báo tạm
    this.router.navigate(['']); // Điều hướng đến route '' (là HomepageComponent theo app.routes.ts)
    // ----------------------------------------------------
  }

  // Xử lý click nút đăng nhập mạng xã hội (chỉ log ra console)
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
