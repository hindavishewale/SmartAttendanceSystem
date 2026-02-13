import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data);
    } catch (error) {
      alert('Error fetching students: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter student name');
      return;
    }
    setLoading(true);
    try {
      await studentAPI.add({ name });
      setName('');
      fetchStudents();
      alert('Student added successfully');
    } catch (error) {
      alert('Error adding student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        fetchStudents();
        alert('Student deleted successfully');
      } catch (error) {
        alert('Error deleting student: ' + error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Management</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Student</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter student name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Student'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Student List</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">No students found</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentManagement;
