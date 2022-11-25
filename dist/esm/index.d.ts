import type { VehicleErrorEvent } from "@capacitor-community/aaos-data-utils";
import { RestrictedVehicleDataProxy } from "@capacitor-community/aaos-data-utils";
import type { VehiclePermissions, VehiclePropertyDataEvent } from "./definitions";
/**
 * Used for breaking up packed function arguments, automotic and central logging for calls and maybe central error handling
 */
export declare class VehiclePropertyPlugin extends RestrictedVehicleDataProxy<VehiclePropertyDataEvent, VehicleErrorEvent, VehiclePermissions> {
    constructor();
    quickView(dataId: number): Promise<VehiclePropertyDataEvent>;
}
export * from "./definitions";
