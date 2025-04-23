import TabButton from "../components/TabButton.jsx";
import "../TabBar.css";
import { useState } from 'react';
import TabContent from "../components/TabContent.jsx";
import addIcon from "../assets/add.svg";
import listIcon from "../assets/list.svg";
import arrowIcon from "../assets/keyboard_return.svg";

export default function TabBar() {
	const [activeTab, setActiveTab] = useState('Add');

	const handleClick = (tabName) => {
		setActiveTab(tabName);
	};

	return(
		<>
		<div id="tab-bar">
			<TabButton 
				onSelect={() => handleClick("Add")} 
				tabName="Add" 
				icon={addIcon}
				description="Add Icon"
			/>

			<TabButton 
				onSelect={() => handleClick("MyList")} 
				tabName="MyList"
				icon={listIcon}
				description="List Icon" 
			/>

			<TabButton 
				onSelect={() => handleClick("Next")} 
				tabName="Next"
				icon={arrowIcon}
				description="Arrow Icon"
			/>


		
			
		
			
		</div>
		<div>
			<TabContent activeTab={activeTab} />
		</div>	
		</>
	)
}