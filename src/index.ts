import { registerPlugin } from '@capacitor/core';

import type { VehiclePropertyPlugin } from './definitions';

const VehicleProperty = registerPlugin<VehiclePropertyPlugin>('VehicleProperty', {
  web: () => import('./web').then(m => new m.VehiclePropertyWeb()),
});

export * from './definitions';
export { VehicleProperty };
