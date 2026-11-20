import { IoMdDocument, IoMdSettings, IoMdTrash } from "react-icons/io";
import Status from "../Status";
import DeviceIcon from "./DeviceIcon";
import { Link } from "react-router-dom";

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
    const GoTo=()=>{
        window.location=`/device/${device.id}`;
    }
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
        <IoMdDocument 
            onClick={()=>{GoTo()}}
            className="color-white cursor-pointer" />
    </li>)
}
export default DeviceRow;