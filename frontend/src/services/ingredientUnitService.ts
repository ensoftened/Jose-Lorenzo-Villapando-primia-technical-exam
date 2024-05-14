import authService from "./authService";
import Axios from "axios";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
const endpoint = `${process.env.REACT_APP_SERVER_API_URL}Ingredient-unit/`;

const currentUser: any = authService.getCurrentUserInfoFromLocalStorage();
const retrievedResponsibilities: any = authService.getResponsibilities();
////////////console.log("retrievedResps", retrievedResponsibilities)

export async function checkIfIngredientUnitNameIsTaken(
  ingredientUnitName: string
) {
  ////////console.log("CHECKING")
  return await Axios.post(
    `${endpoint}check-if-ingredientUnit-name-is-taken/`,
    { ingredientUnitName }
    // { withCredentials: true }
  );
}

export async function getAllIngredientUnits() {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  try {
    let ingredientUnits = null;
    if (retrievedResponsibilities.includes("GET_ROLES")) {
      ingredientUnits = await Axios.get(
        `${endpoint}get-all-ingredient-units`
        // {withCredentials: true,}
      );
    } else if (
      retrievedResponsibilities.includes("GET_SUPER_ADMIN_AND_ADMIN_ROLES")
    ) {
      ingredientUnits = await Axios.get(
        `${endpoint}get-super-admin-and-admin-ingredient-units`
        // { withCredentials: true }
      );
    }

    //////////////console.log  ("THE ROLES", ingredientUnits)
    return ingredientUnits;
  } catch (error) {
    //////////////////console.log  ("ERROR", error)
  }
}

export async function getPaginatedIngredientUnits(pageNumber: number) {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let ingredientUnits = null;

    ingredientUnits = await Axios.get(
      `${endpoint}get-paginated-ingredient-units/${pageNumber}`
      // { withCredentials: true }
    );

    console.log("ingredientUnits", ingredientUnits);

    ingredientUnits?.data.list.map((ingredientUnit: any) => {
      ingredientUnit["ingredient"] = {
        _id: ingredientUnit.ingredient._id,
        label: ingredientUnit.ingredient.ingredientName,
      };
      // ingredientUnit["unit"] = {
      //   _id: ingredientUnit.unit._id,
      //   label: ingredientUnit.unit.unitName,
      // };
      ingredientUnit["commonUnit"] = {
        _id: ingredientUnit.commonUnit._id,
        label: ingredientUnit.commonUnit.unitName,
      };

      return ingredientUnit;
    });
    console.log("INGREDIENT UNITS", ingredientUnits);
    ////////////console.log  ("THE ROLES", ingredientUnits)
    return ingredientUnits;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}

export async function searchIngredientUnits(
  searchData: string,
  dateFrom: string,
  dateTo: string,
  pageNumber: number
) {
  //////////////////////////////////////////////////////////////////////////////console.log  ("IS NULL", dt==null)
  const df = dateFrom == null ? "" : dateFrom;
  const dt = dateTo == null ? "" : dateTo;
  //////////////////////////////////////////////////////////////////////////////console.log  ("SEARCH DATA", searchData)
  //////////////////////////////////////////////////////////////////////////////console.log  ("LINK", `${endPoint}search-documents?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`)
  console.log("SEARCH");

  try {
    let ingredientUnits = await Axios.get(
      `${endpoint}search-ingredient-units?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`
      // { withCredentials: true }
    );

    ingredientUnits?.data.list.map((ingredientUnit: any) => {
      ingredientUnit["ingredient"] = {
        _id: ingredientUnit.ingredient._id,
        label: ingredientUnit.ingredient.ingredientName,
      };
      ingredientUnit["unit"] = {
        _id: ingredientUnit.unit._id,
        label: ingredientUnit.unit.unitName,
      };
      ingredientUnit["commonUnit"] = {
        _id: ingredientUnit.commonUnit._id,
        label: ingredientUnit.commonUnit.unitName,
      };

      return ingredientUnit;
    });

    console.log("ANG ingredientUnits", ingredientUnits);
    return ingredientUnits;
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function createNewIngredientUnit(data: any) {
  try {
    const { ingredient, commonUnit, uomgpu } = data;

    //////////////////////////////////////////////////////////////////////////////console.log  ("TRULALOO", data)
    return await Axios.post(
      `${endpoint}create-new-ingredient-unit/`,
      data
      //  {
      //   withCredentials: true,
      // }
    );
  } catch (error) {
    //////////////////////////////////////////////////////////////////////////////console.log  ("THE ERROR", error)
  }
}

export async function editIngredientUnit(id: string, data: any) {
  try {
    console.log("TRULALOO", data);
    return await Axios.put(
      `${endpoint}edit-ingredient-unit/${id}`,
      data
      // {withCredentials: true,}
    );
  } catch (error) {
    console.log("THE ERROR", error);
  }
}

export async function fetchIngredientUnitsByIngredientForSelectField(
  ingredient: any
) {
  //////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)
  const { _id } = ingredient;

  if (_id) {
    try {
      let ingredientUnits = await Axios.get(
        `${endpoint}fetch-ingredient-units-by-ingredient-for-select-field/${_id}`,
        {}
      );
      //////////console.log("INGREDIENT UNITS", ingredientUnits);
      let modifiedIngredientUnits = ingredientUnits?.data?.list?.map(
        (item: any) => {
          return {
            _id: item.unit._id,
            label: item.unit.unitName,
          };
        }
      );

      //////////console.log("MODIFIED", modifiedIngredientUnits);
      ////////////////////////console.log  ("THE ROLES", ingredientUnits)
      return modifiedIngredientUnits;
    } catch (error) {
      //////////console.log("ERROR", error);
    }
  }

  return [];
}
