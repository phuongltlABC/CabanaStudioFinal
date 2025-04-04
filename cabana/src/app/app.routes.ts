import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { ContactComponent } from './contact/contact/contact.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { PromotionComponent } from './promotion/promotion/promotion.component';
import { ProductComponent } from './product/product/product.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { SignComponent } from './sign/sign/sign.component';
import { BlogComponent } from './blog/blog/blog.component';
import { MyProfileComponent } from './my-profile/my-profile/my-profile.component';
import { ForgotPasswordComponent } from './sign/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './sign/change-password/change-password.component';
import { VerifyCodeComponent } from './sign/verify-code/verify-code.component';
import { BlogContentComponent } from './blog/blog-content/blog-content.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { PromotionSpecialOffersComponent } from './promotion/promotion-special-offers/promotion-special-offers.component';
import { PolicyComponent } from './policy/policy/policy.component';
import { MyOrderComponent } from './my-order/my-order/my-order.component';
import { OrderDetailComponent } from './my-order/order-detail/order-detail.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PlaceOrderComponent } from './my-card/place-order/place-order.component';
import { BlogMainComponent } from './blog/blog-main/blog-main.component';
import { MyCartComponent } from './my-card/my-card/my-card.component';
import { SplineViewerComponent } from './product/spline-viewer/spline-viewer.component';

export const routes: Routes = [
  { path: '', component:HomepageComponent},
  { path: 'about', component:AboutUsComponent },
  { path: 'about/product', redirectTo: '/product', pathMatch: 'full' },
  { path: 'contact', component:ContactComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'promotion', component:PromotionComponent,
    children:[
      { path: 'special-offer', component:PromotionSpecialOffersComponent },
    ]
   },
  { path: 'product', component: ProductComponent,
    // children:[
    //   { path: 'product-detail', component:ProductDetailComponent },
    // ]
   },
   { path: 'product-detail', component: ProductDetailComponent }, // Nhận ID sản phẩm
  { path: 'sign', component:SignComponent,
    children:[
      { path: 'signin', component:SignInComponent },
      { path: 'signup', component:SignUpComponent },
      { path: 'forgot', component:ForgotPasswordComponent },
      { path: 'set-password', component:ChangePasswordComponent },
      { path: 'verify', component:VerifyCodeComponent },
    ]
   },
  { path: 'blog', component:BlogComponent},
  { path: 'blog-content', component:BlogContentComponent},
  { path: 'blog/blog-content', redirectTo: 'blog-content', pathMatch: 'full' },
  { path: 'profile', component:MyProfileComponent,
    children:[
      { path: 'edit-profile', component:EditProfileComponent },
    ]
   },
  { path: 'policy', component:PolicyComponent },
  { path: 'my-order', component:MyOrderComponent,
    children:[
      { path: 'order-detail', component:OrderDetailComponent },
    ]
   },
  { path: 'my-cart', component:MyCartComponent,
    children:[
      { path: 'place-order', component:PlaceOrderComponent},
    ]
   },
];
