import { useState, useEffect } from "react";

import Landing from './Landing.jsx';
import Next from './Next';
import List from './List';
import AddForm from './AddForm';
import Collectables from './Collectables';
import Modal from './Modal.jsx';
import History from './History';
import Info from './Info';

export default function TabContent({ activeTab, setCollectableItems, collectableItems, setActiveTab }) {
	const [showLanding, setShowLanding] = useState(true);
	
	// Modal state
	const [showStartRouteAlert, setShowStartRouteAlert] = useState(false);

	const handleEnterApp = () => {
		setShowLanding(false);
	}

	function useLocalStorageState(key, initialValue) {
		const [state, setState] = useState(() => {
			const saved = localStorage.getItem(key);
			return saved ? JSON.parse(saved) : initialValue;
		});
	
		useEffect(() => {
			localStorage.setItem(key, JSON.stringify(state));
		}, [key, state]);

		return [state, setState];
	}

	const [items, setItems] = useLocalStorageState("items", []);
	const [allItems, setAllItems] = useLocalStorageState("allItems", []);
	const [history, setHistory] = useLocalStorageState("history", []);
	
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
		// Block starting a new route if one is active
  		if (Array.isArray(allItems) && allItems.length > 0) {
    		setShowStartRouteAlert(true);
    		return;
  		}

		// Start if no active route
		setAllItems(items);
		setItems([]);
    	setActiveTab("Next");
	}

	const handleEndRoute = () => {
		setAllItems([]);
	}

	

	const handleCompleteTask = (vanId) => {
	    // 1. Find the van in the current state
	    const completedVan = allItems.find(v => v.vanId === vanId);

	    // 2. Safety check: only proceed if the van exists
	    if (completedVan) {
	        
	        // 3. Update History
	        setHistory((prevHistory) => [
	            {
	                ...completedVan,
	                completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
	            },
	            ...prevHistory
	        ]);

	        // 4. Update Collectables
	        const collectables = completedVan.items
	            .filter((item) => ["box", "bx", "phvr", "ph", "phr", "pet hoover", "pethoover"].includes(item.value.toLowerCase()))
	            .map((item) => ({ 
	                ...item, 
	                vanNo: completedVan.vanNo,
	                timeAdded: new Date().toLocaleTimeString()
	            }));

	        if (collectables.length > 0) {
	            setCollectableItems((prev) => [...prev, ...collectables]);
	        }

	        // 5. REMOVE the van from the active list
	        setAllItems((prevVans) => prevVans.filter((van) => van.vanId !== vanId));
	    }
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
   		/>,

   		Info: <Info />,

   		History: <History 
   			history={history}
   			setHistory={setHistory}
   		/>,
    	
    	
  	};

	return(
		<>	

			{showLanding ? (
					<Landing onEnter={handleEnterApp} />
				) : (	
						<>
							{showStartRouteAlert && (
								<Modal
								open={showStartRouteAlert}
								title="Route already in progress"
								message="Please end the current route before starting a new one."
								onClose={() => setShowStartRouteAlert(false)}
								confirmText="OK"
								/>
							)}
							  	
							{tabComponents[activeTab]}
						</>	
				)}
		</>	
	)
}

