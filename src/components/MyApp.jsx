import { useState } from "react";

import TabBar from "../components/TabBar.jsx";
import Header from "../components/Header.jsx";
import TabContent from "../components/TabContent.jsx";

export default function MyApp() {
	const [activeTab, setActiveTab] = useState("Add");
	return(
		<>	
			<Header />	
			<TabBar />
		</>
	)
}