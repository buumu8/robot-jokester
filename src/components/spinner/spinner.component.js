import { SpinnerOverlay } from "./spinner.styles";
import loader from "../../assets/loader.svg";

const Spinner = () => (
  <SpinnerOverlay>
    {/* <SpinnerContainer /> */}
    <img src={loader} alt="loading" />
  </SpinnerOverlay>
);

export default Spinner;
