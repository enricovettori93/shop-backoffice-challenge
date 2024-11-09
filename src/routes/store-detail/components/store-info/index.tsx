import React from 'react';
import {Store} from "../../../../models";
import classNames from "classnames";
import Card from "../../../../components/card";
import {FaRegUserCircle} from "react-icons/fa";

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
                <ul className="flex flex-row gap-3 flex-nowrap">
                    {store.employees.map((employee) => (
                        <li key={employee}>
                            <Card className="flex flex-row gap-4 items-center">
                                <FaRegUserCircle/>{employee}
                            </Card>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StoreInfo;
