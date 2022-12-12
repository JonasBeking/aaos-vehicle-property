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
            console.debug(`Received value: ${JSON.stringify(carPropertyDataEvent, null, 3)} for ${dataId}`);
            return carPropertyDataEvent;
        }).catch(errorEvent => {
            let throwable;
            let log = errorEvent;
            try {
                throwable = JSON.parse(errorEvent);
                log = JSON.stringify(throwable, null, 3);
            }
            catch (e) {
                throwable = errorEvent;
            }
            console.error(`Failed receiving value for ${dataId}. Reason ${log}`);
            throw throwable;
        });
    }
}
export * from "./definitions";
//# sourceMappingURL=index.js.map