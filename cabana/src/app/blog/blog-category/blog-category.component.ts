import { Component } from '@angular/core';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-blog-category',
  imports: [BlogCardComponent],
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.css'
})
export class BlogCategoryComponent {

}
