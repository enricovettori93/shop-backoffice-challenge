import React from 'react';
import {Store} from "../../../../models";
import classNames from "classnames";

interface props {
    store: Store
    className?: string
}

const StoreInfo = ({store, className = ""}: props) => {
    const classes = classNames({
        [className]: true,
        "mt-5 flex flex-col gap-3": true
    });

    return (
        <div className={classes}>
            <div>
                <p className="text-xl font-semibold">Categoria:&nbsp;</p>
                <span>{store.category}</span>
            </div>
            <div>
                <p className="text-xl font-semibold">Impiegati:&nbsp;</p>
                <ul>
                    {store.employees.map((employee) => (<li key={employee}>{employee}</li>))}
                </ul>
            </div>
        </div>
    );
};

export default StoreInfo;
