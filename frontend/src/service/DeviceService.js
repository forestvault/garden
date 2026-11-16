import axios from "axios";
import { DashCallback } from '../utils/CallbackUtils.js';
const DEVICE_URL = '/api/device/';

const DeviceService={
    deleteDevice:function(id, onDelete=(e)=>{ }) {
        axios.delete(DEVICE_URL + id)
        .then(response => onDelete(response.data.deleted));
    },
    device:function(id, onRetrieve) {
        axios.get(DEVICE_URL + id)
        .then(response => Dashcallback(onRetrieve));
    },
    allDevices:function(onRetrieve) {
        console.log("Retrieving all devices". DEVICE_URL);
        axios.get(DEVICE_URL)
        .then(response=>DashCallback(response, onRetrieve, false));
    },
    addDevice:function(name, type, ieeeAddress, onAddDevice) {
        axios.post(DEVICE_URL, {'name' : name, 'type' : type, 'ieeeAddress' : ieeeAddress})
        .then(response => DashCallback(response, onAddDevice));
    },
    updateDevice:function(deviceId, name, type, ieeeAddress, onDeviceUpdate) {
        axios.put(DEVICE_URL, {'id' : deviceId, 'name' : name, 'type' : type, 'ieeeAddress' : ieeeAddress})
        .then(response => DashCallback(response, onDeviceUpdate));
    },
    addZone:function(deviceId, zoneId, onZoneAdded) {
        axios.post(DEVICE_URL + 'addzone', {deviceId : deviceId, zoneId : zoneId})
        .then(response => {
            DashCallback(response, onZoneAdded);
        })
    },
    removeZone:function(deviceId, zoneId, onRemoveZone) {
        axios.post(DEVICE_URL + 'removezone', {deviceId : deviceId, zoneId : zoneId})
        .then(response => DashCallback(response, onRemoveZone));
    }
}
export default DeviceService;