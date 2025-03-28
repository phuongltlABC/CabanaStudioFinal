import { Component } from '@angular/core';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { BlogLastestComponent } from "../blog-lastest/blog-lastest.component";
import { BlogCategoryComponent } from "../blog-category/blog-category.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlogContentComponent } from '../blog-content/blog-content.component';
@Component({
  selector: 'app-blog',
  imports: [BlogCardComponent, 
    BlogLastestComponent, 
    BlogCategoryComponent, 
    RouterLink,
    BlogContentComponent,
    RouterOutlet,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
