const apiCallFn = (
  url: string,
  data: {},
  method?: string,
  optHeader?: string
) => {
  if (method === "GET")
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie}`,
      },
    }).then((res) => res.json());
  else
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
};
export default apiCallFn;
