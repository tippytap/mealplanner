import React, {createContext, useContext, useState, useEffect} from "react";
import { createMeal, getMeals, deleteMeal, updateMealDoc } from './Firebase';
import { categories } from "./categories";

const MealContext = createContext();

export const useMealContext = () => {
    return useContext(MealContext);
}

export const MealProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [filter, setFilter] = useState("all");
    const [allMeals, setAllMeals] = useState([]);

    useEffect(() => {
        fetchMeals();
    }, [])

    useEffect(() => {
        filterMeals();
    }, [filter])

    const fetchMeals = async () => {
        let mealData = await getMeals();
        sortMeals(mealData);
        setMeals(mealData);
        setAllMeals(mealData);
    }

    const sortMeals = (mealData) => {
        mealData.sort((a, b) => b.createdOn - a.createdOn);
    }

    const filterMeals = () => {
        if (filter !== categories().all) {
            setMeals(allMeals.filter((meal) => meal.category === filter));
        }
        else {
            setMeals(allMeals);
        }
    }

    const updateFilter = (filter) => {
        setFilter(filter);
        filterMeals(meals);
    }

    const saveMeal = (meal, category) => {
        if (meal && category && !meals.find((m) => m.name === meal)) {
            createMeal(meal, category).then(() => {
                fetchMeals();
            });
        }
    }

    const updateMeal = (meal) => {
        updateMealDoc(meal);
    }

    const removeMeal = (meal) => {
        const newMeals = meals.filter((m) => m.docId !== meal.docId);
        setMeals(newMeals);
        setAllMeals(newMeals);
        deleteMeal(meal);
    }

    return (
        <MealContext.Provider value={{
            meals,
            saveMeal,
            updateMeal,
            removeMeal,
            updateFilter,
            filter
        }}>
            {children}
        </MealContext.Provider>
    )
}