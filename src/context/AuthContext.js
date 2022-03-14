import React, { createContext, useState, useEffect } from "react";

//Firebase
import { auth, firestore } from "../config/config";

// Context
export const AuthContext = createContext();
export const AuthActionContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const date = new Date();

  useEffect(() => {
    const userData = localStorage.getItem("UserData");
    const data = JSON.parse(userData);

    if (data !== null) {
      setUser(data);
      setIsAuth(true);
    }
  }, []);

  const signIn = (email, password, setWarn, setErr) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        localStorage.setItem("emailVerified", user.emailVerified);
        !user.emailVerified
          ? unVerifiedEmail(user, setWarn)
          : firestore
              .collection("users")
              .doc(user.uid)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  const data = doc.data();
                  const userData = {
                    createdAt: data.createdAt,
                    uid: data.uid,
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    phoneNumber: data.phoneNumber,
                    brand: data.brand,
                    model: data.model,
                    noPlate: data.noPlate,
                    address: data.address,
                    type: data.type,
                  };
                  localStorage.setItem("UserData", JSON.stringify(userData));
                  setUser(userData);
                  setIsAuth(true);
                } else {
                  // console.log("No such document!");
                  setErr("There is no such document!");
                }
              })
              .catch((error) => {
                // console.log("Error getting document:", error);
                setErr(error.message);
              });
      })
      .catch((error) => {
        var errorCode = error.code;
        errorCode === "auth/user-not-found"
          ? setErr("There is no user record. Please! Sign Up. Thanks")
          : setErr("Invalid User Credentials!");
      });
  };

  const unVerifiedEmail = (user, setWarn) => {
    user.sendEmailVerification();
    setWarn(
      "Please verify your email address! To verify check your email inbox for verification link. Thanks!",
    );
  };

  const signUp = (name, email, password, err) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((Credential) => {
        var user = Credential.user;

        localStorage.setItem("emailVerified", user.emailVerified);

        user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            user
              .sendEmailVerification()
              .then(() => {
                const userData = {
                  createdAt: date,
                  uid: user.uid,
                  name: name,
                  email: user.email,
                  avatar: "",
                  phoneNumber: "",
                  brand: "",
                  model: "",
                  noPlate: "",
                  type: "user",
                };
                setUser(userData);
                firestore
                  .collection("users")
                  .doc(user.uid)
                  .set(userData)
                  .then(() => {
                    setIsAuth(true);
                  })
                  .catch((error) => {
                    err(error.message, error.code);
                  });
              })
              .catch(function (error) {
                err(error.message, error.code);
              });
          });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        err(error.message, error.code);
      });
  };

  const userInfo = (phoneNumber, brand, model, noPlate, address, Err) => {
    firestore
      .collection("users")
      .doc(user["uid"])
      .update({
        phoneNumber: phoneNumber,
        brand: brand,
        model: model,
        noPlate: noPlate,
        address: address,
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(user["uid"])
          .get()
          .then((doc) => {
            const data = doc.data();
            const userData = {
              createdAt: data.createdAt,
              uid: data.uid,
              name: data.name,
              email: data.email,
              avatar: data.avatar,
              phoneNumber: data.phoneNumber,
              brand: data.brand,
              model: data.model,
              noPlate: data.noPlate,
              address: data.address,
              type: data.type,
            };
            localStorage.setItem("UserData", JSON.stringify(userData));
            setUser(userData);
          });
      })
      .catch((err) => {
        Err(err.message);
      });
  };

  const recoverPass = (email, setErr, setSuccess) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccess("Reset password link sent successfully!");
      })
      .catch((error) => {
        setErr(error.message);
      });
    setTimeout(() => {
      setSuccess("");
      setErr("");
    }, 10000);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      window.location.reload();
      localStorage.removeItem("UserData");
      localStorage.clear();
      setUser("");
    });
  };

  const usersDetails = (id, state) => {
    if (id) {
      firestore
        .collection("users")
        .doc(id)
        .onSnapshot((doc) =>
          state({
            name: doc.data().name,
            email: doc.data().email,
            avatar: doc.data().avatar,
            brand: doc.data().brand,
            model: doc.data().model,
            noPlate: doc.data().noPlate,
          }),
        );
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuth }}>
      <AuthActionContext.Provider
        value={{ signIn, signUp, userInfo, recoverPass, signOut, usersDetails }}
      >
        {props.children}
      </AuthActionContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
