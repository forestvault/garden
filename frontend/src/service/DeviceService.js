import axios from "axios";
import { DashCallback } from '../utils/CallbackUtils.js';
const DEVICE_URL = '/api/device/';

/*
 * Service for interacting with the device API endpoints.
 */
const DeviceService={
    /*
    * Deletes a device by its ID.
    * @param {number} id - The ID of the device to delete.
    * @param {function} onDelete - Callback function to execute after deletion.
    */
    deleteDevice:function(id, onDelete=(e)=>{ }) {
        axios.delete(DEVICE_URL + id)
        .then(response => onDelete(response.data.deleted));
    },
    /*
    * Retrieves a device by its ID.
    * @param {number} id - The ID of the device to retrieve.
    * @param {function} onRetrieve - Callback function to execute after retrieval.
    */
    device:function(id, onRetrieve) {
        axios.get(DEVICE_URL + id)
        .then(response => Dashcallback(onRetrieve));
    },
    /*
    * Retrieves all devices.
    * @param {function} onRetrieve - Callback function to execute after retrieval.
    */
    allDevices:function(onRetrieve) {
        console.log("Retrieving all devices". DEVICE_URL);
        axios.get(DEVICE_URL)
        .then(response=>DashCallback(response, onRetrieve, false));
    },
    /*
    * Adds a new device.
    * @param {string} name - The name of the device.
    * @param {string} type - The type of the device.
    * @param {string} ieeeAddress - The IEEE address of the device.
    * @param {string} manufacturerName - The manufacturer name of the device.
    * @param {function} onAddDevice - Callback function to execute after adding the device.
    */
    addDevice:function(name, type, ieeeAddress, manufacturerName, onAddDevice) {
        axios.post(DEVICE_URL, {'name' : name, 'type' : type, 'ieeeAddress' : ieeeAddress, 'manufacturerName' : manufacturerName})
        .then(response => DashCallback(response, onAddDevice));
    },
    /*
    * Updates an existing device.
    * @param {number} deviceId - The ID of the device to update.
    * @param {string} name - The new name of the device.
    * @param {string} type - The new type of the device.
    * @param {string} ieeeAddress - The new IEEE address of the device.
    * @param {string} manufacturerName - The new manufacturer name of the device.
    * @param {function} onDeviceUpdate - Callback function to execute after updating the device.
    */
    updateDevice:function(deviceId, name, type, ieeeAddress, manufacturerName, onDeviceUpdate) {
        axios.put(DEVICE_URL, {'id' : deviceId, 'name' : name, 'type' : type, 'ieeeAddress' : ieeeAddress, 'manufacturerName' : manufacturerName})
        .then(response => DashCallback(response, onDeviceUpdate));
    },
    /*
    * Adds a zone to a device.
    * @param {number} deviceId - The ID of the device.
    * @param {number} zoneId - The ID of the zone to add.
    * @param {function} onZoneAdded - Callback function to execute after adding the zone.
    */
    addZone:function(deviceId, zoneId, onZoneAdded) {
        axios.post(DEVICE_URL + 'addzone', {deviceId : deviceId, zoneId : zoneId})
        .then(response => {
            DashCallback(response, onZoneAdded);
        })
    },
    /*
    * Removes a zone from a device.
    * @param {number} deviceId - The ID of the device.
    * @param {number} zoneId - The ID of the zone to remove.
    * @param {function} onRemoveZone - Callback function to execute after removing the zone.
    */
    removeZone:function(deviceId, zoneId, onRemoveZone) {
        axios.post(DEVICE_URL + 'removezone', {deviceId : deviceId, zoneId : zoneId})
        .then(response => DashCallback(response, onRemoveZone));
    }
}
export default DeviceService;