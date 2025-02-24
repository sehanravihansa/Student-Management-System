import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8070/student/');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching students: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:8070/student/delete/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        alert('Student deleted successfully');
        fetchStudents(); // Refresh the list after deletion
      } catch (err) {
        alert('Error deleting student: ' + err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>All Students</h1>
      <Link to="/add" style={buttonStyle}>Add New Student</Link>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Age</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td style={tableCellStyle}>{student.name}</td>
              <td style={tableCellStyle}>{student.email}</td>
              <td style={tableCellStyle}>{student.age}</td>
              <td style={tableCellStyle}>{student.gender}</td>
              <td style={tableCellStyle}>
                <Link to={`/student/${student._id}`} style={linkStyle}>View</Link>
                <button onClick={() => handleDelete(student._id)} style={deleteButtonStyle}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

const linkStyle = {
  marginRight: '10px',
  textDecoration: 'none',
  color: '#0066cc'
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  marginBottom: '20px'
};

const deleteButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '4px'
};