import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")):[]
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addTOPaste: (state,action) => {
      const paste=action.payload;
      // add a check ->paste already exist
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste created Succesfully")
    },
    updateTOPaste: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=> item._id === paste._id);

      if(index >= 0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated")
      }
    },
    resetAllPaste: (state) => {
     state.pastes=[];
     localStorage.removeItem("pastes");
     toast.success("Every Paste is Deleted")
    },
    removeFromPaste:(state,action)=>{
      const pasteId = action.payload;
      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>
        item._id===pasteId
      );
      if(index >=0 ){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste deleted")
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTOPaste, updateTOPaste, resetAllPaste,removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
