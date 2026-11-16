import { useTranslation } from "react-i18next";
import Keys from "../../config/Keys";
import { IoMdTrash } from "react-icons/io";

/*
 * ZonesOnDevice component. Renders a list of zones that are connected to a device.
 *
 * Props:
 * - deviceId: The ID of the device.
 * - zones: List of zones connected to the device.
 * - onRemoveZoneFromDevice: Callback function to remove a zone from the device.
 */
const ZonesOnDevice = ({ deviceId, onRemoveZoneFromDevice, zones }) => {
    const { t } = useTranslation();

    return (
        <div>
            <h3>{t(Keys.GENERIC.ZONES_ON_DEVICE)}</h3>
            <ul className="flex-col">
                {zones.map((zone) => (
                    <li key={'zone-'+zone.id} style={{ backgroundColor: zone.color }} className="flex flex-row justify-between items-center p-2 m-1 rounded">
                        <a href={zone.location}>
                            {zone.name}
                        </a>
                        <IoMdTrash onClick={() => onRemoveZoneFromDevice(deviceId, zone.id)} className="p-1 cursor-pointer" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ZonesOnDevice;