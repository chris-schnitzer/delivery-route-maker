import "../List.css";
import { useState, useEffect } from "react";

import close from "../assets/close.svg";
import deleteIcon from "../assets/delete.svg";


export default function List({items, removeVanHandler, removeItemHandler, handleStartRoute, handleEndRoute}) {
	const [checkedItems, setCheckedItems] = useState({});

	// Fetch saved checkedItems from localStorage on initial render
	useEffect(() => {
		const savedCheckedItems = localStorage.getItem("checkedItems");
		if(savedCheckedItems) {
			setCheckedItems(JSON.parse(savedCheckedItems));
		}
	}, []);

	// Update localStorage whenever checkedItems state changes
	useEffect(() => {
		if(Object.keys(checkedItems).length > 0) {
			localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
		}
	}, [checkedItems]);

	const handleToggle = (itemId) => {
		setCheckedItems((prevCheckedItems) => {
			const newCheckedItems = {
				...prevCheckedItems,
				[itemId]: !prevCheckedItems[itemId],
			};
			// Return the new state, which will also be stored in localStorage via the useEffect hook
			return newCheckedItems;
		});
	};

	const removeVan = (vanId) => {
		removeVanHandler(vanId);
	}

	const removeItem = (itemId) => {
		removeItemHandler(itemId);
	}

	const startRoute = () => {
		handleStartRoute();
	}

	// disabled when items array is empty or not an array
	const startDisabled = !(Array.isArray(items) && items.length > 0);

	return (
		<div className="list-wrap">
			<h1 className="list-text">Inventory List</h1>
			<p className="list-text">Load items, check off and start route when ready to hit the road.</p>	
				
			{items.length === 0 ? ( 
				<p className="warning">No vans or items available</p> 
			) : (
				<>
					<ul className="ul-list-wrap">
						{items.map((van) => {
							return (
								<li className="list-items" key={van.vanId}>
									<div className="van-head">
										<h1 className="van-no">{van.vanNo}</h1>
										<img 
											className="pointer" 
											src={close} 
											alt="Delete van" 
											onClick={() => removeVan(van.vanId)} 
										/>
									</div>	
									<ul>
										{van.items.map((item) => {
											return ( 
												<li 
													key={item.itemId}
													className="individual-item-wrap"
												>
													<div className="item-with-checkbox">
														<div 
															onClick ={() => handleToggle(item.itemId)}
															className="checkbox" 
															style={{backgroundColor: checkedItems[item.itemId] ? "#80D0C7" : "#d9d9d9"}}
														>
														</div>
														{item.value}
													</div>		
													<img  
														className="pointer" 
														src={deleteIcon} 
														onClick = {() => removeItem(item.itemId)} 
													/>	
												</li>
											);
										})}
									</ul>
								</li>
							);
						})}
					</ul>
					<button 
						className="start-route" 
						onClick={startRoute}
					>
						Start route
					</button>
				</>
				)}
			
		</div>
	)
}