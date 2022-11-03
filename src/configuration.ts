import VehiclePropertyToPermissionMap, {VehiclePropertyIds} from "./definitions";
import {VehiclePluginConfiguration} from "@capacitor-community/aaos-data-utils";


export interface VehiclePropertyPluginConfiguration {
    allowedVehicleProperties : Array<VehiclePropertyIds>
}

export class VehiclePropertyConfig extends VehiclePluginConfiguration{

    private readonly allowedVehicleProperties: Array<VehiclePropertyIds>;

    constructor(pluginConfiguration : VehiclePropertyPluginConfiguration) {
        super('carproperty/VehiclePropertyPlugin.java');
        this.allowedVehicleProperties = pluginConfiguration.allowedVehicleProperties
        this.permissionUtil.setPermissions(this.getPermissions())
    }

    protected getPermissions(): Set<string> {
        let permissions = new Set<string>()
        for(let vehicleProperty of this.allowedVehicleProperties) {
            permissions.add(VehiclePropertyToPermissionMap[vehicleProperty])
        }
        return permissions
    }

    apply() : void {
        this.permissionUtil.adjustPermissionAnnotation()
    }
}
