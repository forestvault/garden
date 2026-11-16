import axios from 'axios';
const DEVICE_TYPES_URL='http://localhost:8081/homelab/api/device/';
const DeviceTypeService={
    allTypes:function(onDeviceTypes) {
        axios.get(DEVICE_TYPES_URL + 'types')
        .then(response => onDeviceTypes(response.data));
    }
}
export default DeviceTypeService;