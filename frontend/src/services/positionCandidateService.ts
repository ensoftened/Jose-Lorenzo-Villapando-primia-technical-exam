import authService from "./authService";
import Axios from "axios";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
const endpoint = `${process.env.REACT_APP_SERVER_API_URL}position-candidate/`;

////////////console.log("retrievedResps", retrievedResponsibilities)
export async function fetchAllPositionCandidates(positionID: string) {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let positions = await Axios.get(
      `${endpoint}fetch-all-position-candidates/${positionID}`
    );

    ////////////console.log  ("THE ROLES", ingredients)
    return positions;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}
export async function addCandidateToPosition(data: any) {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let positions = await Axios.post(
      `${endpoint}`,
      data
    );

    ////////////console.log  ("THE ROLES", ingredients)
    return positions;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}
export async function hireCandidate(id: string) {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let positions = await Axios.put(
      `${endpoint}hire-candidate/${id}`,
      {}
    );

    ////////////console.log  ("THE ROLES", ingredients)
    return positions;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}
