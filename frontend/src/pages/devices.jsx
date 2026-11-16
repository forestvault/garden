import { useEffect, useState } from "react";
import AddDevice from "../components/form/AddDevice";
import DeviceService from "../service/DeviceService";
import { useDialog } from "../context/Dialog";
import DeviceDetails from "../components/DeviceDetails";
import DeviceRow from "../components/devices/DeviceRow";
import DeviceTypeService from "../service/DeviceTypesService";
import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";

/*
 * Devices component
 *
 * Fetches and renders a list of all devices added to the system.
 * 
 */
const Devices = () => {
    // Devices that are added to the system
    const [devices, setDevices] = useState([]);
    // Available device types
    const [deviceTypes, setDeviceTypes] = useState([]);
    // Add device form visibility
    const [addDeviceVisible, setAddDeviceVisible] = useState(false);
    // Device details dialog
    const {showDialog, hideDialog} = useDialog();
    const { t } = useTranslation();

    // Fetch all devices
    useEffect(()=>{
        DeviceService.allDevices((devices)=>setDevices(devices));
        setAddDeviceVisible(false);
    }, []);

    // Add device callback function
    const addedDevice=(addedDevice)=> {
        console.log("Added device: ", addedDevice);
        setDevices(previous => {
            if (Array.isArray(previous)) {
                return [...previous, {...addedDevice, online : false}];
            }
            return previous;
        })
        setAddDeviceVisible(false);
    }

    // Update callback function
    const onUpdateDevice=(updatedDevice)=>{
        setDevices(previous => {
            const updatedList = previous.map(device => {
                if(device.id === updatedDevice.updated.id)
                {
                    return updatedDevice.updated;
                }
                return device;
            });
            return updatedList;
        });
    }

    //Callback to add zone to device
    const addZoneToDevice = (deviceId, zone, callback) => {
        DeviceService.addZone(deviceId, zone.id, (response) => {
            const updatedDevice = response.device; // Adjust to response.device or response depending on your API
            
            // Update the parent devices list (for background/future renders)
            setDevices(previous => {
                return previous.map(device => {
                    if (device.id === updatedDevice.id) {
                        return updatedDevice;
                    }
                    return device;
                });
            });

            // Notify the modal so it updates its view immediately
            if (typeof callback === 'function') {
                callback(updatedDevice);
            }
        });
    }
 
    // Callback to remove Zone from device
    const removeZoneFromDevice=(deviceId, zoneId, callback)=>{
        DeviceService.removeZone(deviceId, zoneId, (response)=>{
            const updatedDevice = response.device; // Adjust to response.device or response depending on your API
            
            // 1. Update the parent devices list (for background/future renders)
            setDevices(previous => {
                return previous.map(device => {
                    if (device.id === updatedDevice.id) {
                        return updatedDevice;
                    }
                    return device;
                });
            });
            if (typeof callback === 'function') {
                callback(updatedDevice);
            }
        });
    }

    // Delete callback function
    const onDelete=(id)=>{
                        DeviceService.deleteDevice(id, (deleted)=>{
                                setDevices(previous => previous.filter(device=>device.id!==deleted.id));
                            })
                        }

    // Fetch available device types
    useEffect(() => {
        DeviceTypeService.allTypes((deviceTypes)=>setDeviceTypes(deviceTypes));
    }, []);

    // Render component
    return (
        <div>
            <h1>{t(Keys.PAGE.TITLE.DEVICES)}</h1>
            {addDeviceVisible && <AddDevice onAddDevice={addedDevice} deviceTypes={deviceTypes}/>}
            <button onClick={()=>setAddDeviceVisible(!addDeviceVisible)} className="bg-sky-600 hover:bg-sky-500 rounded-2xl p-2">{addDeviceVisible ? 'Cancel' : 'Add Device'}</button>
            <ul className="w-full md:w-1/2">
                {devices?.map(device => (
                    <DeviceRow 
                        key={device.id+'-device-row'}
                        openSettings={() => showDialog(
                            <DeviceDetails
                                device={device}
                                hide={() => hideDialog()}
                                deviceTypes={deviceTypes}
                                onAddZoneToDevice={addZoneToDevice}
                                onRemoveZoneFromDevice={removeZoneFromDevice}
                                onUpdate={onUpdateDevice}
                                key={device.id+'-details'}
                            />, 
                            'Update Device'
                        )}
                        device={device} 
                        onDelete={() => onDelete(device.id)} 
                        onRemoveZoneFromDevice={removeZoneFromDevice}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Devices;