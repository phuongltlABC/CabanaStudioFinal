
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spline-viewer',
  standalone: true,
  templateUrl: './spline-viewer.component.html',
})
export class SplineViewerComponent implements OnInit {
  @ViewChild('splineContainer', { static: true }) splineContainer!: ElementRef;

  ngOnInit() {
    // Tạo thẻ script để tải Web Component
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';

    // Sau khi tải xong, thêm <spline-viewer> vào DOM
    script.onload = () => {
      console.log('Spline Viewer Script Loaded');
      this.loadViewer();
    };

    // Thêm thẻ script vào body
    document.body.appendChild(script);
  }

  loadViewer() {
    // Tạo và thêm thẻ <spline-viewer> vào trang
    const viewer = document.createElement('spline-viewer');
    viewer.setAttribute('url', 'https://prod.spline.design/MFZKv5d3HRXptpfa/scene.splinecode');
    this.splineContainer.nativeElement.appendChild(viewer);
  }
}
