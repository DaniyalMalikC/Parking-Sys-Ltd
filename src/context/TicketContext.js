import React, { createContext, useContext, useState, useEffect } from "react";

//Firebase
import { firestore, GoogleFirebase } from "../config/config";

//Context
import { AuthContext } from "./AuthContext";

// Context
export const TicketContext = createContext();
export const TicketActionContext = createContext();

const TicketContextProvider = (props) => {
  const { isAuth, user } = useContext(AuthContext);

  //State
  const [tickets, setTickets] = useState([]);
  const [approveCount, setApproveCount] = useState(0);
  const [notApproveCount, setNotApproveCount] = useState(0);

  //Server Side Timestamp
  const TimeStamp = GoogleFirebase.firestore.FieldValue.serverTimestamp();

  //Validation
  const userID = isAuth ? user.uid : null;

  useEffect(() => {
    firestore
      .collection("tickets")
      .where("approve", "==", true)
      .onSnapshot((snap) => {
        setApproveCount(snap.size);
      });

    firestore
      .collection("tickets")
      .where("approve", "==", false)
      .onSnapshot((snap) => {
        setNotApproveCount(snap.size);
      });
    if (isAuth) {
      firestore
        .collection("tickets")
        .orderBy("createdAt", "desc")
        .onSnapshot((docSnap) => {
          if (!docSnap.empty) {
            setTickets(
              docSnap.docs.map((tags) => {
                return {
                  ticketID: tags.id,
                  area: tags.data().area,
                  createdAt: tags.data().createdAt,
                  uid: tags.data().uid,
                  startTime: tags.data().startTime,
                  endTime: tags.data().endTime,
                  approve: tags.data().approve,
                  price: tags.data().price,
                  tips: tags.data().tips,
                };
              }),
            );
          }
        });
    }
  }, [isAuth]);

  const handleTicketSubmit = (
    start,
    end,
    price,
    tips,
    area,
    setAlertTitle,
    setErr,
    setSuccess,
  ) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    // const startTime = start;
    // const endTime = end;

    const TicketData = {
      area: "P" + area,
      createdAt: TimeStamp,
      uid: userID,
      startTime: startTime,
      endTime: endTime,
      approve: false,
      price,
      tips,
    };

    console.log(" ===> ", endTime);
    // const limit = firestore.collection("tickets").where(userID, "==", "uid");

    var query = firestore.collection("tickets");

    var query_1 = query.where("startTime", "<", startTime);
    query_1.get().then((res_1) => {
      // console.log("response 1 => ", res_1.size);

      var query_2 = query.where("endTime", ">", endTime);
      query_2.get().then((res_2) => {
        // console.log("response 2 => ", res_2.size);

        var query_3 = query.where("startTime", "<", endTime);
        query_3.get().then((res_3) => {
          // console.log("response 3 => ", res_3.size);

          var query_4 = query.where("endTime", ">", startTime);
          query_4.get().then((res_4) => {
            // console.log("response 4 => ", res_4.size);

            var query_5 = query.where("area", "==", "P" + area);
            query_5.get().then((res_5) => {
              // console.log("response 5 => ", res_5.size);

              if (
                res_1.size >= 1 &&
                res_2.size >= 1 &&
                res_3.size >= 1 &&
                res_4.size >= 1 &&
                res_5.size >= 1
              ) {
                popUp(
                  setAlertTitle,
                  "Error submiting Ticket!",
                  setErr,
                  "You can't register Ticket in this Time Frame there is already Ticked is registerd.",
                );
              } else {
                firestore
                  .collection("tickets")
                  .doc()
                  .set(TicketData)
                  .then(() => {
                    popUp(
                      setAlertTitle,
                      "Successfully Submitted Ticket!",
                      setSuccess,
                      `${user.name} Keep registering Ticket with Parking Sys LTD.`,
                    );
                  })
                  .catch((error) => {
                    popUp(
                      setAlertTitle,
                      "Error submiting Ticket!",
                      setErr,
                      error.message,
                    );
                  });
                // console.log("No Data Exist");
              }
            });
          });
        });
      });
    });
  };

  // const sendEmail = (data) => {
  //   var data = {
  //     service_id: "service_zykfs2y",
  //     template_id: "service_zykfs2y",
  //     user_id: "user_aV26QX2PM16kK0e6JMN6v",
  // template_params: {
  //   name: data.name,
  //   email: data.email,
  //   startTime: data.startTime,
  //   area: data.area,
  //   endTime: data.endTime,
  // },
  //   };

  //   fetch("https://api.emailjs.com/api/v1.0/email/send", {
  //     type: "POST",
  //     data: JSON.stringify(data),
  //     contentType: "application/json",
  //   })
  //     .then((response) => console.log("Response 1 => ", response))
  //     .then((response) => console.log("Response 2 => ", response));
  //   // .done(function () {
  //   //   alert("Your mail is sent!");
  //   // })
  //   // .fail(function (error) {
  //   //   alert("Oops... " + JSON.stringify(error));
  //   // });
  // };

  const updateTicketStatus = (id, data) => {
    // sendEmail(data);
    firestore.collection("tickets").doc(id).update({
      approve: true,
    });
  };

  const deleteTicketStatus = (id) => {
    firestore.collection("tickets").doc(id).delete();
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
    <TicketContext.Provider value={{ tickets, approveCount, notApproveCount }}>
      <TicketActionContext.Provider
        value={{ handleTicketSubmit, updateTicketStatus, deleteTicketStatus }}
      >
        {props.children}
      </TicketActionContext.Provider>
    </TicketContext.Provider>
  );
};

export default TicketContextProvider;
