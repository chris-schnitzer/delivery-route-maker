import "../Modal.css";

export default function Modal({
	open,
  	title,
  	message,
  	onClose,
  	onConfirm,
  	confirmText = "OK",
  	cancelText = "Cancel",
 	danger = false,
}) {
	if (!open) return null;

	return(
		<div className="modal-overlay">
	      	<div className="modal-content">
	        	<h2 className="modal-title">{title}</h2>
	        	<p className="modal-message">{message}</p>

	        	<div className="modal-buttons">
	        	  {onConfirm && (
	        	    <button className="modal-btn cancel-btn" onClick={onClose}>{cancelText}</button>
	        	  	)}
	        		<button
	        			className={`modal-btn confirm-btn ${danger ? "danger" : ""}`}
	        	    	onClick={onConfirm || onClose}	
	        		>
	        	    	{confirmText}
	        		</button>
	      		</div>
	    	</div>
	    </div>
	)
}