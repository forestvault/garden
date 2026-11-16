import { useState } from "react";
import DeviceService from "../../service/DeviceService";
import { useTranslation } from "react-i18next";
import Keys from "../../config/Keys";

/*
 * Add device form/section component.
 *
 * Handles adding new device.
 * 
 * Properties:
 * - onAddDevice - Callback function
 * - deviceTypes - Array of available device types
 */
const AddDevice = ({ onAddDevice, deviceTypes }) => {
    const [deviceName, setDeviceName] = useState('');
    const [selectedDeviceType, setSelectedDeviceType] = useState(Array.isArray(deviceTypes) ? deviceTypes[0] : '');
    const [ieeeAddress, setIeeeAddress] = useState('');
    const { t } = useTranslation();

    const handleAddDevice = async () => {
        if (deviceName.trim() === '' || selectedDeviceType.trim() === '') {
            alert('Please enter both device name and type.');
            return;
        }

        DeviceService.addDevice(deviceName, selectedDeviceType, ieeeAddress, (e)=>{
            onAddDevice(e.newDevice);
            setDeviceName('');
            setSelectedDeviceType('');
            setIeeeAddress('');
        });
    };

    return (
        <section className="flex-col bg-zinc-700 border-color-zinc-300 border-2 p-2">
            <h2>Add Device</h2>
            <span className="flex">
                <label>{t(Keys.DEVICE.NAME)}:</label>
                <input
                    type="text"
                    placeholder={t(Keys.DEVICE.NAME)}
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                />
            </span>
            <span className="flex">
                <label>{t(Keys.DEVICE.IEEE_ADDRESS)}:</label>
                <input
                    type="text"
                    placeholder="IEEE Address"
                    value={ieeeAddress}
                    onChange={(e) => setIeeeAddress(e.target.value)}
                />
            </span>
            <span className="flex">
                <label>{t(Keys.DEVICE.TYPE)}:</label>
                <select name="devicetype" id="devicetype" onChange={(e)=>setSelectedDeviceType(e.target.value)} className="text-black">
                    {deviceTypes?.map(deviceType=>{
                        return (<option value={deviceType} key={deviceType}>{deviceType}</option>);
                    })}
                </select>
            </span>
            <button onClick={handleAddDevice} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500">
                Add Device
            </button>
        </section>
    );
};

export default AddDevice;