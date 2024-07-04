import axios from "axios";

const login = async (req) => {
  const data = await axios.post(
    `http://192.168.18.3:3000/auth/api/login`,
    req,
    {
      headers: {
        Authorization: "senpai",
        "Content-Type": "application/json",
      },
    }
  );
  if (data?.status == 200) {
    localStorage.setItem("user", JSON.stringify(data?.data));
  }
  return data;
};

const userService = {
  login,
};

export default userService;
