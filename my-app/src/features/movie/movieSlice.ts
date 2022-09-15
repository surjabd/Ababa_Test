import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../config/store';
import { getAllMovies, saveMovie } from './movieAPI';


export interface MovieResults {
  id: number;
  name: string;
  director: string;
  actor: string;
}


interface movieReducerInterface {
  items:MovieResults[],
  links:{
    first:string,
    last:string,
    next:string,
    prev:string
  },
  meta:{
    currentPage:number,
    itemCount:number,
    itemsPerPage:number,
    totalItems:number,
    totalPages:number,
  }
  status: 'idle' | 'loading' | 'failed';
}



const initialState: movieReducerInterface = {
  items:[],
  links:{
    first:'',
    last:'',
    next:'',
    prev:''
  },
  meta:{
    currentPage:1,
    itemCount:0,
    itemsPerPage:5,
    totalItems:0,
    totalPages:0,
  },
  status:'idle'
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllMoviesAsync = createAsyncThunk(
  'movies',
  async (movieRequest: object) => {
    const response = await getAllMovies(movieRequest);
    return response;
  }
)

export const saveMovieAsync = createAsyncThunk(
  'movies',
  async (movieRequest: object) => {
    console.log(movieRequest)
    const response = await saveMovie(movieRequest);
    return response;
  }
)




export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMoviesAsync.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(getAllMoviesAsync.fulfilled, (state, action) => {
        state.items=action.payload.items
        state.links = action.payload.links
        state.meta = action.payload.meta
        state.status = 'idle';
      })
      .addCase(getAllMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
}
)
// });




// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const moviesStore = (state: RootState) => state.movie;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default movieSlice.reducer;
