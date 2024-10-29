import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTE2ZDcxMzYzMTliZjczZDRjOWRjMDc5MGQ2ZDE4NSIsIm5iZiI6MTczMDEzOTU5NC4xOTE1MTcsInN1YiI6IjY3MWZkM2IxNmQ2YjcwNWRjODcxZmM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qqYO633IVCfpATcUg4oFdp6ssv14U25bKaL91MI40Rs",
  },
});
export default instance;