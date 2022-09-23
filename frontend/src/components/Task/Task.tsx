import React from "react";
import check from "../../img/check.svg";
import remove from "../../img/remove.svg";
import unchecked from "../../img/unchecked.svg";
import "./Task.css";

export default function Task({
  status,
  description,
  id,
  deleteTask,
  markTask,
}: {
  status: boolean;
  description: string;
  id: string;
  deleteTask: any;
  markTask: any;
}) {
  const style = {
    textDecoration: status ? "line-through" : "none",
  };
  return (
    <>
      <div className="Task">
        <div className="status">
          <button onClick={() => markTask(id, status)} className="checkBtn">
            {status ? (
              <img alt="check" src={check} />
            ) : (
              <img alt="unchecked" src={unchecked} />
            )}
          </button>
        </div>

        <div style={style} className="description">
          {description}
        </div>

        <div className="remove">
          <button onClick={(e: any) => deleteTask(id)} className="removeBtn">
            <img src={remove} alt="remove" />
          </button>
        </div>
      </div>
    </>
  );
}
