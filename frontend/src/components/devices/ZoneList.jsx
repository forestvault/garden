import { IoMdRemove } from "react-icons/io";
import DeviceService from "../../service/DeviceService";

/*
 * ZoneList component. Renders list of zones in a device.
 * Component for device details.
 *
 */
const ZoneList=({zones, deviceId, onRemoveZone})=>{
    const {t} = useTranslation();
    if(Array.isArray(zones)) {
        if(zones.length === 0) {
            return (<div>
                {t("NO_ZONES")}
            </div>)
        }

        return (<ul>
            {zones.map(zone => {
                return (<li key={zone.id+'-'+deviceId+'-zonelist'}>
                    {zone.name}
                    <IoMdRemove onClick={()=>{
                        DeviceService.removeZone(deviceId, zone.id, onRemoveZone);
                    }} className="cursor-pointer" />
                </li>)
            })}
        </ul>)
    }
}
export default ZoneList;