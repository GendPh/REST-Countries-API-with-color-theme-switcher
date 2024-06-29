import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './services/dark-mode.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'countries-api';
  constructor(private darkModeService: DarkModeService) { }
}
