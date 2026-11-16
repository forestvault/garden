import { useState } from "react";
import ZoneService from '../../service/ZoneService.js';

const AddZone = ({onAddZone,hideAddZone}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    ZoneService.addZone(name, color, type, (response)=>{
      onAddZone(response);
      setName('');
      setColor('');
      setType('');
      hideAddZone();
    });
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-zinc-700">
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
      </div>
      <button type="submit">Add</button>
    </form>
    <button onClick={hideAddZone}>Cancel</button>
    </>
  );
};

export default AddZone;