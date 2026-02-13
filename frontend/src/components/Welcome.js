import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to Smart Attendance System</h1>
        <p className="lead mt-4">Manage student attendance efficiently and effectively</p>
        <hr className="my-4" />
        <div className="row mt-5">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👨‍🎓 Student Management</h5>
                <p className="card-text">Add, view, update, and manage student records</p>
                <Link to="/students" className="btn btn-primary">Manage Students</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📋 Attendance Management</h5>
                <p className="card-text">Track and manage student attendance records</p>
                <Link to="/attendance" className="btn btn-success">Manage Attendance</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
