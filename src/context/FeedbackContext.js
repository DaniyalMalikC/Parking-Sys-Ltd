import React, { createContext, useContext, useState, useEffect } from "react";

//Firebase
import { firestore, GoogleFirebase } from "../config/config";

//Context
import { AuthContext } from "./AuthContext";

// Context
export const FeedContext = createContext();
export const FeedActionContext = createContext();

const FeedContextProvider = (props) => {
  const { isAuth, user } = useContext(AuthContext);

  //State
  const [feedbacks, setfeedbacks] = useState([]);

  //Server Side Timestamp
  const TimeStamp = GoogleFirebase.firestore.FieldValue.serverTimestamp();

  //Validation
  const userID = isAuth ? user.uid : null;

  useEffect(() => {
    if (isAuth) {
      if (user.type === "admin") {
        firestore
          .collection("feedbacks")
          .orderBy("createdAt", "desc")
          .onSnapshot((docSnap) => {
            if (!docSnap.empty) {
              setfeedbacks(
                docSnap.docs.map((feeds) => {
                  return {
                    createdAt: feeds.data().createdAt,
                    uid: feeds.data().uid,
                    feed: feeds.data().feed,
                    feedID: feeds.id,
                  };
                }),
              );
            }
          });
      } else {
        firestore
          .collection("feedbacks")
          .where(userID, "==", "uid")
          .orderBy("createdAt", "desc")
          .onSnapshot((docSnap) => {
            if (!docSnap.empty) {
              setfeedbacks(
                docSnap.docs.map((feeds) => {
                  return {
                    createdAt: feeds.data().createdAt,
                    feed: feeds.data().feed,
                    feedID: feeds.id,
                  };
                }),
              );
            }
          });
      }
    }
  }, [isAuth]);

  const handleFeedbackSubmit = (feed, setAlertTitle, setErr, setSuccess) => {
    const feedbackData = {
      createdAt: TimeStamp,
      uid: userID,
      feed: feed,
    };
    firestore
      .collection("feedbacks")
      .doc()
      .set(feedbackData)
      .then(() => {
        popUp(
          setAlertTitle,
          "Successfully Submitted Feedback!",
          setSuccess,
          `${user.name} we are glad to learn reviews from you.`,
        );
      })
      .catch((error) => {
        popUp(
          setAlertTitle,
          "Error submiting Feedback!",
          setErr,
          error.message,
        );
      });
  };

  const popUp = (setTitle, title, setMsg, msg) => {
    setTitle(title);
    setMsg(msg);
    setTimeout(() => {
      setTitle("");
      setMsg("");
    }, 10000);
  };

  return (
    <FeedContext.Provider value={{ feedbacks }}>
      <FeedActionContext.Provider value={{ handleFeedbackSubmit }}>
        {props.children}
      </FeedActionContext.Provider>
    </FeedContext.Provider>
  );
};

export default FeedContextProvider;
