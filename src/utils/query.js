import axios from "axios";

export const getAllSongs = () => {
  return axios({
    url: "/midi-files",
    method: "get",
  });
};

export const getPartRecordings = (song, part) => {
  return axios({
    url: `/get-recording/${song}/${part}`,
    method: "get",
  });
};
