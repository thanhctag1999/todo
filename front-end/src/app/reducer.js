import { SET_IS_ADD_MEETING } from "./Constants";
const initState = {
  isAddMeeting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case SET_IS_ADD_MEETING:
      return {
        isAddMeeting: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
}
export { initState };
export default reducer;
