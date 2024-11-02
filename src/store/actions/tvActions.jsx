export { removeTv } from "../reducers/tvSlice"; // Corrected to reference `tvSlice`
import axios from "../../utils/axios";
import { loadTv } from "../reducers/tvSlice"; // Ensure `loadTv` is imported if used

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    let BigData = {
      details: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results?.IN,
      translations: translations.data.translations.map((t) => t.english_name),
    };

    dispatch(loadTv(BigData));
  } catch (error) {
    console.error("Error loading TV data:", error);
  }
};
