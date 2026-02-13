import React, { useState, useEffect } from 'react';
import { attendanceAPI, studentAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function AttendanceManagement() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await attendanceAPI.getAll();
      setAttendanceList(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.date) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await attendanceAPI.add(formData);
      setSuccess('Attendance added successfully');
      setFormData({
        studentId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this attendance record?')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await attendanceAPI.delete(id);
      setSuccess('Attendance deleted successfully');
      fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (record) => {
    const newStatus = record.status === 'Present' ? 'Absent' : 'Present';
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await attendanceAPI.update(record.attendanceId, { status: newStatus });
      setSuccess('Attendance updated successfully');
      fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Attendance Management</h2>

      <ErrorMessage message={error} onClose={() => setError('')} />
      <SuccessMessage message={success} onClose={() => setSuccess('')} />

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add Attendance</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-2">
                <select
                  className="form-select"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-2">
                <input
                  type="date"
                  className="form-control"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="col-md-3 mb-2">
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  disabled={loading}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div className="col-md-2 mb-2">
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Attendance Records ({attendanceList.length})</h5>
          {loading && <Loading />}
          {!loading && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No attendance records found</td>
                    </tr>
                  ) : (
                    attendanceList.map((record) => (
                      <tr key={record.attendanceId}>
                        <td>{record.attendanceId}</td>
                        <td>{record.studentName}</td>
                        <td>{record.date}</td>
                        <td>
                          <span className={`badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleToggleStatus(record)}
                            disabled={loading}
                          >
                            Toggle
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(record.attendanceId)}
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

export default AttendanceManagement;
