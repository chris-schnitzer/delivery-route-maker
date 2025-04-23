import { useState, useEffect } from "react";

import Landing from './Landing.jsx';
import Next from './Next';
import List from './List';
import AddForm from './AddForm';

export default function TabContent({activeTab}) {
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
		setAllItems((prevVan) => {
			return prevVan.filter((van) => van.vanId !== vanId);
		})
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

