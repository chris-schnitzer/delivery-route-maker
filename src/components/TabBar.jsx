import TabButton from "../components/TabButton.jsx";
import "../TabBar.css";
import { useState, useEffect } from 'react';
import TabContent from "../components/TabContent.jsx";
import { FaPlus, FaList, FaLocationDot, FaBusinessTime  } from "react-icons/fa6";


export default function TabBar({ activeTab, setActiveTab, collectableItems, setCollectableItems }) {
	
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
				setActiveTab={setActiveTab} 
				setCollectableItems={setCollectableItems}
				collectableItems={collectableItems}
			/>
		</div>	
		</>
	)
}