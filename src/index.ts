
import type { VehicleErrorEvent} from "@capacitor-community/aaos-data-utils";
import {RestrictedVehicleDataProxy} from "@capacitor-community/aaos-data-utils";
import {registerPlugin} from "@capacitor/core";

import type {VehiclePermissions, VehiclePropertyDataEvent, VehiclePropertyPluginInterface} from "./definitions";


const VehiclePropertyService = registerPlugin<VehiclePropertyPluginInterface>('VehiclePropertyPlugin')

/**
 * Used for breaking up packed function arguments, automotic and central logging for calls and maybe central error handling
 */
export class VehiclePropertyPlugin extends RestrictedVehicleDataProxy<VehiclePropertyDataEvent,VehicleErrorEvent,VehiclePermissions> {

    constructor() {
        super(VehiclePropertyService);
    }

    quickView(dataId : number) : Promise<VehiclePropertyDataEvent> {
        return (this.dataService as VehiclePropertyPluginInterface).quickView({dataId : dataId}).then(carPropertyDataEvent => {
            console.log(`Received value: ${JSON.stringify(carPropertyDataEvent)} for ${dataId}`)
            return carPropertyDataEvent
        }).catch(errorEvent => {
            console.error(`Failed receiving value for ${dataId}. Reason ${errorEvent}`)
            throw JSON.parse(errorEvent) as VehicleErrorEvent
        })
    }

}

export * from "./definitions"
