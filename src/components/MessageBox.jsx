import React from 'react';

const Messagebox = ({children,variant}) => {
    return (
        <div className={`alert alert-${variant || "info"}`}>
            {children}
        </div>
    );
}

export default Messagebox;
