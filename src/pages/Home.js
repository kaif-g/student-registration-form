
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/User");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/User/${id}`);
    loadUsers();
  };

  return (
    <div className="container" style={{ maxWidth: '750px'}}>
      <div className="py-4">
        {users.map((user, index) => (
          <div className="card mb-3" key={user.id}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 style={{ alignItems:'center'}} > User Details - {index + 1}</h5>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <img 
                  src={`${process.env.PUBLIC_URL}/aitsclglogo1.png`} 
                  alt="College Logo" 
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    filter: 'brightness(1.5)', 
                  
                    
                  }} 
                />
              </div>
              {[
                { label: "First Name", value: user.firstName },
                { label: "Middle Name", value: user.middleName },
                { label: "Last Name", value: user.lastName },
                { label: "Mother's Name", value: user.motherName },
                { label: "Father's Name", value: user.fatherName },
                { label: "Mobile Number", value: user.mobileNumber },
                { label: "Alternate Number", value: user.alternateMobileNumber },
                { label: "Email", value: user.email },
                { label: "Password", value: user.password },
                { label: "Gender", value: user.gender },
                { label: "Colleges", value: user.colleges },
                { label: "Branch", value: user.branch },
                { label: "Course Duration", value: user.courseDuration },
                { label: "Start Date", value: user.startDate },
                { label: "End Date", value: user.endDate },
              ].map((field, i) => (
                <div className="row mb-2 align-items-center" key={i} style={{ marginBottom: '10px' }}>
                  <div className="col-sm-4" style={{ textAlign: 'left', fontWeight: 'bold',paddingLeft:'100px' }}>
                    {field.label}
                  </div>
                  <div className="col-sm-1 text-center">
                    :
                  </div>
                  <div className="col-sm-7" style={{ textAlign: 'left',paddingLeft:'90px' }}>
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer d-flex justify-content-end">
              <Link className="btn btn-primary mx-2" to={`/viewUser/${user.id}`}>
                View
              </Link>
              <Link className="btn btn-outline-primary mx-2" to={`/editUser/${user.id}`}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
