import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <label class="input">
      <span *ngIf="label" class="input__label">
        {{ label }}
      </span>
      <input
        class="input__input"
        type="text"
        [type]="type"
        [name]="name"
        [placeholder]="placeholder"
        [value]="value"
        (change)="handleChange($event)"
        (input)="handleInput($event)"
      />
    </label>
  `,
  styles: [
    `
      .input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }

      .input__label {
        margin-bottom: 8px;
      }

      .input__input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `,
  ],
})
export class InputComponent {
  @Input()
  label: string = '';
  @Input()
  name: string = '';
  @Input()
  type: string = 'text';
  @Input()
  value: string = '';
  @Input()
  placeholder: string = '';

  @Output()
  onChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onInput: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  handleChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange.emit(value);
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onInput.emit(value);
  }
}
