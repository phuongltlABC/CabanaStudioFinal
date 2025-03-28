import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { FeatureProductComponent } from "../feature-product/feature-product.component";
import { FeatureBlogComponent } from "../feature-blog/feature-blog.component";
import { RoomsComponent } from "../rooms/rooms.component";
import { CategoryComponent } from "../category/category.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CarouselComponent, 
    FeatureProductComponent, 
    FeatureBlogComponent, 
    RoomsComponent, 
    CategoryComponent,
  RouterLink,
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
