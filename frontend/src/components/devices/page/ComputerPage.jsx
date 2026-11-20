const ComputerPage=({device})=>{
    return (<section className="flex flex-col">
        {device.name}<br />
        {device.manufacturer}<br />
        {device.ieeeAddress}<br />
    </section>)
}
export default ComputerPage;