import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewStudent() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8070/student/get/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student');
      }
      const data = await response.json();
      setStudent(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching student: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:8070/student/delete/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        alert('Student deleted successfully');
        navigate('/');
      } catch (err) {
        alert('Error deleting student: ' + err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!student) return <div>No student found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Gender:</strong> {student.gender}</p>
      <button onClick={handleDelete} style={deleteButtonStyle}>Delete Student</button>
      <button onClick={() => navigate('/')} style={buttonStyle}>Back to All Students</button>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px'
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f44336'
};