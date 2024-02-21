import { createSlice } from '@reduxjs/toolkit'
// import { addHours } from 'date-fns'

// const tempEvent = {
//   id: new Date().getTime(),
//   title: 'Cena', // Obligatorio
//   notes: ' Vestirse bien',
//   start: new Date(), // Obligatorio
//   end: addHours(new Date(), 2), // Obligatorio
//   bgColor: '#fafafa',
//   user: {
//       id: '1',
//       name: 'Will'
//   }
// }


export const calendarSlice = createSlice({
  name: 'calendar',
  isLoading: true,
  initialState: {
    events: [
      //tempEvent
    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: ( state, { payload } ) => {
      state.events.push( payload );
      state.activeEvent = null;
    },

    onUpdateEvent: ( state, { payload } ) => {
      state.events = state.events.map( event => {
        if ( event.id === payload.id ) {
          return payload;
        }
        // Retorna los que no coinciden para que se mantengan
        return event;
      } )
    },

    onDeleteEvent: ( state ) => {
      state.events = state.events.filter(
        event => event.id !== state.activeEvent.id
      )
      state.activeEvent = null;
    },
    onLoadEvents: ( state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach( event => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id);
        if ( !exists ) {
          state.events.push( event );
        }
      } )
    },
    onLogoutCalendar: (state) => {
      state.isLoading = true,
      state.events = [],
      state.activeEvent = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents,
  onLogoutCalendar 
} = calendarSlice.actions