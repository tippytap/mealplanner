import React, {createContext, useContext, useState, useEffect} from "react";
import { createMeal, getMeals, deleteMeal, updateMealDoc, getCategories, getCategory, createCategory } from './Firebase';
import { useSnackbarContext } from "./SnackbarContext";

const MealContext = createContext();

export const useMealContext = () => {
    return useContext(MealContext);
}

export const MealProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [filter, setFilter] = useState("all");
    const [allMeals, setAllMeals] = useState([]);
    const [categories, setCategories] = useState([]);

    const {showMessage} = useSnackbarContext();

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

    const saveMeal = async (meal, category) => {
        if (meal && category && !meals.find((m) => m.name === meal)) {
            await createMeal(meal, category).then(() => {
                fetchMeals();
            }).catch(e => showMessage(e, "danger"));
        }
    }

    const updateMeal = async (meal) => {
        await updateMealDoc(meal)
            .catch(e => showMessage("Unable to update meal", "danger"));
    }

    const removeMeal = (meal) => {
        const newMeals = meals.filter((m) => m.docId !== meal.docId);
        setMeals(newMeals);
        setAllMeals(newMeals);
        deleteMeal(meal)
            .then(() => showMessage("Meal deleted successfully"))
            .catch(e => showMessage("Unable to delete this meal", "danger"));
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
            fetchCategories,
            fetchMeals
        }}>
            {children}
        </MealContext.Provider>
    )
}