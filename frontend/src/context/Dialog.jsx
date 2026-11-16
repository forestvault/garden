import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

const DialogProvider=({children})=>{
    const [dialog, setDialog] = useState({
        visible: false,
        content: '',
        title: ''
    });

    const showDialog=(content, title='Dialog') => {
        setDialog({
            visible: true,
            content: content,
            title: title
        });
    }

    const hideDialog=()=>{
        setDialog({
            visible: false,
            content: '',
            title: ''
        });
    }

    return (<DialogContext.Provider value={{showDialog, hideDialog}}>
        {children}
        {dialog.visible &&
        (<div className="dialog-overlay">
            <div className="dialog-alert display-inline">
                <div className="dialog-alert-title">{dialog.title}</div>
                <div className="dialog-alert-content">
                    {dialog.content}
                </div>
            </div>
        </div>)};
    </DialogContext.Provider>)
}
export default DialogProvider;

export const useDialog=()=>{
    const context = useContext(DialogContext);
    if(!context) {
        throw new Error('useAlert must be used in AlertContext');
    }
    return context;
}