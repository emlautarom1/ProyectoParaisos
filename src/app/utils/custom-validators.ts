import { AbstractControl } from '@angular/forms';

export function NoNullValuesValidator(control: AbstractControl): { [key: string]: any } | null {
    const entries = Object.entries(control.value);

    let invalid: string;
    for (const [key, val] of entries) {
        if (!val) {
            invalid = key;
            break;
        }
    }
    return invalid ? { 'Falsy key': { value: invalid } } : null;
}
