import { IoMdBulb, IoMdCamera, IoMdDesktop, IoMdHammer, IoMdMove, IoMdRainy, IoMdSettings, IoMdSpeedometer, IoMdThermometer } from "react-icons/io";

/*
 * Device icon component.
 *
 * Renders icon based on the device type.
 * Supported types:
 * - TEMPERATURE
 * - HUMIDITY
 * - ACTUATOR
 * - LIGHT
 * - CAMERA
 * - SENSOR
 * - MOTION
 * - GENERIC
 * 
 */
const DeviceIcon=({deviceType='GENERIC'})=>{
    switch(deviceType) {
        case 'TEMPERATURE':
            return (<IoMdThermometer />);
        case 'HUMIDITY':
            return (<IoMdRainy />);
        case 'ACTUATOR':
            return (<IoMdHammer  />);
        case 'LIGHT':
            return (<IoMdBulb />);
        case 'CAMERA':
            return (<IoMdCamera />);
        case 'SENSOR':
            return (<IoMdSpeedometer />);
        case 'MOTION':
            return (<IoMdMove />);
        case 'COMPUTER':
            return (<IoMdDesktop />);
        case 'GENERIC':
        default:
            return (<IoMdSettings />);
    }
}
export default DeviceIcon;