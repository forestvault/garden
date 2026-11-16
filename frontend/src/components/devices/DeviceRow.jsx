import { IoMdSettings, IoMdTrash } from "react-icons/io";
import Status from "../Status";
import DeviceIcon from "./DeviceIcon";

/*
 * Device row component.
 *
 * Renders row of device. Uses Status and DeviceIcon components.
 * 
 * Properties:
 * device - JSON object of the device
 * openSettings - Function for opening device details view
 * onDelete - Function for deleting/unregistering device
 */
const DeviceRow=({device, openSettings, onDelete})=>{
    return (<li key={'device-'+device.id} className="flex items-center gap-2 hover:bg-sky-700">
        <Status status={device.online} />
        <DeviceIcon deviceType={device.type} />
        <strong>
            {device.name}
        </strong>
        <IoMdSettings 
            onClick={()=>{openSettings()}}
            className="cursor-pointer" />
        <IoMdTrash 
            onClick={onDelete}
            className="cursor-pointer" />
    </li>)
}
export default DeviceRow;