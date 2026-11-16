const Status = ({ status }) => {
    if (status === true) {
        return (
            <span className="bg-green-500 rounded-2xl w-3 h-3" />
        );
    } else if (status === false) {
        return (
            <span className="bg-red-500 rounded-2xl w-3 h-3" />
        );
    }
};

export default Status;