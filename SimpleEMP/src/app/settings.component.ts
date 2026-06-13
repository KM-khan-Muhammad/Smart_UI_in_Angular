import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, AppSettings } from './theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent implements OnInit {
  
  settings: AppSettings = {
    fontFamily: "'Inter', sans-serif",
    primaryColor: '#6366f1',
    layoutPosition: 'top',
    themeMode: 'dark',
    sidebarCollapsed: false,
    sidebarWidth: 280
  };



  fonts: any[];
  colors: any[];
  layouts: any[];
  themeModes: any[];

  constructor(private themeService: ThemeService) {
    this.fonts = this.themeService.fonts;
    this.colors = this.themeService.colors;
    this.layouts = this.themeService.layouts;
    this.themeModes = this.themeService.themeModes;
  }


  ngOnInit() {
    this.settings = this.themeService.getSettings();
  }

  updateSettings() {
    this.themeService.applySettings(this.settings);
  }

  reset() {
    localStorage.removeItem('app-user-settings');
    window.location.reload();
  }
}
