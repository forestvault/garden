import { useEffect, useState } from "react";
import PlotList from "../components/PlotList";
import AddPlot from "../components/form/AddPlot";
import PlotService from '../service/PlotService.js';
import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";

/*
 * Plot page component.
 *
 * Retrieves plots and displays them.
 */
const Plots = () => {
    const [plots, setPlots] = useState([]);
    const [addPlotVisible, setAddPlotVisible] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
        PlotService.allPlots((plots)=>setPlots(plots));
    }, []);

    const addNewPlot=(plot)=>{
        setPlots(([...plots, plot]));
    }

    const deletePlot=(deletedPlot)=>{
        setPlots(plots.filter(plot => plot.id!==deletedPlot.deleted.id));
    }

    return (
        <>
            <h1>{t(Keys.PAGE.TITLE.PLOTS)}</h1>
            <button onClick={() => setAddPlotVisible(!addPlotVisible)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                {addPlotVisible ? 'Cancel' : 'Add Plot'}
            </button>
            {addPlotVisible && <AddPlot onAddPlot={addNewPlot}/>}
            <h3>Existing Plots</h3>
            <PlotList plots={plots} onDeletePlot={deletePlot}/>
        </>
    );
};

export default Plots;