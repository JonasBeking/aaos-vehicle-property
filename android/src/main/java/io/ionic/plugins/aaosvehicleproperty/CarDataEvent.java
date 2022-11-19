package io.ionic.plugins.aaosvehicleproperty;

import android.car.hardware.CarPropertyValue;

import io.ionic.plugins.aaosdatautils.dataevent.DataValueEvent;


public class CarDataEvent extends DataValueEvent {

    enum Name{
        CHANGE,
        VIEW
    }

    CarDataEvent(CarDataEvent.Name eventName, CarPropertyValue carPropertyValue) {
        super(eventName.ordinal());
        putData("propertyId",carPropertyValue.getPropertyId());
        putData("value",carPropertyValue.getValue());
    }

}
