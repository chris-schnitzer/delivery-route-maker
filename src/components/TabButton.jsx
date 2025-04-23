import "../TabButton.css"

export default function TabButton({tabName, onSelect, icon, description}) {
	const handleClick = () => {
		onSelect(tabName);
	}

	return(
		<div onClick={handleClick} className="tab-button">
			<img src={icon} alt={description} />
		</div>
	)
}