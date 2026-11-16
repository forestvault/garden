/*
 * DeviceRegistry module. Maps device types to their corresponding device details components.
 * Provides a method to retrieve the appropriate component based on the device type.
 */
import Generic from "./settings/Generic";
import Camera from "./settings/Camera";
import Temperature from "./settings/Temperature";
import Ligth from "./settings/Ligth";
import Computer from "./settings/Computer";
const DeviceRegistry={
    /* 
     * Maps device types to their corresponding device details components.
     */
    GENERIC : Generic,
    CAMERA : Camera,
    TEMPERATURE : Temperature,
    LIGHT : Ligth,
    HUMIDITY : Generic,
    SOIL_MOISTURE : Generic,
    WATER_LEVEL : Generic,
    PUMP : Generic,
    FAN : Generic,
    HEATER : Generic,
    CO2_SENSOR : Generic,
    AIR_QUALITY_SENSOR : Generic,
    LIGHT_SENSOR : Generic,
    MOTION_SENSOR : Generic,
    DOOR_SENSOR : Generic,
    WINDOW_SENSOR : Generic,
    SMOKE_DETECTOR : Generic,
    GAS_DETECTOR : Generic,
    WATER_LEAK_DETECTOR : Generic,
    VIBRATION_SENSOR : Generic,
    SOUND_SENSOR : Generic,
    COMPUTER : Computer,
    /*
     * Retrieves the appropriate device details component based on the device type.
     * @param {string} deviceType - The type of the device.
     * @returns {React.Component} - The corresponding device details component.
     */
    getDeviceDetailsComponent: function(deviceType) {
        const deviceTypeUpper = deviceType.toUpperCase();
        return this[deviceTypeUpper]  || this.GENERIC;
    }
};
export default DeviceRegistry;