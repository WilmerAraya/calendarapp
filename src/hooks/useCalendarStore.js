import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(
                                `/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({...calendarEvent, user}));
            } else {
                // Creando
                const { data } = await calendarApi.post('/events', calendarEvent);
                console.log(calendarEvent);
                dispatch( onAddNewEvent({
                    ...calendarEvent,
                    id: data.evento.id,
                    user
                }) )
            } 
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }
        
    }

    const startDeletingEvent = async() => {

        try {

            if( !activeEvent ) return; 
            await calendarApi.delete(`/events/${ activeEvent.id }`);

            dispatch( onDeleteEvent() ); 
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
        }

    }

    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const eventos = convertEventsToDateEvents( data.eventos );

            dispatch( onLoadEvents(eventos) );

        } catch (error) {
            console.log({ErrorEventos: error});
        }
    }

    return {
        //* Propiedadesp
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
