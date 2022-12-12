package io.ionic.plugins.aaosvehicleproperty;

import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

import io.ionic.plugins.aaosdatautils.DataPlugin;
import io.ionic.plugins.aaosdatautils.dataerror.MissingPluginCallArgumentException;
import io.ionic.plugins.aaosdatautils.datapermissions.AutomotiveData;

@AutomotiveData(allowedIds = {289408001,291504903,291504388})
@CapacitorPlugin(name = "VehiclePropertyPlugin",permissions = {@Permission(strings = {"android.car.permission.CAR_POWERTRAIN"},alias = "android.car.permission.CAR_POWERTRAIN"),@Permission(strings = {"android.car.permission.CAR_ENERGY"},alias = "android.car.permission.CAR_ENERGY"),@Permission(strings = {"android.car.permission.CAR_INFO"},alias = "android.car.permission.CAR_INFO")})
public class VehiclePropertyPlugin extends DataPlugin<CarPropertyCallback> {

    protected static String TAG = "VehiclePropertyPlugin";

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
