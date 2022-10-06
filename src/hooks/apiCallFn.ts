const apiCallFn = (url: string, data: {}, method?: string) => {
  if (method === "PATCH")
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + document.cookie,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  else
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
};
export default apiCallFn;
