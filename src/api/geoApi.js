import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_MAP_API_KEY;

export const geoLocalization = async (address, city) => {
  const province = "Provincia de Buenos Aires";
  const country = "Argentina";

  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${province},+${country}&location_type=ROOFTOP&result_type=street_address&key=${API_KEY}`
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
