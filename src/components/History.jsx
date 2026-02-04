import "../History.css";


export default function History({ history, setHistory }) {
	return(
		<div className="history-wrap">
			<h1>History</h1>
			{history.length === 0 ? (
				<p>No history to show</p>
			) : (
				<ul className="history-list">
					{history.map((entry, index) => (
						<li key={`${entry.vanId}-${index}`} className="history-item">
							<div className="history-info">
								<strong>Van: {entry.vanNo}</strong>
								<strong>Completed: {entry.completedAt}</strong>
							</div>
							<ul className="history-sub-items">
                                {entry.items.map(item => (
                                    <li key={item.itemId}>{item.value}</li>
                                ))}
                            </ul>
						</li>

					))}
				</ul>
			)}
		</div>
	)
}