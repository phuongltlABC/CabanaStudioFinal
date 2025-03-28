import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      src: 'assets/image/carousel/banner_1.jpg'
    };
    this.slides[1] = {
      src: 'assets/image/carousel/banner_2.jpg'
    };
    this.slides[2] = {
      src: 'assets/image/carousel/banner_3.jpg'
    };
  }
}
