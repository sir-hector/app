import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState(null);

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userToken");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {}
  };

  getOptions = (endpoint) => {
    return {
      method: "GET",
      url: `https://api.portowastraz.pl/api/${endpoint}`,
      params: {},
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const options = getOptions(endpoint);
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
