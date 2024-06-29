import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  // Get the html element from the DOM
  private html: HTMLElement | null = document.querySelector('html');

  constructor() {
    // Check if the user prefers dark mode and set it as default if true
    const schemePrefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (this.html) {
      this.html.classList.remove('dark');
      if (!this.html.classList.contains('dark') && schemePrefer === 'dark') {
        this.html.classList.add('dark');
      }
    }
  }

  //Method to toggle dark mode
  public toggleDarkMode() {
    this.html?.classList.toggle('dark');
  }

}
