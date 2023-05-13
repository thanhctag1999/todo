import axiosClient from "./axiosClient";

const url = "/meeting";

const roleApi = {
  getAll: () => axiosClient.get(`${url}`),
  getByID: (id) => axiosClient.get(`${url}/${id}`),
  update: (data, id) => axiosClient.put(`${url}/${id}`, data),
  add: (data) => axiosClient.post(`${url}`, data),
  delete: (id) => axiosClient.delete(`${url}/${id}`),
};

export default roleApi;
