import "../TabButton.css"

export default function TabButton({tabName, onSelect, icon, description, isActive, hasAlert, vanCounter}) {
	const handleClick = () => {
		onSelect(tabName);
	}

	const activeStyles = isActive ? "active" : "";

	return(
		<div onClick={handleClick} className={`tab-button ${activeStyles}`}>
			{icon}
			{hasAlert && <span className="tab-alert"></span>}
			{vanCounter > 0 && (
        <span className="tab-counter">
          		{vanCounter}
        </span>
      )}

		</div>
	)
}