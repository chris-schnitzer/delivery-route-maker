import { useState, useEffect } from "react";

import TabBar from "../components/TabBar.jsx";
import Header from "../components/Header.jsx";
import TabContent from "../components/TabContent.jsx";

export default function MyApp() {
	const [activeTab, setActiveTab] = useState("Add");

	const [collectableItems, setCollectableItems] = useState(() => {
    const saved = localStorage.getItem("collectables");
    	return saved ? JSON.parse(saved) : [];
  	});


	useEffect(() => {
		// Save to localStorage whenever items change
	    localStorage.setItem("collectables", JSON.stringify(collectableItems));
  	}, 	[collectableItems]);

	return(
		<>	
			<Header setActiveTab={setActiveTab} />	
			<TabBar 
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				collectableItems={collectableItems}
				setCollectableItems={setCollectableItems}
			/>
		</>
	)
}