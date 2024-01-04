import React, { createContext, useState, useContext } from 'react';

export const WorkoutLogContext = createContext();

export const useWorkoutLog = () => useContext(WorkoutLogContext);

export const WorkoutLogProvider = ({ children }) => {
    const [workoutLogs, setWorkoutLogs] = useState({});

    return (
        <WorkoutLogContext.Provider value={{ workoutLogs, setWorkoutLogs }}>
            {children}
        </WorkoutLogContext.Provider>
    );
};

