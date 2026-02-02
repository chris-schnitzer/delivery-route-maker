import "../Info.css";
import { FaPlus, FaList, FaLocationDot, FaBusinessTime  } from "react-icons/fa6";
export default function Info() {
	return(
		<div className="info-wrap">
			<h1 className="list-text">How To Use</h1>
			<ul>
				<li>
					<span className="info-icons"><FaPlus /></span>
					<p>Add inventory items using the form entering the van no
					and items, proceed to the inventory list to check what you've added.
					</p>
				</li>
				
				<li>
					<span className="info-icons"><FaList /></span>
					<p>The inventory list is where you check off and load items at the HQ.
					Switch back to the add items form to add to this list. Once you're ready to start
					your delivery, hit the start route button and proceed to your route.</p>
				</li>
				
				<li>
					<span className="info-icons"><FaLocationDot /></span>
					<p>Your delivery route is now all set out for you, check off a delivery and head off to 
					the next location. Once a new route has started, the inventory list is cleared and ready for more
					items to be added on the move. End the route after the last drop is done.</p>
					<br/>
					<p>Load items and repeat the process.</p>
				</li>
				
				<li>
					<span className="info-icons"><FaBusinessTime /></span>
					<p>Collectables is a list of important items that need collecting after being delivered eg. pet hoovers
					and ozone boxes.</p>
				</li>
			</ul>
		</div>
	)	
}