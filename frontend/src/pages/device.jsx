import { useParams } from "react-router-dom";
import DeviceService from "../service/DeviceService";
import { useEffect, useState } from "react";
import DeviceRegistry from "../components/devices/DeviceRegistry";

const RenderDevice=({device})=>{
    if(!device) {
        return <h1>No Device</h1>;
    }

    const DevicePageComponent = DeviceRegistry.getDevicePageComponent(device.type);
    return <DevicePageComponent device={device} />;
}

const Device=()=>{
    let { deviceId } = useParams();
    const [device, setCurrentDevice] = useState(null);
    useEffect(()=>{
        // Get device information
        DeviceService.device(deviceId, (device)=>{
            console.log(device.device);
            setCurrentDevice(device.device);
        });
    }, []);
    return (<section>
            <RenderDevice device={device} />
        </section>);
}
export default Device;