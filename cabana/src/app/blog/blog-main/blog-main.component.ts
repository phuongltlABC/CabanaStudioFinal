import { Component } from '@angular/core';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogCategoryComponent } from '../blog-category/blog-category.component';
import { BlogLastestComponent } from '../blog-lastest/blog-lastest.component';
@Component({
  selector: 'app-blog-main',
  imports: [BlogCardComponent, 
      BlogLastestComponent, 
      BlogCategoryComponent,
    ],
  templateUrl: './blog-main.component.html',
  styleUrl: './blog-main.component.css'
})
export class BlogMainComponent {

}
