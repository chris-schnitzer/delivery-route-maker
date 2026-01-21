import "../Collectables.css";
import close from "../assets/close.svg";

export default function Collectables({ collectableItems, handleRemoveCollectable }) {
	return(
		<div className="collectables-wrap">
			<h1>Collectables</h1>
			<p className="collectables-sub-head">Important items that have been delivered and need collecting</p>
			<div className="collectables-ul-wrap">
				<ul>
					{
						collectableItems.map((item) => (
							<li key={item.itemId}>
								<div className="collectables-van-no">
									<h1>{item.vanNo}</h1>
									<img className="close-collectable" onClick={() => handleRemoveCollectable(item.itemId)} src={close} alt="Close icon" />
								</div>
								<p className="collectable-item">{item.value}</p>
								<p className="collectable-item time">{item.timeAdded}</p>
							</li>
						))
					}
				</ul>
			</div>
		</div>
	)
}