import { useState } from "react";

import "../History.css";
import close from "../assets/close.svg";
import Modal from "./Modal.jsx";



export default function History({ history, setHistory }) {
	
	const [showClearAllHistoryAlert, setShowClearAllHistoryAlert] = useState(false);

	const handleClearAllHistory = () => {
		setShowClearAllHistoryAlert(true);
	}

	const handleClearHistoryItem = (index) => {
		setHistory(prev => 
			prev.filter((_, i) => i !== index)
		);
	};

	const confirmClearAllHistory = () => {
		setShowClearAllHistoryAlert(false);
		setHistory([]);
	};

	const cancelClearAllHistory = () => {
		setShowClearAllHistoryAlert(false);
	}

	return(
		<>
			{setShowClearAllHistoryAlert && (
	            <Modal
	                open={showClearAllHistoryAlert}
	                title="Clear All History?"
	                message="Are you sure you want to clear the history?"
	                onClose={cancelClearAllHistory}
	                onConfirm={confirmClearAllHistory}
	                confirmText="Clear"
	                cancelText="Cancel"
	                danger
	            />
	        )}
			<div className="history-wrap">
				<h1>History</h1>
				{}
				{history.length === 0 ? (
					<>
					<p className="warning">No history to show</p>
					
					</>
				) : (
					<>
					<ul className="ul-history-wrap">

						{history.map((entry, index) => (
							<li key={`${entry.vanId}-${index}`} className="history-item">
								<div className="history-head-row">
									<h2 className="h2-no">{entry.vanNo}</h2>
									<img
										onClick={() => handleClearHistoryItem(index)}
										className="history-close-button" 
										src={close} alt="delete button"
									/>
								</div>
								<div className="history-contents-row">
									<ul className="history-sub-items">
										{entry.items.map(item => (
	      									<li key={item.itemId}>{item.value}</li>
	    								))}
									</ul>
									<p className="time">{entry.completedAt}</p>
								</div>
										
							</li>

						))}
					</ul>
					<button onClick={handleClearAllHistory} className="clear-all-history">Clear All History</button>
					</>
				)}
			</div>
		</>
	)
}