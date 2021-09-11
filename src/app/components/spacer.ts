import { Component} from '@angular/core';

@Component({
  selector: 'spacer',
  inputs: ['width', 'height'],
  template: `
    <div style="width: {{ width }}; height: {{ height }}"></div>
  `,
})
export class Spacer {
  width: string|null = null;
  height: string|null = null;

  constructor() { }
}
