import * as gen from 'uuid';

export function UUID(): string {
    return gen.v4();
}
