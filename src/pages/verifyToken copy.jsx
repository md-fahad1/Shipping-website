import axios from "axios";
import Cookies from "js-cookie"; // Make sure to replace this with the actual library you're using for cookies

const verifyToken = async () => {
  let accesstoken = Cookies.get("accessToken", null);
  let refresh = Cookies.get("refreshToken", null);
  if (accesstoken != null) {
    return Cookies.get("accessToken");
  } else if (Cookies.get("refreshToken")) {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/token/refresh",
        {
          refresh: refresh,
        }
      );

      // Cookies.remove('refreshToken');
      Cookies.set("accessToken", response.data.access, {
        expires: 1 / (24 * 60),
      });

      return response.data.access;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export default verifyToken;
