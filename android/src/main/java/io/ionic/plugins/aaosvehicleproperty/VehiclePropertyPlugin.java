package io.ionic.plugins.aaosvehicleproperty.carproperty;

import android.car.Car;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

import io.ionic.plugins.aaosdatautils.DataPlugin;
import io.ionic.plugins.aaosdatautils.dataerror.MissingPluginCallArgumentException;


@CapacitorPlugin(
        name = "VehiclePropertyPlugin",
        permissions = {
                @Permission(
                        strings = {Car.PERMISSION_SPEED},
                        alias = Car.PERMISSION_SPEED
                ),
                @Permission(
                        strings = {Car.PERMISSION_CAR_CONTROL_AUDIO_VOLUME},
                        alias = Car.PERMISSION_CAR_CONTROL_AUDIO_VOLUME
                ),
                @Permission(
                        strings = {Car.PERMISSION_CAR_CONTROL_AUDIO_SETTINGS},
                        alias = Car.PERMISSION_CAR_CONTROL_AUDIO_SETTINGS
                ),
                @Permission(
                        strings = {Car.PERMISSION_READ_DISPLAY_UNITS},
                        alias = Car.PERMISSION_READ_DISPLAY_UNITS
                ),
                @Permission(
                        strings = {Car.PERMISSION_POWERTRAIN},
                        alias = Car.PERMISSION_POWERTRAIN
                ),
                @Permission(
                        strings = {Car.PERMISSION_ENERGY},
                        alias = Car.PERMISSION_ENERGY
                ),
                @Permission(
                        strings = {Car.PERMISSION_ENERGY_PORTS},
                        alias = Car.PERMISSION_ENERGY_PORTS
                ),
                @Permission(
                        strings = {Car.PERMISSION_CAR_INFO},
                        alias = Car.PERMISSION_CAR_INFO
                ),
                @Permission(
                        strings = {Car.PERMISSION_EXTERIOR_ENVIRONMENT},
                        alias = Car.PERMISSION_EXTERIOR_ENVIRONMENT
                ),
                @Permission(
                        strings = {Car.PERMISSION_CAR_NAVIGATION_MANAGER},
                        alias = Car.PERMISSION_CAR_NAVIGATION_MANAGER
                ),
                @Permission(
                        strings = {Car.PERMISSION_CONTROL_DISPLAY_UNITS},
                        alias = Car.PERMISSION_CONTROL_DISPLAY_UNITS
                ),
                @Permission(
                        strings = {Car.PERMISSION_CONTROL_INTERIOR_LIGHTS},
                        alias = Car.PERMISSION_CONTROL_INTERIOR_LIGHTS
                ),
                @Permission(
                        strings = {Car.PERMISSION_IDENTIFICATION},
                        alias = Car.PERMISSION_IDENTIFICATION
                ),
                @Permission(
                        strings = {Car.PERMISSION_READ_INTERIOR_LIGHTS},
                        alias = Car.PERMISSION_READ_INTERIOR_LIGHTS
                ),
                @Permission(
                        strings = {Car.PERMISSION_READ_STEERING_STATE},
                        alias = Car.PERMISSION_READ_STEERING_STATE
                ),
        }
)
public class VehiclePropertyPlugin extends DataPlugin<CarPropertyCallback> {

    @Override
    public void load() {
        this.dataViewManager = new CarPropertyViewManager(super.getContext());
        this.dataErrorHandler = new CarDataErrorHandler();
        super.load();
        this.processingChain.add(pluginCall -> {
            if(pluginCall.hasOption("dataId")) {
                Integer dataId = pluginCall.getInt("dataId");
                if(dataId == null) {
                    return;
                }
                return;
                //String [] allowedVehicleProperties = this.getConfig().getArray("allowedVehicleProperties");

                //for(String property : allowedVehicleProperties) {
                //    if(Integer.valueOf(property).equals(dataId)) {
                //        return;
                //    }
                //}
                //throw new IllegalPropertyAccessException(dataId);

            }
        });
    }

    @PluginMethod()
    public void quickView(PluginCall call) {
        this.processingChain.executeWithFinal(call,pluginCall -> {
            Integer dataId = pluginCall.getInt("dataId");
            if(dataId == null) {
                throw new MissingPluginCallArgumentException("dataId");
            }
            CarDataEvent event = ((CarPropertyViewManager)this.dataViewManager).quickView(dataId);
            pluginCall.resolve(event);
        });
    }
}
