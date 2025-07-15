import { useHistory } from "react-router-dom";
import verifyToken from "./verifyToken";

const YourComponent = () => {
  const history = useHistory();

  useEffect(() => {
    verifyToken(history);
  }, [history]);

  return null;
};

export default YourComponent;
