import { RestrictedVehicleDataProxy } from "@capacitor-community/aaos-data-utils";
import { registerPlugin } from "@capacitor/core";
const VehiclePropertyService = registerPlugin('VehiclePropertyPlugin');
/**
 * Used for breaking up packed function arguments, automotic and central logging for calls and maybe central error handling
 */
export class VehiclePropertyPlugin extends RestrictedVehicleDataProxy {
    constructor() {
        super(VehiclePropertyService);
    }
    quickView(dataId) {
        return this.dataService.quickView({ dataId: dataId }).then(carPropertyDataEvent => {
            console.log(`Received value: ${JSON.stringify(carPropertyDataEvent)} for ${dataId}`);
            return carPropertyDataEvent;
        }).catch(errorEvent => {
            console.error(`Failed receiving value for ${dataId}. Reason ${errorEvent}`);
            throw JSON.parse(errorEvent);
        });
    }
}
export * from "./definitions";
//# sourceMappingURL=index.js.map