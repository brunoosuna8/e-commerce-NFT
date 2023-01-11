import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import UserBasicInfo from "./UserBasicInfo";
import UserMediumInfo from "./UserMediumInfo";
import UserAdvancedInfo from "./UserAdvancedInfo";
import styles from "./stylesheets/UserVerify.module.css";

export default function UserVerify() {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatusStorage = localStorage.getItem("loginStatus");
  const [step, setStep] = useState(1);

  const [userData, setUserData] = useState({
    // step 1
    name: "",
    last_name: "",
    age: "",
    dni: "",
    phone_number: "",
    nationality: "",
    address: "",
    metamask_wallet: "",

    // step 2
    face_picture: "",

    // step 3
    dni_image_front: "",
    dni_image_back: "",
  });

  // -- STEPS --
  const next = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const back = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  // SUBMIT USER
  const handleSubmit = (e) => {
    e.preventDefault();
    let userDataObj = {
      ...userData,
      userId: user.id,
    };
    dispatch(actions.askForVerification(userDataObj));
  };

  return (
    <div className={styles["user-verify-container"]}>
      <fieldset
        className={
          step !== 1 ? styles["noneDisplay"] : styles["first-field-collections"]
        }
      >
        <UserBasicInfo
          userData={userData}
          setUserData={setUserData}
          next={next}
        />
      </fieldset>

      <fieldset className={`info-fieldset ${step !== 2 ? "noneDisplay" : ""}`}>
        <UserMediumInfo
          userData={userData}
          setUserData={setUserData}
          back={back}
          next={next}
        />
      </fieldset>

      <fieldset
        className={`info-fieldset ${
          step !== 3 ? "noneDisplay" : "first-field-collections"
        }`}
      >
        <UserAdvancedInfo
          userData={userData}
          setUserData={setUserData}
          back={back}
          next={next}
        />
      </fieldset>
    </div>
  );
}