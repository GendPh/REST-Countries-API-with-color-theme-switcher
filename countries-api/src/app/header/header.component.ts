import { Component } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  constructor(private darkModeService: DarkModeService) { }

  toggleTheme() {
    this.darkModeService.toggleDarkMode();
  }
}
