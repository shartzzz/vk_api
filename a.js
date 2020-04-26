import fetch from "node-fetch";

export default (method, params, get) => {
  //   get = get || false;
  //   params.v = params.v || "5.103";

  const params = new URLSearchParams();
  params.append("peer_id=", 'access_token=b14180eca5e3f3306048dfd93b64886f56e2330590e0ea35563fc346488d6a08fdc8f70c523dd6ebe056a' "v=5.103");

  fetch("https://api.vk.com/method/", { method: "POST", body: params })
    .then((res) => res.json())
    .then((json) => console.log(json));
};

// https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V