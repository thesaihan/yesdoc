import React, { useState, useEffect } from "react";
import "./EmployeeDetailPage.css";

import Axio from "axios";
import { API_ENDPOINT, getDefaultEmp } from "../utils/Constants";

const EmployeeDetailPage = ({ match }) => {
  const [emp, setEmp] = useState(getDefaultEmp());

  useEffect(() => {
    if (match.params.id) {
      Axio.get(API_ENDPOINT + `/employee/${match.params.id}`)
        .then(res => setEmp(res.data))
        .catch(error => {
          console.error(error);
          setEmp(getDefaultEmp());
        });
    } else {
      setEmp(getDefaultEmp());
    }
  }, [match.params.id]);

  const onEmpChange = e => {
    const newEmp = Object.assign({}, emp);
    newEmp[e.target.getAttribute('id')] = e.target.value;
    setEmp(newEmp);
  };

  return (
    <div className="EmployeeDetailPage container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6">
          <div className="bg-light py-4 py-sm-5 px-3 px-sm-4 px-md-5 form-wrapper shadow">
          <form>
            <div className="form-group">
              <label htmlFor="memberId">Member ID : </label>
              <input
                type="text"
                className="form-control"
                id="memberId"
                aria-describedby="memberIdHelp"
                readOnly={match.params.id ? true : false}
                disabled={match.params.id ? true : false}
                value={emp.memberId}
                required={true}
                onChange={onEmpChange}
              />
              <small id="memberIdHelp" className="form-text text-muted">
                Once Employee Member ID is set, it can't be changed!
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                className="form-control text-info"
                id="name"
                aria-describedby="nameHelp"
                value={emp.name}
                required={true}
                onChange={onEmpChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth : </label>
              <input
                type="date"
                className="form-control text-info"
                id="dateOfBirth"
                aria-describedby="nameHelp"
                value={emp.dateOfBirth}
                onChange={onEmpChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employerName">Employer Name : </label>
              <input
                type="text"
                className="form-control text-info"
                id="employerName"
                aria-describedby="employerNameHelp"
                value={emp.employerName}
                onChange={onEmpChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address : </label>
              <textarea
                className="form-control text-info"
                id="address"
                aria-describedby="addressHelp"
                value={emp.address}
                onChange={onEmpChange}
              />
            </div>
            <input type="submit" className="btn btn-info" value="Save" />
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
