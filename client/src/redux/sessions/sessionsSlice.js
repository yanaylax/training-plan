import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionsService from "./sessionsService";

const initialState = {
  trainingSession: {
    title: "",
    description: "",
  },
  sessionBank: [],
  trainingPlan: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getSessions = createAsyncThunk(
  "sessions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionsService.getSessions(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addSession = createAsyncThunk(
  "sessions/add",
  async (sessionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionsService.addSession(sessionData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSession = createAsyncThunk(
  "sessions/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionsService.deleteSession(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async (session, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionsService.updateSession(session, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearTrainingPlan = createAsyncThunk(
  "sessions/clearTrainingPlan",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionsService.clearTrainingPlan(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    reset: (state) => initialState,
    changeCurrentSession: (state, action) => {
      const { key, value } = action.payload;
      state.trainingSession = { ...state.trainingSession, [key]: value };
    },

    onDragEnd: (state, action) => {
      const result = action.payload;
      if (!result.destination) return;
      if (
        result.source.droppableId === result.destination.droppableId &&
        result.source.index === result.destination.index
      )
        return;
      if (result.source.droppableId === "training-plan-key") {
        const draggedItem = state.trainingPlan[result.source.index];
        state.trainingPlan.splice(result.source.index, 1);

        if (result.destination.droppableId === "training-plan-key") {
          state.trainingPlan.splice(result.destination.index, 0, draggedItem);
        } else {
          state.sessionBank.splice(result.destination.index, 0, draggedItem);
          state.sessionBank = state.sessionBank.map((session, index) => ({
            ...session,
            inPlan: false,
            index: index,
          }));
        }
        state.trainingPlan = state.trainingPlan.map((session, index) => ({
          ...session,
          index: index,
        }));
      } else {
        const draggedItem = state.sessionBank[result.source.index];
        state.sessionBank.splice(result.source.index, 1);
        if (result.destination.droppableId === "training-plan-key") {
          state.trainingPlan.splice(result.destination.index, 0, draggedItem);
          state.trainingPlan = state.trainingPlan.map((session, index) => ({
            ...session,
            inPlan: true,
            index: index,
          }));
        } else {
          state.sessionBank.splice(result.destination.index, 0, draggedItem);
        }
        state.sessionBank = state.sessionBank.map((session, index) => ({
          ...session,
          index: index,
        }));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const sessions = action.payload;
        state.sessionBank = sessions.filter((session) => !session.inPlan);
        state.trainingPlan = sessions.filter((session) => session.inPlan);
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessionBank.push(action.payload);
        state.trainingSession = {
          title: "",
          description: "",
        };
      })
      .addCase(addSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessionBank = state.sessionBank.filter(
          (session) => session._id !== action.payload.id
        );
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { inPlan, _id, completed, type } = action.payload;
        if (type === "change-plan") {
          if (inPlan) {
            state.sessionBank = state.sessionBank.filter(
              (session) => session._id !== _id
            );
            delete action.payload.type;
            state.trainingPlan.push(action.payload);
          } else {
            state.trainingPlan = state.trainingPlan.filter(
              (session) => session._id !== _id
            );
            delete action.payload.type;
            state.sessionBank.push(action.payload);
          }
        } else if (type === "change-completed") {
          state.trainingPlan = state.trainingPlan.map((session) =>
            session._id === _id
              ? { ...session, completed: !session.completed }
              : session
          );
        }
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(clearTrainingPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearTrainingPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessionBank = action.payload;
        state.trainingPlan = [];
      })
      .addCase(clearTrainingPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const currentSession = (state) => state.sessions.trainingSession;
export const sessionBank = (state) => state.sessions.sessionBank;
export const sessionPlan = (state) => state.sessions.trainingPlan;

export const { changeCurrentSession, reset, onDragEnd } = sessionsSlice.actions;

export default sessionsSlice.reducer;
