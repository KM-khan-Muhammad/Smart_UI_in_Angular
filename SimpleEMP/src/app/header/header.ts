import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isResizing = false;

  constructor(private themeService: ThemeService) {}

  get isCollapsed(): boolean {
    return this.themeService.getSettings().sidebarCollapsed;
  }

  toggleSidebar(event: Event) {
    event.stopPropagation();
    const settings = this.themeService.getSettings();
    settings.sidebarCollapsed = !settings.sidebarCollapsed;
    this.themeService.applySettings(settings);
  }

  onResizeStart(event: MouseEvent) {
    event.preventDefault();
    this.isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.classList.add('is-resizing');
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const settings = this.themeService.getSettings();
    const layout = settings.layoutPosition;
    
    let newWidth = settings.sidebarWidth;
    if (layout === 'left') {
      newWidth = event.clientX;
    } else if (layout === 'right') {
      newWidth = window.innerWidth - event.clientX;
    } else {
      return;
    }

    // Constraints
    if (newWidth >= 180 && newWidth <= 500) {
      settings.sidebarWidth = newWidth;
      this.themeService.applySettings(settings);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    if (!this.isResizing) return;
    this.isResizing = false;
    document.body.style.cursor = '';
    document.body.classList.remove('is-resizing');
  }
}


