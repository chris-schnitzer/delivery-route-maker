import "../Landing.css";
import addToList from "../assets/add-to-list-img.svg";
import load from "../assets/load-img.svg";
import route from "../assets/route-img.svg";
import { FaPlus, FaList, FaLocationDot } from "react-icons/fa6";
// import { GiArmoredBoomerang } from "react-icons/gi";
import { FaFlutter } from "react-icons/fa6";
export default function Landing({onEnter}) {
	return(
		<div className="landing-wrap">
			<FaFlutter className="landing-logo"/>
			<div className="landing-inner-wrap">
				<div className="hero">

					<h1 className="hero-head">Van Deliveries Made Simple</h1>
					<p>Add inventory, load up and start deliveries. Accept new orders on the go.</p>
				</div>
				<div className="features-row">
					<div className="feature-box">
						<h3>1. Add to list</h3>
						<img className="feature-box-img" src={addToList} alt="" />
						<p>Manage inventory.</p>
						<div className="feature-icon-wrap">
							<FaPlus className="feature-icon"/>
						</div>
					</div>
					<div className="feature-box">
						<h3>2. Load Up</h3>
						<img className="feature-box-img" src={load} alt="" />
						<p>Check off items as you load up.</p>
						<div className="feature-icon-wrap">
							<FaList className="feature-icon"  />
						</div>
					</div>
					<div className="feature-box">
						<h3>3. Start Route</h3>
						<img className="feature-box-img" src={route} alt="" />
						<p>Start delevery with the entire route mapped out for you.</p>
						<div className="feature-icon-wrap">
							<FaLocationDot className="feature-icon" />
						</div>
					</div>
				</div>
				<button className="get-started" onClick={onEnter}>Get Started</button>
			</div>
		</div>
	)
}