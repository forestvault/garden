import axios from 'axios';
import { DashCallback } from '../utils/CallbackUtils.js';

const PLOT_URL = '/api/plot/';

const PlotService={
    allPlots(onRetrieve) {
        axios.get(PLOT_URL)
        .then(response=>{
            DashCallback(response, onRetrieve, false);
        });
    },
    addPlot:function(name, location, color, onAddPlot) {
        axios.post(PLOT_URL, {'name' : name, 'url' : location, 'color' : color})
        .then(response => DashCallback(response, onAddPlot, false));
    },
    delete:function(id, onDeletePlot) {
        axios.delete(PLOT_URL + id, {})
        .then(response => DashCallback(response, onDeletePlot, true));
    }
}
export default PlotService;