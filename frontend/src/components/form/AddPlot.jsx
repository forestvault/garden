import { useState } from "react";
import PlotService from "../../service/PlotService";

const AddPlot = ({ onAddPlot }) => {
    const [name, setName] = useState('plot2');
    const [url, setUrl] = useState('/plot2');
    const [color, setColor] = useState('#FF00FF');

    const handleSubmit = () => {
        PlotService.addPlot(name, url, color, (newPlot)=>onAddPlot(newPlot));
        setName('');
        setUrl('');
        setColor('');
    };

    return (
        <div className="mb-4 flex flex-col bg-zinc-700">
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Plot Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Plot URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Plot Color</label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                />
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Add Plot
            </button>
        </div>
    );
}

export default AddPlot;