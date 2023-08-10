import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <h1>{{ title }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 24px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Movie Favorites';
}
