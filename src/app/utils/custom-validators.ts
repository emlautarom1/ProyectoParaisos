import { AbstractControl } from '@angular/forms';

export const noNullValuesValidator = (control: AbstractControl): { [key: string]: any } | null => {
  const entries = Object.entries(control.value);

  let invalid: string;
  for (const [key, val] of entries) {
    if (!val) {
      invalid = key;
      break;
    }
  }
  return invalid ? { falsyKey: { value: invalid } } : null;
};
