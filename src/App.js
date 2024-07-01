import './App.css';
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Meals from "./Meals.js";
import Login from "./Login.js";
import { MealProvider } from './MealContext.js';
import { ListProvider } from './ListContext.js';
import { Typography, Stack } from '@mui/material';
import { AuthProvider } from './AuthContext.js';
import Logout from "./Logout";
import Lists from "./Lists.js";
import DisplaySingleList from './DisplaySingleList.js';

export default function App() {

  return (

    <AuthProvider>
      <div className="App">
        <header className="App-header" style={{margin: "1em 0"}}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h1" sx={{fontSize: "3rem", borderBottom: "1px solid grey"}} mt={2}>Meal Planner</Typography>
            <Logout />
          </Stack>
        </header>
        <main style={{marginBottom: "5rem"}}>
          <MealProvider>
            <ListProvider>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/Meals" element={<Meals />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Lists" element={<Lists />} />
                  <Route path="/Lists/:id" element={<DisplaySingleList />} />
                </Routes>
              </BrowserRouter>
            </ListProvider>
          </MealProvider>
        </main>
      </div>
    </AuthProvider>
  );
}
