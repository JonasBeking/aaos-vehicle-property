package io.ionic.plugins.aaosvehicleproperty.carproperty;

import android.car.hardware.property.CarInternalErrorException;
import android.car.hardware.property.PropertyNotAvailableAndRetryException;
import android.car.hardware.property.PropertyNotAvailableException;


import com.getcapacitor.PluginCall;

import io.ionic.plugins.aaosdatautils.dataerror.DataErrorHandler;

public class CarDataErrorHandler extends DataErrorHandler {
    @Override
    public void handle(Exception e, PluginCall pluginCall) {
        if(e instanceof SecurityException) {
            finish("Missing permission to access this data",pluginCall);
        } else if(e instanceof CarInternalErrorException) {
            finish("Car has internal error",pluginCall);
        } else if (e instanceof PropertyNotAvailableAndRetryException) {
            finish("Property is temporarily not available",pluginCall);
        } else if (e instanceof PropertyNotAvailableException) {
            finish("Property is not available",pluginCall);
        } else if(e instanceof IllegalPropertyAccessException) {
            finish("No Access to this property",pluginCall);
        }else{
            super.handle(e, pluginCall);
        }
    }
}
