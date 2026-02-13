import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter student name');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editId) {
        await studentAPI.update(editId, { name });
        setSuccess('Student updated successfully');
        setEditId(null);
      } else {
        await studentAPI.add({ name });
        setSuccess('Student added successfully');
      }
      setName('');
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await studentAPI.delete(id);
      setSuccess('Student deleted successfully');
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👨‍🎓 Student Management</h2>

      <ErrorMessage message={error} onClose={() => setError('')} />
      <SuccessMessage message={success} onClose={() => setSuccess('')} />

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{editId ? 'Edit Student' : 'Add New Student'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter student name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                  {loading ? 'Processing...' : editId ? 'Update' : 'Add Student'}
                </button>
                {editId && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Student List ({students.length})</h5>
          {loading && <Loading />}
          {!loading && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
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
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(student)}
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(student.id)}
                            disabled={loading}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentManagement;
