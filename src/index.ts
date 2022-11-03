import {registerPlugin} from "@capacitor/core";
import {VehiclePermissions, VehiclePropertyDataEvent, VehiclePropertyPluginInterface} from "./definitions";
import {RestrictedVehicleDataProxy, VehicleErrorEvent} from "@capacitor-community/aaos-data-utils";


const VehiclePropertyService = registerPlugin<VehiclePropertyPluginInterface>('VehiclePropertyPlugin')

/**
 * Used for breaking up packed function arguments, automotic and central logging for calls and maybe central error handling
 */
export class VehiclePropertyPlugin extends RestrictedVehicleDataProxy<VehiclePropertyDataEvent,VehiclePermissions> {

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
//export * from "./configuration"
