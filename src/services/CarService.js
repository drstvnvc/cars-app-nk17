import axios from "axios";

class CarService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api",
    });
  }

  getAll = async (queryParameters) => {
    let params = [];

    for (const param in queryParameters) {
      if (queryParameters[param]) {
        params.push(`${param}=${queryParameters[param]}`);
      }
    }
    const { data } = await this.client.get("cars?" + params.join("&"));

    return data;
  };

  add = async (newCar) => {
    const { data } = await this.client.post("cars", newCar);
    return data;
  };

  delete = async (carId) => {
    const { data } = await this.client.delete(`cars/${carId}`);

    return data;
  };

  get = async (id) => {
    const { data } = await this.client.get(`cars/${id}`);
    return data;
  };

  edit = async (id, newCar) => {
    const { data } = await this.client.put(`cars/${id}`, newCar);
    return data;
  };
}

export default new CarService();
