import { useState, useEffect } from "react";

import Landing from './Landing.jsx';
import Next from './Next';
import List from './List';
import AddForm from './AddForm';
import Collectables from './Collectables';

export default function TabContent({ activeTab, setCollectableItems, collectableItems }) {
	const [showLanding, setShowLanding] = useState(true);

	const handleEnterApp = () => {
		setShowLanding(false);
	}
	
	const [items, setItems] = useState(() => {
		const saved = localStorage.getItem("items");
		return saved ? JSON.parse(saved) : [];
	});

	const [allItems, setAllItems] = useState(() => {
		const saved = localStorage.getItem("allItems");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	useEffect(() => {
		localStorage.setItem("allItems", JSON.stringify(allItems));
	}, [allItems]);

	const handleFormData = (formData) => {
		setItems((prevItems) => [
			...prevItems, 
			{ vanNo: formData.vanNo, items: formData.items, vanId: formData.vanId }
		]);
	};
	
	const removeVanHandler = (vanId) => {
		setItems((prevVan) => prevVan.filter((van) => van.vanId !== vanId));
	}

	const removeItemHandler = (itemId) => {
		console.log(items);
		setItems((prevItems) => 
			prevItems.map((i) => ({
			...i,
			items: i.items.filter((item) => item.itemId !== itemId),
		}))
		)
	}

	const handleStartRoute = () => {
		setAllItems(items);
		setItems([]);
	}

	const handleEndRoute = () => {
		setAllItems([]);
	}

	

	const handleCompleteTask = (vanId) => {
		setAllItems((prevVans) => {
			return prevVans.filter((van) => {
				if (van.vanId === vanId) {
					// Get collectable items (e.g., "box" or "phvr") and add vanNo to each
					const collectables = van.items
						.filter((item) => ["box", "bx", "phvr", "ph", "phr", "pet hoover", "pethoover"].includes(item.value.toLowerCase()))
						.map((item) => ({ 
							...item, 
							vanNo: van.vanNo,
							timeAdded: new Date().toLocaleTimeString([], { 
								hour: '2-digit', 
								minute: '2-digit',
								second: '2-digit' 
							}),  
						}));

					if (collectables.length > 0) {
						// Avoid duplicates: only add new items not already in collectableItems
						setCollectableItems((prev) => {
							const newItems = collectables.filter(
								(item) => !prev.some((existing) => existing.itemId === item.itemId)
							);
							return [...prev, ...newItems];
						});
					}

					// Always remove the van after completing the task
					return false;
				}

				// Keep all other vans
				return true;
			});
		});
	};

	const handleRemoveCollectable = (itemId) => {
		setCollectableItems((prevVan) => prevVan.filter((item) => item.itemId !== itemId));
	}

	

	const tabComponents = {
		Add: <AddForm passFormData={handleFormData} />,

		MyList: <List 
    				items={items} 
    				removeVanHandler={removeVanHandler}
    				removeItemHandler={removeItemHandler}
    				handleStartRoute={handleStartRoute}

    	/>,

   		Next: <Next 
   			allItems={allItems}
   			handleEndRoute={handleEndRoute}
   			handleCompleteTask={handleCompleteTask}
   		/>,

   		Collectables: <Collectables 
   			collectableItems={collectableItems} 
   			handleRemoveCollectable={handleRemoveCollectable}
   		/>
    	
    	
  	};

	return(
		<>	

			{showLanding ? (
					<Landing onEnter={handleEnterApp} />
				) : (
					tabComponents[activeTab]
				)
				
			}	
		</>
	)
}

