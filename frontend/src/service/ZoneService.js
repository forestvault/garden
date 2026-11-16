import { DashCallback } from "../utils/CallbackUtils";
import axios from "axios";

const ZONE_URL = '/api/zone/';

const ZoneService={
    delete:function(id, onDelete) {
        axios.delete(ZONE_URL + id, {})
        .then(response=>DashCallback(response, onDelete, true));
    },
    addZone:function(name, color, type, onAddZone) {
        axios.post(ZONE_URL, {'name' : name, 'color' : color, 'type' : type})
        .then(response => DashCallback(response, onAddZone, true));
    },
    allZones:function(onRetrieve) {
        axios.get(ZONE_URL)
        .then(response=>DashCallback(response, onRetrieve, false));
    }
}
export default ZoneService;