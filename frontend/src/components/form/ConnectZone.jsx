import { useTranslation } from "react-i18next";
import Keys from "../../config/Keys";

/*
 * ConnectZone component. Renders a list of zones that can be connected to a device.
 *
 * Props:
 * - device: The device to which zones can be connected.
 * - zones: List of all available zones.
 * - onConnectToDevice: Callback function to connect a zone to the device.
 */
const ConnectZone=({device, zones, onConnectToDevice})=>{
    const { t } = useTranslation();

    /* Return connect button if the zone is not already connected to the device. If it is connected, return an empty string. */
    const connectButton=(zone)=>{
        if(device.zones.some(z=>z.id===zone.id)){
            return '';
        }
        return (<button type="button" onClick={(e)=>{
            e.stopPropagation();
            onConnectToDevice(device.id, zone);}
        } className="bg-sky-600 hover:bg-sky-500 rounded-2xl p-2">{t(Keys.GENERIC.CONNECT)}</button>);
    }

    return (<section className="flex flex-col bg-gray-200 p-2 text-white">
        <ul>
          {zones.map(zone=>{
            return (<li key={zone.id} className="flex flex-row justify-between" style={{backgroundColor: zone.color}}>
              <span>{zone.name}</span>
              {connectButton(zone)}
            </li>);
          }
        )
        }
        </ul>
    </section>);
}
export default ConnectZone;