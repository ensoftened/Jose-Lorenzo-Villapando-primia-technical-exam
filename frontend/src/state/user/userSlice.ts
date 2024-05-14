import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "@services/authService";
import { RootState } from "@state/store";
import axios from "axios";

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {},
};

//console.log("REDUX");
const userInfoFromLS: any = authService.getCurrentUserInfoFromLocalStorage();

console.log("THE CURRENT", userInfoFromLS);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state: any, action: PayloadAction<any>) => {
      ////////console.log("UPDATEEE!!!!")
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        //console.log("LOADING")
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        //console.log("REDUX SUCCESS", action.payload)
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
       //console.log("FAILED")
      });
  },
});

////////console.log("USERSLICE", userSlice)

export const fetchUserInfo: any = createAsyncThunk<
  { user: any },
  void,
  { state: RootState }
>("user/fetchUserInfo", async (_, { rejectWithValue }) => {
  try {
    if (userInfoFromLS) {
      const response = await axios.get<{ user: any }>(
        `${process.env.REACT_APP_SERVER_API_URL}user/get-single-user-by-username/${userInfoFromLS.username}`,
        // { withCredentials: true }
      ); // Replace '/api/user' with your actual API endpoint

      ////console.log("response.data.value", response.data.user)
      return response.data.user;
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const { updateUserInfo } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
