import { Component } from '@angular/core';

@Component({
  selector: 'app-foter',
  imports: [],
  templateUrl: './foter.html',
  styleUrl: './foter.css',
})
export class Foter {
  currentYear = new Date().getFullYear();
}
