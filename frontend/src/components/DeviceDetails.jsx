import { useEffect, useState } from "react";
import DeviceService from "../service/DeviceService";
import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";
import ZoneList from "./ZoneList";
import DeviceRegistry from "./devices/DeviceRegistry";
import ZoneService from "../service/ZoneService";
import ConnectZone from "./form/ConnectZone";
import ZonesOnDevice from "./devices/ZonesOnDevice";

/*
 * DeviceDetails component. Renders details of a device.
 * Component for device details.
 * Uses DeviceRegistry to get the appropriate device details component based on the device type.
 *
 */
const DeviceDetails = ({ device, hide, onUpdate, deviceTypes, onAddZoneToDevice, onRemoveZoneFromDevice }) => {
    // Keep device in local state so the modal re-renders when mutated
    const [currentDevice, setCurrentDevice] = useState(device);
    
    const [name, setName] = useState(currentDevice.name);
    const [deviceType, setTypeDevice] = useState(currentDevice.type);
    const [ieeeAddress, setIeeeAddress] = useState(currentDevice.ieeeAddress);
    const [addZoneVisible, setAddZoneVisible] = useState(false);
    const [allZones, setAllZones] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        ZoneService.allZones((zones) => {
            setAllZones(zones);
        });
    }, []);

    const updateDevice = () => {
        DeviceService.updateDevice(currentDevice.id, name, deviceType, ieeeAddress, onUpdate);
        hide();
    };

    // Wrapper for adding a zone that updates local modal state
    const handleAddZoneToDevice = (deviceId, zone) => {
        if (typeof onAddZoneToDevice === 'function') {
            onAddZoneToDevice(deviceId, zone, (updatedDevice) => {
                setCurrentDevice(updatedDevice);
            });
        }
        setAddZoneVisible(false);
    };

    // Wrapper for removing a zone that updates local modal state
    const handleRemoveZoneFromDevice = (deviceId, zoneId) => {
        if (typeof onRemoveZoneFromDevice === 'function') {
            onRemoveZoneFromDevice(deviceId, zoneId, (updatedDevice) => {
                setCurrentDevice(updatedDevice);
            });
        }
    };

    const style = "rounded bg-sky-800 hover:bg-sky-500 cursor-pointer p-2";
    const DeviceDetailsComponent = DeviceRegistry.getDeviceDetailsComponent(deviceType);

    return (
        <section className="bg-sky-900">
            <form className="flex flex-col">
                <div className="flex flex-row">
                    <label>{t(Keys.GENERIC.NAME)}:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-1" />
                </div>
                <div className="flex flex-row">
                    <label>{t(Keys.DEVICE.IEEE_ADDRESS)}:</label>
                    <input type="text" value={ieeeAddress} onChange={(e) => setIeeeAddress(e.target.value)} className="border-1" />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <label>{t(Keys.GENERIC.ZONE)}:</label>
                        <button onClick={() => setAddZoneVisible(!addZoneVisible)} className={style} type="button">
                            {t(Keys.GENERIC.ADD)}
                        </button>
                    </div>
                    {/* Use currentDevice.zones instead of device.zones */}
                    <ZonesOnDevice deviceId={currentDevice.id} zones={currentDevice.zones} onRemoveZoneFromDevice={handleRemoveZoneFromDevice} />
                    {addZoneVisible && <ConnectZone device={currentDevice} zones={allZones} onConnectToDevice={handleAddZoneToDevice} />}
                </div>
                <div className="flex flex-row">
                    <label>{t(Keys.GENERIC.TYPE)}:</label>
                    <select onChange={(e) => setTypeDevice(e.target.value)} className="block text-black" value={deviceType}>
                        {deviceTypes.map(dt => (
                            <option value={dt} key={dt}>{dt}</option>
                        ))}
                    </select>
                    <DeviceDetailsComponent device={currentDevice} />
                </div>
            </form>
            <div className="flex flex-row justify-between">
                <button onClick={updateDevice} className={style}>{t(Keys.GENERIC.UPDATE)}</button>
                <button onClick={hide} className={style}>{t(Keys.GENERIC.CANCEL)}</button>
            </div>
        </section>
    );
};

export default DeviceDetails;