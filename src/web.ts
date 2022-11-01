import { WebPlugin } from '@capacitor/core';

import type { VehiclePropertyPlugin } from './definitions';

export class VehiclePropertyWeb extends WebPlugin implements VehiclePropertyPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
