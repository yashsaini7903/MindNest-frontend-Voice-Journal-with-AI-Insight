import {configureStore, createSlice} from '@reduxjs/toolkit'
import MyThoughts from '../components/MyThoughts';


const AllThoughtSlice = createSlice({
  name:'AllThought',
  initialState: {thoughts :[{title:'random', content:'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography'},
    {title:'random', content:'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography'},
  ]},
  reducers:{
     addInitial: (state, action)=>{
       state.thoughts= action.payload;
    },
    addOne: (state, action)=>{
      state.thought = [...state.thoughts, action.payload]
    }
  }
})

const MyThoughtSlice = createSlice({
  name:'myThought',
  initialState: {thoughts :[{title:'random', content:'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography'},
    {title:'random', content:'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography'},
  ]},
  reducers:{
     addInitial: (state, action)=>{
       state.thoughts= action.payload;
    },
    addOne: (state, action)=>{
      state.thought = [...state.thoughts, action.payload]
    }
  }
})



const ThoughtStore = configureStore({
    reducer:{
       AllThoughts:AllThoughtSlice.reducer,
       MyThoughts:MyThoughtSlice.reducer
    }
})
export const MyThoughtAction = MyThoughtSlice.actions;
export const AllThoughtAction = AllThoughtSlice.actions;
export default ThoughtStore