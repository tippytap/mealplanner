import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Meals from "./meal/Meals.js";
import Login from "./auth/Login.js";
import { MealProvider } from './meal/MealContext.js';
import { ListProvider } from './list/ListContext.js';
import { Typography, Stack } from '@mui/material';
import { AuthProvider } from './auth/AuthContext.js';
import Lists from "./list/Lists.js";
import DisplaySingleList from './utils/DisplaySingleList.js';
import { SnackbarProvider } from './utils/SnackbarContext.js';
import { MenuAppBarProvider } from './utils/MenuAppBarContext.js';

export default function App() {

  return (
    <SnackbarProvider>
    <AuthProvider>
      <div className="App">
        <header className="App-header" style={{margin: "1em 0"}}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h1" sx={{fontSize: "3rem", borderBottom: "1px solid grey"}} mt={2}>Meal Planner</Typography>
          </Stack>
        </header>
        <main style={{marginBottom: "5rem"}}>
            <MealProvider>
              <ListProvider>
                <BrowserRouter>
                <MenuAppBarProvider>
                  <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/Meals" element={<Meals />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Lists" element={<Lists />} />
                    <Route path="/Lists/:id" element={<DisplaySingleList />} />
                  </Routes>
                </MenuAppBarProvider>
                </BrowserRouter>
              </ListProvider>
            </MealProvider>
        </main>
      </div>
    </AuthProvider>
    </SnackbarProvider>
  );
}
