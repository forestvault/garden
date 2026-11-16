import { IoMdTrash } from "react-icons/io";
import ZoneService from "../service/ZoneService";

/*
 * ZoneList component. Renders a list of zones.
 * 
 */
const ZoneList = ({ zones, onDelete }) => {

    if (!zones || zones.length === 0) {
        return <p>No zones available.</p>;
    }
    
    return (
        <div>
            <ul className="grid grid-cols-4 sm:grid-cols-2 gap-4">
                {zones.map((zone) => (
                    <li key={'zone-'+zone.id} className="app-box" style={{ backgroundColor: zone.color }}>
                        <a href={zone.location}>
                            {zone.name}
                        </a>
                        <IoMdTrash onClick={()=>{
                            ZoneService.delete(zone.id, (deleted)=>{onDelete(deleted)})
                        }} className="cursor-pointer" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZoneList;