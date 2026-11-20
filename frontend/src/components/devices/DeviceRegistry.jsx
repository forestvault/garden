/*
 * DeviceRegistry module. Maps device types to their corresponding device details components.
 * Provides a method to retrieve the appropriate component based on the device type.
 */
import Generic from "./settings/Generic";
import Camera from "./settings/Camera";
import Temperature from "./settings/Temperature";
import Ligth from "./settings/Ligth";
import Computer from "./settings/Computer";
import ComputerPage from './page/ComputerPage';
import GenericPage from './page/GenericPage';
import TemperaturePage from "./page/TemperaturePage";
import MotionSensorPage from "./page/MotionSensorPage";
import CameraPage from "./page/CameraPage";
import LigthPage from "./page/LigthPage";
import ActuatorPage from "./page/ActuatorPage";
import HumidityPage from "./page/HumidityPage";
import SoilMoisturePage from "./page/SoilMoisturePage";
import WaterLevelPage from "./page/WaterLevelPage";
import PumpPage from "./page/PumpPage";
import FanPage from "./page/FanPage";
import HeaterPage from "./page/HeaterPage";
import Co2SensorPage from "./page/Co2Sensor";
import AirQualitySensorPage from "./page/AirQualitySensorPage";
import LigthSensorPage from "./page/LigthSensorPage";
import DoorSensorPage from "./page/DoorSensorPage";
import WindowSensorPage from "./page/WindowSensorPage";
import SmokeDetectorPage from "./page/SmokeDetectorPage";
import GasDetectorPage from "./page/GasDetectorPage";
import WaterLeakDetectorPage from "./page/WaterLeakDetectorPage";
import VibrationSensorPage from "./page/VibratorSensorPage";
import SoundSensorPage from "./page/SounSenserPage";
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
    MOTION : Generic,
    DOOR_SENSOR : Generic,
    WINDOW_SENSOR : Generic,
    SMOKE_DETECTOR : Generic,
    GAS_DETECTOR : Generic,
    WATER_LEAK_DETECTOR : Generic,
    VIBRATION_SENSOR : Generic,
    SOUND_SENSOR : Generic,
    COMPUTER : Computer,
    DevicePage : {
        COMPUTER : ComputerPage,
        GENERIC : GenericPage,
        TEMPERATURE : TemperaturePage,
        MOTION : MotionSensorPage,
        CAMERA : CameraPage,
        LIGHT : LigthPage,
        ACTUATOR : ActuatorPage,
        HUMIDITY : HumidityPage,
        SOIL_MOISTURE : SoilMoisturePage,
        WATER_LEVEL : WaterLevelPage,
        PUMP : PumpPage,
        FAN : FanPage,
        HEATER : HeaterPage,
        CO2_SENSOR : Co2SensorPage,
        AIR_QUALITY_SENSOR : AirQualitySensorPage,
        LIGHT_SENSOR : LigthSensorPage,
        DOOR_SENSOR : DoorSensorPage,
        WINDOW_SENSOR : WindowSensorPage,
        SMOKE_DETECTOR : SmokeDetectorPage,
        GAS_DETECTOR : GasDetectorPage,
        WATER_LEAK_DETECTOR : WaterLeakDetectorPage,
        VIBRATION_SENSOR : VibrationSensorPage,
        SOUND_SENSOR : SoundSensorPage,
    },
    /*
     * Retrieves the appropriate device details component based on the device type.
     * @param {string} deviceType - The type of the device.
     * @returns {React.Component} - The corresponding device details component.
     */
    getDeviceDetailsComponent: function(deviceType) {
        const deviceTypeUpper = deviceType.toUpperCase();
        return this[deviceTypeUpper]  || this.GENERIC;
    },
    getDevicePageComponent: function(deviceType) {
        const deviceTypeUpper = deviceType.toUpperCase();
        return this.DevicePage[deviceTypeUpper] || this.DevicePage.GENERIC;
    }
};
export default DeviceRegistry;