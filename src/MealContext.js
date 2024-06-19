import React, {createContext, useContext, useState, useEffect} from "react";
import { createMeal, getMeals, deleteMeal, updateMealDoc, getCategories, getCategory, createCategory } from './Firebase';

const MealContext = createContext();

export const useMealContext = () => {
    return useContext(MealContext);
}

export const MealProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [filter, setFilter] = useState("all");
    const [allMeals, setAllMeals] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchMeals();
        fetchCategories();
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
        if (filter !== "all") {
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

    const fetchCategories = async () => {
        let categoryData = await getCategories();
        setCategories(categoryData);
    }

    const saveCategory = (categoryName) => {
        if (categoryName && !categories.find(c => c === categoryName)) {
            createCategory(categoryName);
            fetchCategories();
            filterMeals();
        }
    }

    return (
        <MealContext.Provider value={{
            meals,
            saveMeal,
            updateMeal,
            removeMeal,
            updateFilter,
            filter,
            categories,
            saveCategory,
            fetchCategories
        }}>
            {children}
        </MealContext.Provider>
    )
}