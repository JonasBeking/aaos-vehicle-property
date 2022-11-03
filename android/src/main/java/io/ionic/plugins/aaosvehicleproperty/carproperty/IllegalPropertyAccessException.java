package io.ionic.plugins.aaosvehicleproperty.carproperty;

import android.car.VehiclePropertyIds;

import androidx.annotation.NonNull;

public class IllegalPropertyAccessException extends RuntimeException{

    private final Integer dataId;

    public IllegalPropertyAccessException(Integer dataId){
        this.dataId = dataId;
    }

    @NonNull
    @Override
    public String toString() {
        return "No permissions to access the property: " + VehiclePropertyIds.toString(this.dataId);
    }
}
