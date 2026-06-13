import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Foter } from './foter/foter';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Foter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'SimpleEMP';

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.loadTheme();
  }
}
