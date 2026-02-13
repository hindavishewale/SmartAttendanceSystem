import React, { useState, useEffect } from 'react';
import { attendanceAPI, studentAPI } from '../services/api';

function AttendanceManagement() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    status: 'Present'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await attendanceAPI.getAll();
      setAttendanceList(response.data);
    } catch (error) {
      alert('Error fetching attendance: ' + error.message);
    }
  };

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
    if (!formData.studentId || !formData.date) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await attendanceAPI.add(formData);
      setFormData({ studentId: '', date: '', status: 'Present' });
      fetchAttendance();
      alert('Attendance added successfully');
    } catch (error) {
      alert('Error adding attendance: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await attendanceAPI.delete(id);
        fetchAttendance();
        alert('Attendance deleted successfully');
      } catch (error) {
        alert('Error deleting attendance: ' + error.message);
      }
    }
  };

  const handleUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    try {
      await attendanceAPI.update(id, { status: newStatus });
      fetchAttendance();
      alert('Attendance updated successfully');
    } catch (error) {
      alert('Error updating attendance: ' + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attendance Management</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add Attendance</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-2">
                <select
                  className="form-select"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
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
                />
              </div>
              <div className="col-md-3 mb-2">
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Attendance Records</h5>
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
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleUpdate(record.attendanceId, record.status)}
                        >
                          Toggle
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(record.attendanceId)}
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

export default AttendanceManagement;
