package io.ionic.plugins.aaosvehicleproperty.carproperty;

import android.car.hardware.CarPropertyValue;
import android.car.hardware.property.CarPropertyManager;
import android.util.Log;

import io.ionic.plugins.aaosdatautils.datacallback.DataCallback;
import io.ionic.plugins.aaosdatautils.datacallback.DataCallbackBuilder;
import io.ionic.plugins.aaosdatautils.dataevent.ErrorEvent;
import io.ionic.plugins.aaosdatautils.dataview.DataView;

public class CarPropertyCallback implements DataCallback<CarPropertyCallback>, CarPropertyManager.CarPropertyEventCallback {

    private final String TAG = "CarPropertyCallback";
    DataView<CarPropertyCallback> dataView;

    CarPropertyCallback(DataView<CarPropertyCallback> dataView) {
        this.dataView = dataView;
    }

    @Override
    public DataView<CarPropertyCallback> getDataView() {
        return this.dataView;
    }

    @Override
    public void onChangeEvent(CarPropertyValue carPropertyValue) {
        Log.d(TAG,"Received changed value: " + carPropertyValue.getValue() + " for property: " + carPropertyValue.getPropertyId());
        CarDataEvent carDataEvent = new CarDataEvent("change",carPropertyValue);
        passDataToView(carDataEvent);
    }

    @Override
    public void onErrorEvent(int propertyId, int zone) {
        Log.w(TAG, "Received error car property event, propId=" + propertyId);
        ErrorEvent errorEvent = new ErrorEvent("unknown");
        passDataToView(errorEvent);
    }

    public static class Builder implements DataCallbackBuilder<CarPropertyCallback> {

        @Override
        public CarPropertyCallback build(DataView<CarPropertyCallback> dataView) {
            return new CarPropertyCallback(dataView);
        }
    }
}
