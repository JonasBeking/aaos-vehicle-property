package io.ionic.plugins.aaosvehicleproperty.carproperty;

import android.car.hardware.CarPropertyValue;

import io.ionic.plugins.aaosdatautils.dataevent.DataEvent;


public class CarDataEvent extends DataEvent {

    CarDataEvent(String eventName, CarPropertyValue carPropertyValue) {
        super(eventName);
        putData("propertyId",carPropertyValue.getPropertyId());
        putData("value",carPropertyValue.getValue());
    }

}
