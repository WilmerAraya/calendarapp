import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../"
import { localizer } from '../../helpers'
import { getMessagesES } from '../../helpers/getMessages'
import { useEffect, useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [LastView, setLastView] = useState(localStorage.getItem("lastView") || "week");

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user._ui );

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = ( event ) => {
        openDateModal();
    }
 
    const onSelect = ( event ) => {
        setActiveEvent( event );
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem("lastView", event);
        setLastView( event );
    }

    useEffect(() => {
      startLoadingEvents();
    }, []);
    

    return (
        <>
            <NavBar />

            <Calendar
                culture='es'
                messages={ getMessagesES() }
                localizer={localizer}
                events={events}
                defaultView={ LastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
