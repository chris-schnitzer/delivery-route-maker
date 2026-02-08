// This is the current route(Next.jsx) component.
import { useState, useMemo } from "react";
import vanData from "../vanData.js";
import "../Next.css";
import Modal from "./Modal";

import check from "../assets/check.svg";

export default function Next({ allItems, handleEndRoute, handleCompleteTask }) {
    const [showEndRouteAlert, setShowEndRouteAlert] = useState(false);

	// Create a map of vanNumber to position for fast lookup
	const vanPositionMap = vanData.reduce((acc, { vanNumber, position }) => {
    	acc[vanNumber] = position;
    	return acc;
  	}, {});

  	// Sort vans based on the position from vanData
  	const sortedVans = useMemo(() => {
        return[...allItems].sort((a, b) => {
            return vanPositionMap[a.vanNo] - vanPositionMap[b.vanNo]; // Sort by position in ascending order
        });
    }, [allItems, vanPositionMap]);

    const completeTask = (vanId) => {
        handleCompleteTask(vanId);
    };

    // defensive wrapper so the button never triggers when disabled
    const handleEnd = () => {
        if (endDisabled) return;
        setShowEndRouteAlert(true);    
    };

    const confirmEndRoute = () => {
        setShowEndRouteAlert(false);
        handleEndRoute(); // clears allItems
    };

    const cancelEndRoute = () => {
        setShowEndRouteAlert(false);
    };

    // disable End Route when there are no vans/items
    const endDisabled = !(Array.isArray(sortedVans) && sortedVans.length > 0);

	return (
        <>
        {showEndRouteAlert && (
            <Modal
                open={showEndRouteAlert}
                title="End route?"
                message="Ending the route will clear all remaining items."
                onClose={cancelEndRoute}
                onConfirm={confirmEndRoute}
                confirmText="End Route"
                cancelText="Cancel"
                danger
            />
        )}
		<div className="next-wrap">
            <h1 className="list-text">Delivery Route</h1>
            <p className="list-text">Drive from A-Z with eaze</p>

            {   sortedVans.length > 0 ? ( 
                       
                    <>
        			<ul className="route-ul-wrap">
                        {
                            sortedVans.map((van, index) => (
                                <li className="list-items" key={van.vanId}>
                                    <div className="route-van-head">
                                       <h1 className="van-no">{van.vanNo}</h1>
                                        <img 
                                            onClick={() => completeTask(van.vanId)} 
                                            className="pointer complete-icon" 
                                            src={check} 
                                            alt="complete task"
                                        /> 
                                    </div>
                                    
                                    <ul>
                                        {van.items.map((item, itemIndex) => (
                                            <li className="route-ind-items individual-item-wrap" key={item.itemId}>
                                                {item.value} 
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                    <button 
                        className="end-route" 
                        onClick={handleEnd}
                        disabled={endDisabled}
                        aria-disabled={endDisabled}
                    >
                        End Route
                    </button>
                    </>
                ) : (
                    <p className="warning next-warning">No vans or items available</p>
                )
            };

           

		</div>
        </>
	)
}