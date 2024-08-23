import axios from "axios";

export const adminvalidateToken = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/token/admintoken-validate",
      {
        withCredentials: true, // Include cookies with the request
      }
    );
    // console.log(response);
    const result = response.data.isValid;

    return result;
  } catch (error) {
    console.error("Token validation failed", error);
    return false;
  }
};
