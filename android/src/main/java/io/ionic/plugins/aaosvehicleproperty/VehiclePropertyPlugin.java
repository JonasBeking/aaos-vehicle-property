package io.ionic.plugins.aaosvehicleproperty;

import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

import io.ionic.plugins.aaosdatautils.DataPlugin;
import io.ionic.plugins.aaosdatautils.dataerror.MissingPluginCallArgumentException;
import io.ionic.plugins.aaosdatautils.datapermissions.AutomotiveData;

@AutomotiveData(allowedIds = {291504647,289410817})
@CapacitorPlugin(name = "VehiclePropertyPlugin",permissions = {@Permission(strings = {"android.car.permission.CAR_SPEED"},alias = "android.car.permission.CAR_SPEED"),@Permission(strings = {"android.car.permission.READ_CAR_INTERIOR_LIGHTS"},alias = "android.car.permission.READ_CAR_INTERIOR_LIGHTS")})
public class VehiclePropertyPlugin extends DataPlugin<CarPropertyCallback> {

    @Override
    public void load() {
        this.dataViewManager = new CarPropertyViewManager(super.getContext());
        this.dataErrorHandler = new CarDataErrorHandler();
        super.load();
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
