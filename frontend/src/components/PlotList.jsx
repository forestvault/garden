import { IoMdTrash } from "react-icons/io";
import PlotService from "../service/PlotService";

const PlotList = ({ plots, onDeletePlot }) => {
    return (
        <div>
            {plots.length === 0 ? (
                <p>No plots available.</p>
            ) : (
                <ul className="grid grid-cols-4 gap-4">
                    {plots.map((plot) => (
                        <li key={'plot-'+plot.id} className="app-box" style={{ backgroundColor: plot.color }}>
                            <a href={plot.location}>
                                {plot.name}
                            </a>
                            <IoMdTrash onClick={()=>{
                                PlotService.delete(plot.id, (deletedPlot)=>{onDeletePlot(deletedPlot)})
                            }} className="cursor-pointer" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default PlotList;