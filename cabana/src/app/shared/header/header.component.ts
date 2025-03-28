import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-header',
    imports: [CommonModule,RouterLink, MatMenuModule, MatButtonModule, MatIconModule],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})

export class HeaderComponent{
    isMenuChildOpened:boolean = false;
    isMenuChildChildOpened:boolean = false;
    isMenuOpen = false;
    constructor(private eRef: ElementRef) {}
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.isMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
    if (this.isMenuChildOpened && !this.eRef.nativeElement.contains(event.target)) {
      this.isMenuChildOpened = false;
    }

  }
  
  toggleMenuchild(): void{
    this.isMenuChildOpened = !this.isMenuChildOpened;
  }
  clickedOutside(): void{
    this.isMenuChildOpened =false;
    this.isMenuOpen = false;
  }
}