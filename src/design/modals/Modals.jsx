import { Dialog } from "@mui/material";
import React from "react";
import "./Modals.scss";

// To be used when there are two buttons in the modal along with a title
export const Modal1 = ({
  showModal,
  setShowModal,
  onClick1,
  onClick2,
  title,
  button1Text,
  button2Text,
}) => {
  return (
    <Dialog open={showModal} className="" onClose={() => setShowModal(false)}>
      <div className="modal1">
        <p>{title}</p>
        <button onClick={() => onClick1()} className="btn btn-primary">
          {button1Text}
        </button>
        <button className="btn btn-danger" onClick={() => onClick2()}>
          {button2Text}
        </button>
      </div>
    </Dialog>
  );
};

// To be used when there is only title in the modal

export const Modal2 = ({ showModal, setShowModal, title }) => {
  return (
    <Dialog open={showModal} className="" onClose={() => setShowModal(false)}>
      <div className="modal2">
        <p>{title}</p>
      </div>
    </Dialog>
  );
};
