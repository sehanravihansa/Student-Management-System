import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AddStudent from "./components/addstudent";
import AllStudents from "./components/AllStudents";
import ViewStudent from "./components/viewstudent";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<AllStudents />} />
          <Route path="/view-students" element={<AllStudents />} />
          <Route path="/student/:id" element={<ViewStudent />} />
          <Route path="/add" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;