const Computer=({device})=>{
    return (<section className="flex flex-col bg-gray-800 p-2 text-white">
        <h2>{device.name}</h2>
        <label>{device.ieeeAddress}</label>
        <p>Computer settings will be displayed here.</p>
    </section>);
}
export default Computer;