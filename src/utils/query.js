import axios from "axios";

export const getAllSongs = () => {
  return axios({
    url: "/midi-files",
    method: "get",
  });
};
