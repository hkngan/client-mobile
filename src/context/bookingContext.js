import React, { createContext, useState } from 'react';

const BookingContext = createContext()

const BookingProvider = ({children}) => {
    const [movie, setMovie] = useState(null)
    const [selectedTheater, setSelectedTheater] = useState(null)
    const [selectedShowtime, setSelectedShowtime] = useState(null)
    const [selectedSeat, setSelectedSeat] = useState([])
    const [amount, setAmount] = useState([])
    const [selectedCombos, setSelectedCombos] = useState([]);
    
    return (
        <BookingContext.Provider
          value={{
            movie,
            setMovie,
            selectedTheater,
            setSelectedTheater,
            setSelectedShowtime,
            selectedShowtime,
            selectedSeat,
            setSelectedSeat,
            amount,
            setAmount,
            selectedCombos,
            setSelectedCombos,
          }}
        >
          {children}
        </BookingContext.Provider>
      );
    };
    
    export { BookingProvider, BookingContext };