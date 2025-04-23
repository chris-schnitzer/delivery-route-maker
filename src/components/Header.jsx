import "../Header.css";
import logo from "../assets/plane-grey.svg";

export default function Header() {
	return(
		<header>
			<img src={logo} alt="Logo of a paper plane" />
		</header>
	)
}