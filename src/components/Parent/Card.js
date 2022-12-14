import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Card(props) {
  return (
    <>
      <div className="card mt-2">
        <div className="card-top ">
          <p className=" px-4 fs-5">{props.name}</p>
        </div>
        <div className="card-body">
          <ProgressBar striped variant="success" now={ ((props.progress)/8)*100 } />
          <p className="text-end me-3 mt-2 fs-5">{props.progress}/8 Lessons</p>
        </div>
      </div>
    </>
  );
}
