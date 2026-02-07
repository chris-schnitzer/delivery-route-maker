import "../History.css";
import close from "../assets/close.svg"



export default function History({ history, setHistory }) {
	return(
		<div className="history-wrap">
			<h1>History</h1>
			<button className="clear-all-history">Clear</button>
			{history.length === 0 ? (
				<p>No history to show</p>
			) : (
				<ul className="ul-history-wrap">

					{history.map((entry, index) => (
						<li key={`${entry.vanId}-${index}`} className="history-item">
							<div className="history-head-row">
								<h2 className="h2-no">{entry.vanNo}</h2>
								<img className="history-close-button" src={close} alt="delete button"/>
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
			)}
		</div>
	)
}