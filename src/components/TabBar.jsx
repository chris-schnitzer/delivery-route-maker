import TabButton from "../components/TabButton.jsx";
import "../TabBar.css";
import { useState, useEffect } from 'react';
import TabContent from "../components/TabContent.jsx";
import { FaPlus, FaList, FaLocationDot, FaBusinessTime  } from "react-icons/fa6";


export default function TabBar() {
	//const [collectableItems, setCollectableItems] = useState([]);
	const [activeTab, setActiveTab] = useState("Add");
	
	const [collectableItems, setCollectableItems] = useState(() => {
	    // Load from localStorage on first render
	    const saved = localStorage.getItem("collectables");
	    return saved ? JSON.parse(saved) : [];
  	});

  	useEffect(() => {
	    // Save to localStorage whenever items change
	    localStorage.setItem("collectables", JSON.stringify(collectableItems));
  	}, [collectableItems]);

	const handleClick = (tabName) => {
		setActiveTab(tabName);
	};

	return(
		<>
		<div id="tab-bar">
			<TabButton 
				onSelect={() => handleClick("Add")} 
				tabName="Add" 
				icon={<FaPlus />}
				description="Add Icon"
				isActive={activeTab === "Add"}
			/>

			<TabButton 
				onSelect={() => handleClick("MyList")} 
				tabName="MyList"
				icon={<FaList/>}
				description="List Icon"
				isActive={activeTab === "MyList"} 
			/>

			<TabButton 
				onSelect={() => handleClick("Next")} 
				tabName="Next"
				icon={<FaLocationDot/>}
				description="Map Pin"
				isActive={activeTab === "Next"}
			/>

			<TabButton 
				onSelect={() => handleClick("Collectables")} 
				tabName="Collectables"
				icon={<FaBusinessTime />}
				description="Collectables"
				isActive={activeTab === "Collectables"}
				hasAlert={collectableItems.length > 0}
			/>
		</div>
		<div>
			<TabContent 
				activeTab={activeTab} 
				setCollectableItems={setCollectableItems}
				collectableItems={collectableItems}
			/>
		</div>	
		</>
	)
}