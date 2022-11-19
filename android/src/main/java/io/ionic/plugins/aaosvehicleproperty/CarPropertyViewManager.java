package io.ionic.plugins.aaosvehicleproperty;

import android.car.Car;
import android.car.VehicleAreaType;
import android.car.hardware.CarPropertyValue;
import android.car.hardware.property.CarPropertyManager;
import android.content.Context;
import com.getcapacitor.Bridge;
import com.getcapacitor.PluginCall;

import io.ionic.plugins.aaosdatautils.dataerror.DataViewRegisterException;
import io.ionic.plugins.aaosdatautils.dataview.DataView;
import io.ionic.plugins.aaosdatautils.dataview.DataViewManager;


public class CarPropertyViewManager extends DataViewManager<CarPropertyCallback> {

    private final CarPropertyManager carPropertyManager;

    CarPropertyViewManager(Context context)  {
        Car car = Car.createCar(context);
        this.dataCallbackBuilder = new CarPropertyCallback.Builder();
        this.carPropertyManager = (CarPropertyManager) car.getCarManager(Car.PROPERTY_SERVICE);
    }

    @Override
    public DataView<CarPropertyCallback> generate(PluginCall pluginCall, Integer dataId, String addressableName, Boolean isActive) {
        DataView<CarPropertyCallback> dataView = super.generate(pluginCall,dataId,addressableName,isActive);
        boolean successfullyRegistered = carPropertyManager.registerCallback(dataView.getCallback(),dataId,CarPropertyManager.SENSOR_RATE_ONCHANGE);
        if(!successfullyRegistered) {
            throw new DataViewRegisterException(dataId);
        }
        return dataView;
    }

    @Override
    public DataView<CarPropertyCallback> remove(String addressableName, Bridge bridge) {
        DataView<CarPropertyCallback> dataView = super.remove(addressableName, bridge);
        carPropertyManager.unregisterCallback(dataView.getCallback());
        return dataView;
    }
    public CarDataEvent quickView(Integer dataId) {
        CarPropertyValue carPropertyValue = carPropertyManager.getProperty(dataId,VehicleAreaType.VEHICLE_AREA_TYPE_GLOBAL);
        return new CarDataEvent(CarDataEvent.Name.VIEW,carPropertyValue);
    }

}
