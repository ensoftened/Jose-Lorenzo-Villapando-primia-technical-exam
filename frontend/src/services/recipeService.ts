import Axios from "axios";
import authService from "./authService";
import { showToast } from "@utils/showToast";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
var endpoint: string = `${process.env.REACT_APP_SERVER_API_URL}recipe/`;

export async function createNewRecipe(data: any) {
  ////////////////////////console.log  ("DATA ", data)

  try {
    const {
      recipeName,
      photo,
      description,
      servings,
      time,
      ingredientQuantityUnit,
      showTranslation,
      directions,
      recipePrivacy,
      creatorName,
      creatorLink
    } = data;

    ////console.log("DATA INSIDE SERVICE", data);

    let fd: any = new FormData();

    fd.append("recipeName", recipeName);
    fd.append("creatorName", creatorName);
    fd.append("creatorLink", creatorLink);
    fd.append("recipePrivacy", JSON.stringify(recipePrivacy));
    fd.append("description", description);
    fd.append("servings", servings);
    fd.append("time", time);
    fd.append("ingredientQuantityUnit", JSON.stringify(ingredientQuantityUnit));
    fd.append("showTranslation", JSON.stringify(showTranslation));
    fd.append("directions", JSON.stringify(directions));


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("FORM DATA", fd)

    if (data.photo instanceof File) fd.append("photo", photo, photo.name);

    ////console.log("EYY");
    for (let [key, value] of fd.entries()) {
      ////console.log(key, value);
    }

    return await Axios.post(`${endpoint}create-new-recipe-by-admin/`, fd, {
      
    });
  } catch (error: any) {
    ////console.log("ERROR TAYO RITO", error);
    showToast(error.message, "error");
  }
}

export async function getPendingPaginatedRecipes(pageNumber: number) {
  //////////////////////////////////////////////////////////////////////////////////////////console.log  ("RESP", responsibilities)
  try {
    let recipes = null;

      recipes = await Axios.get(
        `${endpoint}get-pending-paginated-recipes/${pageNumber}`,
        {  }
      );

    return recipes;
  } catch (error) {
    //////////////////////console.log  ("ERROR", error)
  }
}


export async function getSingleRecipe(key: string) {
  try {
    const singleRecipe = await Axios.get(
      `${endpoint}get-single-recipe/${key}/`, {}
    );
    return singleRecipe;
  } catch (error) {
    //////////////////console.log("ERROR", error);
  }
}
export async function approveRecipePost(data: any) {
  try {

    console.log("DATA INPUT", data)
    const singleRecipe = await Axios.put(
      `${endpoint}approve-recipe-post`, data
    );
    return singleRecipe;
  } catch (error) {
    //////////////////console.log("ERROR", error);
  }
}
export async function declineRecipePost(data: any) {
  try {

    console.log("DATA INPUT", data)
    const singleRecipe = await Axios.put(
      `${endpoint}decline-recipe-post`, data
    );
    return singleRecipe;
  } catch (error) {
    //////////////////console.log("ERROR", error);
  }
}