import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; // Import NgForm

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
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

    // --- Logic xử lý đăng nhập ---
    // Lấy thông tin từ form.value
    const { emailOrPhone, password, rememberMe } = form.value;

    // Gọi service xác thực (ví dụ)
    // this.authService.login(emailOrPhone, password).subscribe({
    //   next: (response) => {
    //     console.log('Đăng nhập thành công!', response);
    //     // Lưu token, thông tin user...
    //     this.router.navigate(['/']); // Điều hướng về trang chủ
    //   },
    //   error: (error) => {
    //     console.error('Lỗi đăng nhập:', error);
    //     // Hiển thị thông báo lỗi cho người dùng
    //     // Ví dụ: this.errorMessage = 'Invalid credentials';
    //   }
    // });

    // --- Giả lập đăng nhập thành công để test điều hướng ---
    console.log('Simulating successful login...');
    alert('Login successful! Redirecting to home page.'); // Thông báo tạm
    this.router.navigate(['homepage']); // Điều hướng đến route '/' (trang chủ)
    // ----------------------------------------------------
  }

  // Xử lý click nút đăng nhập mạng xã hội (hiện tại chỉ log)
  loginWithFacebook(): void {
    console.log('Attempting Facebook login...');
    // Thêm logic gọi SDK hoặc API của Facebook
  }

  loginWithGoogle(): void {
    console.log('Attempting Google login...');
     // Thêm logic gọi SDK hoặc API của Google
  }

  loginWithApple(): void {
    console.log('Attempting Apple login...');
     // Thêm logic gọi SDK hoặc API của Apple
  }
}