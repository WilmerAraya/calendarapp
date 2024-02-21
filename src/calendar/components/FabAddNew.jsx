// Fab=  Flotting action button

import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '', // Obligatorio
      notes: '',
      start: new Date(), // Obligatorio
      end: addHours(new Date(), 2), // Obligatorio
      bgColor: '#fafafa',
      user: {
          id: '1',
          name: 'Will'
      }
    });
    openDateModal();
  }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
