import "../Header.css";
// import { GiArmoredBoomerang } from "react-icons/gi";
import { FaFlutter, FaInfo } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { TiInfoLarge } from "react-icons/ti";

import { MdHistory } from "react-icons/md";


export default function Header() {
	return(
		<header>
			{/*<GiArmoredBoomerang className="primary-logo"/>*/}
			<FaFlutter className="primary-logo"/>
			<div className="top-nav">
				<TiInfoLarge 
					className="top-nav-icon info"  
				/>
				<MdHistory 
					className="top-nav-icon history"
				/>	
			</div>
		</header>
	)
}