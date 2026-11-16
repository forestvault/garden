import { useEffect, useState } from "react";
import ZoneList from "../components/ZoneList";
import AddZone from "../components/form/AddZone";
import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";
import ZoneService from '../service/ZoneService.js';

/*
 * Zone page component.
 *
 * Retrieves zones and displays them.
 */
const Zone = () => {
    const [zonesVisible, setZonesVisible] = useState(false);
    const [ zones, setZones ] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
      ZoneService.allZones((zones)=>setZones(zones));
    }, []);

    const onZoneDeleted=(deletedZone)=>{
      setZones(previous=>previous.filter(zone=>zone.id!==deletedZone.deleted.id));
    }

    const onAddZone=(newZone)=>{
      setZones([...zones, newZone.zone]);
    }

  return (
    <div>
      <h1>{t(Keys.PAGE.TITLE.ZONES)}</h1>
      {zonesVisible ? <AddZone onAddZone={onAddZone} hideAddZone={() => setZonesVisible(false)} /> : <button onClick={() => setZonesVisible(true)}>Add Zone</button>}
      <ZoneList zones={zones} onDelete={onZoneDeleted} />
    </div>
  );
};

export default Zone;