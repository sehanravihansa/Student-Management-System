import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8070/student/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      alert('Student added successfully');
      navigate('/');
    } catch (error) {
      alert('Error adding student: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          placeholder="Age"
          required
          style={inputStyle}
        />
        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" style={buttonStyle}>Add Student</button>
      </form>
    </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px'
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};