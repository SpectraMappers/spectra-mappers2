import {
    createContext,
    useContext,
    useReducer,
    useCallback,
  } from "react";
  import axios from "axios";
  
  // Define initial state for input data
  const initialState = {
    patientInfo: [],
    patientFamily: [],
  };
  
  // Define actions to update input data
  const setInputData = (data) => ({
    type: "SET_INPUT_DATA",
    payload: data,
  });
  
  // Reducer function to update state based on actions
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "SET_INPUT_DATA":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  // Create context for input data
  const InputContext = createContext({
    inputData: initialState,
    fetchPatientData: () => {},
  });
  
  // Provider component to manage input data
  export const InputProvider = ({ children }) => {
    const [inputData, dispatch] = useReducer(inputReducer, initialState);
  
    // Function to fetch patient data
    const fetchPatientData = useCallback(async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/patientinfo");
        dispatch(setInputData({ patientInfo: response.data }));
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }, []);
  
  
    return (
      <InputContext.Provider
        value={{
          inputData,
          fetchPatientData,
        }}
      >
        {children}
      </InputContext.Provider>
    );
  };
  
  // Custom hook to use input context
  export const useInput = () => {
    return useContext(InputContext);
  };
  