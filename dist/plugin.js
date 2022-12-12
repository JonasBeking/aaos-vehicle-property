var capacitorVehicleProperty = (function (exports, core) {
    'use strict';

    class VehicleDataProxy {
        constructor(dataService) {
            this.dataService = dataService;
        }
        generateActiveView(dataId, callback, addressableName) {
            return this.dataService.generateActiveView({
                dataId: dataId,
                addressableName: addressableName
            }, ((dataEvent, err) => {
                if (err) {
                    const errorEvent = JSON.parse(err);
                    console.error(`Failed getting value for propertyId: ${dataId} - ${addressableName} due to ${err}`);
                    callback(dataEvent, errorEvent);
                }
                else {
                    console.debug(`Received value: ${JSON.stringify(dataEvent)} for propertyId: ${dataId} - ${addressableName}`);
                    callback(dataEvent);
                }
            })).then(() => {
                console.debug(`Requested Active Property View for propertyId: ${dataId} - ${addressableName}`);
            }).catch(errorEvent => {
                console.error(`Failed registering Active Property View for propertyId: ${dataId} - ${addressableName}. Reason: ${errorEvent}`);
                let throwable;
                try {
                    throwable = JSON.parse(errorEvent);
                }
                catch (e) {
                    throwable = errorEvent;
                }
                throw throwable;
            });
        }
        generatePassiveView(dataId, addressableName) {
            return this.dataService.generatePassiveView({
                dataId: dataId,
                addressableName: addressableName
            }).then(() => {
                console.debug(`Successfully registered Passive Property View for propertyId: ${dataId} - ${addressableName}`);
            }).catch(errorEvent => {
                console.error(`Failed registering Passive Property View for propertyId: ${dataId} - ${addressableName}. Reason: ${errorEvent}`);
                let throwable;
                try {
                    throwable = JSON.parse(errorEvent);
                }
                catch (e) {
                    throwable = errorEvent;
                }
                throw throwable;
            });
        }
        removeView(addressableName) {
            return this.dataService.removeView({
                addressableName: addressableName
            }).then(() => {
                console.debug(`Removed View for ${addressableName}`);
            }).catch(errorEvent => {
                console.error(`Failed removing View for ${addressableName}. Reason: ${errorEvent}`);
                let throwable;
                try {
                    throwable = JSON.parse(errorEvent);
                }
                catch (e) {
                    throwable = errorEvent;
                }
                throw throwable;
            });
        }
        view(addressableName) {
            return this.dataService.view({ addressableName: addressableName }).then((event) => {
                console.debug(`Received value: ${JSON.stringify(event)} for ${addressableName}`);
                if (event.event === -1) {
                    return event;
                }
                else {
                    return event;
                }
            }).catch(errorEvent => {
                console.error(`Failed receiving value for ${addressableName}. Reason ${errorEvent}`);
                let throwable;
                try {
                    throwable = JSON.parse(errorEvent);
                }
                catch (e) {
                    throwable = errorEvent;
                }
                throw throwable;
            });
        }
        viewAll(addressableName) {
            return this.dataService.viewAll({ addressableName: addressableName }).then(({ events }) => {
                console.debug(`Received value: ${JSON.stringify(events)} for ${addressableName}`);
                return events;
            }).catch(errorEvent => {
                console.error(`Failed receiving value for ${addressableName}. Reason ${errorEvent}`);
                let throwable;
                try {
                    throwable = JSON.parse(errorEvent);
                }
                catch (e) {
                    throwable = errorEvent;
                }
                throw throwable;
            });
        }
    }
    class RestrictedVehicleDataProxy extends VehicleDataProxy {
        constructor(dataService) {
            super(dataService);
            this.dataService = dataService;
        }
        checkPermissions() {
            return this.dataService.checkPermissions().then(permissionStatus => {
                console.debug(`Current status of permissions: ${JSON.stringify(permissionStatus)}`);
                return permissionStatus;
            }).catch(reason => {
                console.error(`Failed checking current status for permissions. Reason: ${reason}`);
                let throwable;
                try {
                    throwable = JSON.parse(reason);
                }
                catch (e) {
                    throwable = reason;
                }
                throw throwable;
            });
        }
        requestPermissions(permissions) {
            return this.dataService.requestPermissions({
                permissions: permissions
            }).then(permissionStatus => {
                console.debug(`Current PermissionStatus: ${JSON.stringify(permissionStatus)}`);
                return permissionStatus;
            }).catch(reason => {
                console.error(`Failed requesting Permissions. Reason: ${reason}`);
                let throwable;
                try {
                    throwable = JSON.parse(reason);
                }
                catch (e) {
                    throwable = reason;
                }
                throw throwable;
            });
        }
    }

    exports.VehiclePermissions = void 0;
    (function (VehiclePermissions) {
        VehiclePermissions["PERMISSION_CAR_CONTROL_AUDIO_VOLUME"] = "android.car.permission.CAR_CONTROL_AUDIO_VOLUME";
        VehiclePermissions["PERMISSION_CAR_CONTROL_AUDIO_SETTINGS"] = "android.car.permission.CAR_CONTROL_AUDIO_SETTINGS";
        VehiclePermissions["PERMISSION_SPEED"] = "android.car.permission.CAR_SPEED";
        VehiclePermissions["PERMISSION_READ_DISPLAY_UNITS"] = "android.car.permission.READ_CAR_DISPLAY_UNITS";
        VehiclePermissions["PERMISSION_POWERTRAIN"] = "android.car.permission.CAR_POWERTRAIN";
        VehiclePermissions["PERMISSION_ENERGY"] = "android.car.permission.CAR_ENERGY";
        VehiclePermissions["PERMISSION_ENERGY_PORTS"] = "android.car.permission.CAR_ENERGY_PORTS";
        VehiclePermissions["PERMISSION_CAR_INFO"] = "android.car.permission.CAR_INFO";
        VehiclePermissions["PERMISSION_EXTERIOR_ENVIRONMENT"] = "android.car.permission.CAR_EXTERIOR_ENVIRONMENT";
        VehiclePermissions["PERMISSION_CAR_NAVIGATION_MANAGER"] = "android.car.permission.CAR_NAVIGATION_MANAGER";
        VehiclePermissions["PERMISSION_CONTROL_DISPLAY_UNITS"] = "android.car.permission.CONTROL_CAR_DISPLAY_UNITS";
        VehiclePermissions["PERMISSION_CONTROL_INTERIOR_LIGHTS"] = "android.car.permission.CONTROL_CAR_INTERIOR_LIGHTS";
        VehiclePermissions["PERMISSION_IDENTIFICATION"] = "android.car.permission.CAR_IDENTIFICATION";
        VehiclePermissions["PERMISSION_READ_INTERIOR_LIGHTS"] = "android.car.permission.READ_CAR_INTERIOR_LIGHTS";
        VehiclePermissions["PERMISSION_READ_STEERING_STATE"] = "android.car.permission.READ_CAR_STEERING";
        VehiclePermissions["PERMISSION_CONTROL_CAR_CLIMATE"] = "android.car.Car.PERMISSION_CONTROL_CAR_CLIMATE";
    })(exports.VehiclePermissions || (exports.VehiclePermissions = {}));
    exports.VehiclePropertyIds = void 0;
    (function (VehiclePropertyIds) {
        VehiclePropertyIds[VehiclePropertyIds["ABS_ACTIVE"] = 287310858] = "ABS_ACTIVE";
        VehiclePropertyIds[VehiclePropertyIds["AP_POWER_BOOTUP_REASON"] = 289409538] = "AP_POWER_BOOTUP_REASON";
        VehiclePropertyIds[VehiclePropertyIds["AP_POWER_STATE_REPORT"] = 289475073] = "AP_POWER_STATE_REPORT";
        VehiclePropertyIds[VehiclePropertyIds["AP_POWER_STATE_REQ"] = 289475072] = "AP_POWER_STATE_REQ";
        VehiclePropertyIds[VehiclePropertyIds["CABIN_LIGHTS_STATE"] = 289410817] = "CABIN_LIGHTS_STATE";
        VehiclePropertyIds[VehiclePropertyIds["CABIN_LIGHTS_SWITCH"] = 289410818] = "CABIN_LIGHTS_SWITCH";
        VehiclePropertyIds[VehiclePropertyIds["CRITICALLY_LOW_TIRE_PRESSURE"] = 392168202] = "CRITICALLY_LOW_TIRE_PRESSURE";
        VehiclePropertyIds[VehiclePropertyIds["CURRENT_GEAR"] = 289408001] = "CURRENT_GEAR";
        VehiclePropertyIds[VehiclePropertyIds["DISPLAY_BRIGHTNESS"] = 289409539] = "DISPLAY_BRIGHTNESS";
        VehiclePropertyIds[VehiclePropertyIds["DISTANCE_DISPLAY_UNITS"] = 289408512] = "DISTANCE_DISPLAY_UNITS";
        VehiclePropertyIds[VehiclePropertyIds["DOOR_LOCK"] = 371198722] = "DOOR_LOCK";
        VehiclePropertyIds[VehiclePropertyIds["DOOR_MOVE"] = 373295873] = "DOOR_MOVE";
        VehiclePropertyIds[VehiclePropertyIds["DOOR_POS"] = 373295872] = "DOOR_POS";
        VehiclePropertyIds[VehiclePropertyIds["ELECTRONIC_TOLL_COLLECTION_CARD_STATUS"] = 289410874] = "ELECTRONIC_TOLL_COLLECTION_CARD_STATUS";
        VehiclePropertyIds[VehiclePropertyIds["ELECTRONIC_TOLL_COLLECTION_CARD_TYPE"] = 289410873] = "ELECTRONIC_TOLL_COLLECTION_CARD_TYPE";
        VehiclePropertyIds[VehiclePropertyIds["ENGINE_COOLANT_TEMP"] = 291504897] = "ENGINE_COOLANT_TEMP";
        VehiclePropertyIds[VehiclePropertyIds["ENGINE_OIL_LEVEL"] = 289407747] = "ENGINE_OIL_LEVEL";
        VehiclePropertyIds[VehiclePropertyIds["ENGINE_OIL_TEMP"] = 291504900] = "ENGINE_OIL_TEMP";
        VehiclePropertyIds[VehiclePropertyIds["ENGINE_RPM"] = 291504901] = "ENGINE_RPM";
        VehiclePropertyIds[VehiclePropertyIds["ENV_OUTSIDE_TEMPERATURE"] = 291505923] = "ENV_OUTSIDE_TEMPERATURE";
        VehiclePropertyIds[VehiclePropertyIds["EPOCH_TIME"] = 290457094] = "EPOCH_TIME";
        VehiclePropertyIds[VehiclePropertyIds["EV_BATTERY_DISPLAY_UNITS"] = 289408515] = "EV_BATTERY_DISPLAY_UNITS";
        VehiclePropertyIds[VehiclePropertyIds["EV_BATTERY_INSTANTANEOUS_CHARGE_RATE"] = 291504908] = "EV_BATTERY_INSTANTANEOUS_CHARGE_RATE";
        VehiclePropertyIds[VehiclePropertyIds["EV_BATTERY_LEVEL"] = 291504905] = "EV_BATTERY_LEVEL";
        VehiclePropertyIds[VehiclePropertyIds["EV_CHARGE_PORT_CONNECTED"] = 287310603] = "EV_CHARGE_PORT_CONNECTED";
        VehiclePropertyIds[VehiclePropertyIds["EV_CHARGE_PORT_OPEN"] = 287310602] = "EV_CHARGE_PORT_OPEN";
        VehiclePropertyIds[VehiclePropertyIds["FOG_LIGHTS_STATE"] = 289410562] = "FOG_LIGHTS_STATE";
        VehiclePropertyIds[VehiclePropertyIds["FOG_LIGHTS_SWITCH"] = 289410578] = "FOG_LIGHTS_SWITCH";
        VehiclePropertyIds[VehiclePropertyIds["FUEL_CONSUMPTION_UNITS_DISTANCE_OVER_VOLUME"] = 287311364] = "FUEL_CONSUMPTION_UNITS_DISTANCE_OVER_VOLUME";
        VehiclePropertyIds[VehiclePropertyIds["FUEL_DOOR_OPEN"] = 287310600] = "FUEL_DOOR_OPEN";
        VehiclePropertyIds[VehiclePropertyIds["FUEL_LEVEL"] = 291504903] = "FUEL_LEVEL";
        VehiclePropertyIds[VehiclePropertyIds["FUEL_LEVEL_LOW"] = 287310853] = "FUEL_LEVEL_LOW";
        VehiclePropertyIds[VehiclePropertyIds["FUEL_VOLUME_DISPLAY_UNITS"] = 289408513] = "FUEL_VOLUME_DISPLAY_UNITS";
        VehiclePropertyIds[VehiclePropertyIds["GEAR_SELECTION"] = 289408000] = "GEAR_SELECTION";
        VehiclePropertyIds[VehiclePropertyIds["HAZARD_LIGHTS_STATE"] = 289410563] = "HAZARD_LIGHTS_STATE";
        VehiclePropertyIds[VehiclePropertyIds["HAZARD_LIGHTS_SWITCH"] = 289410579] = "HAZARD_LIGHTS_SWITCH";
        VehiclePropertyIds[VehiclePropertyIds["HEADLIGHTS_STATE"] = 289410560] = "HEADLIGHTS_STATE";
        VehiclePropertyIds[VehiclePropertyIds["HEADLIGHTS_SWITCH"] = 289410576] = "HEADLIGHTS_SWITCH";
        VehiclePropertyIds[VehiclePropertyIds["HIGH_BEAM_LIGHTS_STATE"] = 289410561] = "HIGH_BEAM_LIGHTS_STATE";
        VehiclePropertyIds[VehiclePropertyIds["HIGH_BEAM_LIGHTS_SWITCH"] = 289410577] = "HIGH_BEAM_LIGHTS_SWITCH";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_ACTUAL_FAN_SPEED_RPM"] = 356517135] = "HVAC_ACTUAL_FAN_SPEED_RPM";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_AC_ON"] = 354419973] = "HVAC_AC_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_AUTO_ON"] = 354419978] = "HVAC_AUTO_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_AUTO_RECIRC_ON"] = 354419986] = "HVAC_AUTO_RECIRC_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_DEFROSTER"] = 320865540] = "HVAC_DEFROSTER";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_DUAL_ON"] = 354419977] = "HVAC_DUAL_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_FAN_DIRECTION"] = 356517121] = "HVAC_FAN_DIRECTION";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_FAN_DIRECTION_AVAILABLE"] = 356582673] = "HVAC_FAN_DIRECTION_AVAILABLE";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_FAN_SPEED"] = 356517120] = "HVAC_FAN_SPEED";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_MAX_AC_ON"] = 354419974] = "HVAC_MAX_AC_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_MAX_DEFROST_ON"] = 354419975] = "HVAC_MAX_DEFROST_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_POWER_ON"] = 354419984] = "HVAC_POWER_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_RECIRC_ON"] = 354419976] = "HVAC_RECIRC_ON";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_SEAT_TEMPERATURE"] = 356517131] = "HVAC_SEAT_TEMPERATURE";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_SEAT_VENTILATION"] = 356517139] = "HVAC_SEAT_VENTILATION";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_SIDE_MIRROR_HEAT"] = 339739916] = "HVAC_SIDE_MIRROR_HEAT";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_STEERING_WHEEL_HEAT"] = 289408269] = "HVAC_STEERING_WHEEL_HEAT";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_TEMPERATURE_CURRENT"] = 358614274] = "HVAC_TEMPERATURE_CURRENT";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_TEMPERATURE_DISPLAY_UNITS"] = 289408270] = "HVAC_TEMPERATURE_DISPLAY_UNITS";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_TEMPERATURE_SET"] = 358614275] = "HVAC_TEMPERATURE_SET";
        VehiclePropertyIds[VehiclePropertyIds["HVAC_TEMPERATURE_VALUE_SUGGESTION"] = 291570965] = "HVAC_TEMPERATURE_VALUE_SUGGESTION";
        VehiclePropertyIds[VehiclePropertyIds["HW_KEY_INPUT"] = 289475088] = "HW_KEY_INPUT";
        VehiclePropertyIds[VehiclePropertyIds["IGNITION_STATE"] = 289408009] = "IGNITION_STATE";
        VehiclePropertyIds[VehiclePropertyIds["INFO_DRIVER_SEAT"] = 356516106] = "INFO_DRIVER_SEAT";
        VehiclePropertyIds[VehiclePropertyIds["INFO_EV_BATTERY_CAPACITY"] = 291504390] = "INFO_EV_BATTERY_CAPACITY";
        VehiclePropertyIds[VehiclePropertyIds["INFO_EV_CONNECTOR_TYPE"] = 289472775] = "INFO_EV_CONNECTOR_TYPE";
        VehiclePropertyIds[VehiclePropertyIds["INFO_EV_PORT_LOCATION"] = 289407241] = "INFO_EV_PORT_LOCATION";
        VehiclePropertyIds[VehiclePropertyIds["INFO_EXTERIOR_DIMENSIONS"] = 289472779] = "INFO_EXTERIOR_DIMENSIONS";
        VehiclePropertyIds[VehiclePropertyIds["INFO_FUEL_CAPACITY"] = 291504388] = "INFO_FUEL_CAPACITY";
        VehiclePropertyIds[VehiclePropertyIds["INFO_FUEL_DOOR_LOCATION"] = 289407240] = "INFO_FUEL_DOOR_LOCATION";
        VehiclePropertyIds[VehiclePropertyIds["INFO_FUEL_TYPE"] = 289472773] = "INFO_FUEL_TYPE";
        VehiclePropertyIds[VehiclePropertyIds["INFO_MAKE"] = 286261505] = "INFO_MAKE";
        VehiclePropertyIds[VehiclePropertyIds["INFO_MODEL"] = 286261506] = "INFO_MODEL";
        VehiclePropertyIds[VehiclePropertyIds["INFO_MODEL_YEAR"] = 289407235] = "INFO_MODEL_YEAR";
        VehiclePropertyIds[VehiclePropertyIds["INFO_MULTI_EV_PORT_LOCATIONS"] = 289472780] = "INFO_MULTI_EV_PORT_LOCATIONS";
        VehiclePropertyIds[VehiclePropertyIds["INFO_VIN"] = 286261504] = "INFO_VIN";
        VehiclePropertyIds[VehiclePropertyIds["INVALID"] = 0] = "INVALID";
        VehiclePropertyIds[VehiclePropertyIds["MIRROR_FOLD"] = 287312709] = "MIRROR_FOLD";
        VehiclePropertyIds[VehiclePropertyIds["MIRROR_LOCK"] = 287312708] = "MIRROR_LOCK";
        VehiclePropertyIds[VehiclePropertyIds["MIRROR_Y_MOVE"] = 339741507] = "MIRROR_Y_MOVE";
        VehiclePropertyIds[VehiclePropertyIds["MIRROR_Y_POS"] = 339741506] = "MIRROR_Y_POS";
        VehiclePropertyIds[VehiclePropertyIds["MIRROR_Z_MOVE"] = 339741505] = "MIRROR_Z_MOVE";
        VehiclePropertyIds[VehiclePropertyIds["MIRROR_Z_POS"] = 339741504] = "MIRROR_Z_POS";
        VehiclePropertyIds[VehiclePropertyIds["NIGHT_MODE"] = 287310855] = "NIGHT_MODE";
        VehiclePropertyIds[VehiclePropertyIds["OBD2_FREEZE_FRAME"] = 299896065] = "OBD2_FREEZE_FRAME";
        VehiclePropertyIds[VehiclePropertyIds["OBD2_FREEZE_FRAME_CLEAR"] = 299896067] = "OBD2_FREEZE_FRAME_CLEAR";
        VehiclePropertyIds[VehiclePropertyIds["OBD2_FREEZE_FRAME_INFO"] = 299896066] = "OBD2_FREEZE_FRAME_INFO";
        VehiclePropertyIds[VehiclePropertyIds["OBD2_LIVE_FRAME"] = 299896064] = "OBD2_LIVE_FRAME";
        VehiclePropertyIds[VehiclePropertyIds["PARKING_BRAKE_AUTO_APPLY"] = 287310851] = "PARKING_BRAKE_AUTO_APPLY";
        VehiclePropertyIds[VehiclePropertyIds["PARKING_BRAKE_ON"] = 287310850] = "PARKING_BRAKE_ON";
        VehiclePropertyIds[VehiclePropertyIds["PERF_ODOMETER"] = 291504644] = "PERF_ODOMETER";
        VehiclePropertyIds[VehiclePropertyIds["PERF_REAR_STEERING_ANGLE"] = 291504656] = "PERF_REAR_STEERING_ANGLE";
        VehiclePropertyIds[VehiclePropertyIds["PERF_STEERING_ANGLE"] = 291504649] = "PERF_STEERING_ANGLE";
        VehiclePropertyIds[VehiclePropertyIds["PERF_VEHICLE_SPEED"] = 291504647] = "PERF_VEHICLE_SPEED";
        VehiclePropertyIds[VehiclePropertyIds["PERF_VEHICLE_SPEED_DISPLAY"] = 291504648] = "PERF_VEHICLE_SPEED_DISPLAY";
        VehiclePropertyIds[VehiclePropertyIds["RANGE_REMAINING"] = 291504904] = "RANGE_REMAINING";
        VehiclePropertyIds[VehiclePropertyIds["READING_LIGHTS_STATE"] = 356519683] = "READING_LIGHTS_STATE";
        VehiclePropertyIds[VehiclePropertyIds["READING_LIGHTS_SWITCH"] = 356519684] = "READING_LIGHTS_SWITCH";
        VehiclePropertyIds[VehiclePropertyIds["TIRE_PRESSURE_DISPLAY_UNITS"] = 289408514] = "TIRE_PRESSURE_DISPLAY_UNITS";
        VehiclePropertyIds[VehiclePropertyIds["TRACTION_CONTROL_ACTIVE"] = 287310859] = "TRACTION_CONTROL_ACTIVE";
        VehiclePropertyIds[VehiclePropertyIds["TURN_SIGNAL_STATE"] = 289408008] = "TURN_SIGNAL_STATE";
        VehiclePropertyIds[VehiclePropertyIds["VEHICLE_MAP_SERVICE"] = 299895808] = "VEHICLE_MAP_SERVICE";
        VehiclePropertyIds[VehiclePropertyIds["WHEEL_TICK"] = 290521862] = "WHEEL_TICK";
        VehiclePropertyIds[VehiclePropertyIds["WINDOW_LOCK"] = 320867268] = "WINDOW_LOCK";
        VehiclePropertyIds[VehiclePropertyIds["WINDOW_MOVE"] = 322964417] = "WINDOW_MOVE";
        VehiclePropertyIds[VehiclePropertyIds["WINDOW_POS"] = 322964416] = "WINDOW_POS";
    })(exports.VehiclePropertyIds || (exports.VehiclePropertyIds = {}));

    const VehiclePropertyService = core.registerPlugin('VehiclePropertyPlugin');
    /**
     * Used for breaking up packed function arguments, automotic and central logging for calls and maybe central error handling
     */
    class VehiclePropertyPlugin extends RestrictedVehicleDataProxy {
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

    exports.VehiclePropertyPlugin = VehiclePropertyPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
