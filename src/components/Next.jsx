// This is the current route(Next.jsx) component.

import vanData from "../vanData.js";
import "../Next.css";

import check from "../assets/check.svg";

export default function Next({ allItems, handleEndRoute, handleCompleteTask }) {
	// Create a map of vanNumber to position for fast lookup
	const vanPositionMap = vanData.reduce((acc, { vanNumber, position }) => {
    	acc[vanNumber] = position;
    	return acc;
  	}, {});

  	// Sort vans based on the position from vanData
  	const sortedVans = [...allItems].sort((a, b) => {
    	const positionA = vanPositionMap[a.vanNo];
    	const positionB = vanPositionMap[b.vanNo];

    	return positionA - positionB; // Sort by position in ascending order
  	});



    const completeTask = (vanId) => {
        handleCompleteTask(vanId);
    }

    // defensive wrapper so the button never triggers when disabled
    const handleEnd = () => {
        if (endDisabled) return;
        handleEndRoute();
    }

    // disable End Route when there are no vans/items
    const endDisabled = !(Array.isArray(sortedVans) && sortedVans.length > 0);

	return (
		<div className="next-wrap">
            <h1 className="list-text">Delivery Route</h1>
            <p className="list-text">Drive from A-Z with eaze</p>
			<ul className="route-ul-wrap">
                {
                    sortedVans.length > 0 ? (
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
                    ) : (
                        <p className="warning next-warning">No vans or items available</p>
                    )
                }
            </ul>
            <button className="end-route" 
                onClick={handleEnd}
                disabled={endDisabled}
                aria-disabled={endDisabled}
            >
                End Route
            </button>
		</div>
	)
}