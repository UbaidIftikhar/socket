import React, { useEffect } from "react";
import face2 from "../../assets/images/faces/select2/p-1.jpg";
import face4 from "../../assets/images/faces/select2/p-1.jpg";
import face3 from "../../assets/images/faces/select2/p-1.jpg";
import face5 from "../../assets/images/faces/select2/p-1.jpg";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllMessages } from "../../redux/socket/messageSlice";
import moment from "moment";

const Message = () => {
  const roomId = useParams()?.roomId;
  const { messages } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    getAllMessages(roomId);
  }, [roomId]);

  const mesgs = [
    {
      sender: "668686e1d1fd9c86c58c7b7e",
      recipient: "668686ebd1fd9c86c58c7b81",
      text: "Nice to meet you 😀",
      status: "delivered",
      timestamp: "2024-07-05T11:11:47Z",
    },
    {
      sender: "668686ebd1fd9c86c58c7b81",
      recipient: "668686e1d1fd9c86c58c7b7e",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when",
      status: "read",
      timestamp: "2024-07-05T11:14:47Z",
    },
    {
      sender: "668686e1d1fd9c86c58c7b7e",
      recipient: "668686ebd1fd9c86c58c7b81",
      text: "Nice to meet you 😀",
      status: "delivered",
      timestamp: "2024-07-05T11:16:47Z",
    },
    {
      sender: "668686ebd1fd9c86c58c7b81",
      recipient: "668686e1d1fd9c86c58c7b7e",
      text: "Nice to meet you 😀",
      status: "delivered",
      timestamp: "2024-07-05T11:18:47Z",
    },
    {
      sender: "668686e1d1fd9c86c58c7b7e",
      recipient: "668686ebd1fd9c86c58c7b81",
      text: "Nice to meet you 😀",
      status: "delivered",
      timestamp: "2024-07-05T11:20:47Z",
    },
  ];

  return (
    <div className="main-chat-area border">
      <div className="d-flex align-items-center p-2 border-bottom">
        <div className="me-2 lh-1">
          <span className="avatar avatar-lg online me-2 avatar-rounded chatstatusperson">
            <img className="chatimageperson" src={face2} alt="img" />
          </span>
        </div>
        <div className="flex-fill">
          <p className="mb-0 fw-semibold fs-14">
            <Link to="#" className="chatnameperson responsive-userinfo-open">
              Emiley Jackson
            </Link>
          </p>
          <p className="text-muted mb-0 chatpersonstatus">online</p>
        </div>
      </div>
      <div className="chat-content p-0">
        <PerfectScrollbar>
          <ul className="list-unstyled chat-content">
            {mesgs.map((msg, idx) => (
              <li
                key={idx}
                className={`${
                  msg.sender === user._id ? "chat-item-start" : "chat-item-end"
                } `}
              >
                <div className="chat-list-inner">
                  <div className="chat-user-profile">
                    <span className="avatar avatar-md online avatar-rounded chatstatusperson">
                      <img className="chatimageperson" src={face2} alt="img" />
                    </span>
                  </div>
                  <div className="ms-3">
                    <span className="chatting-user-info">
                      <span className="chatnameperson">
                        {msg.sender === user._id ? user?.name : ""}
                      </span>{" "}
                      <span className="msg-sent-time">
                        {moment(msg?.timestamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </span>
                    <div className="main-chat-msg">
                      <div>
                        <p className="mb-0">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </PerfectScrollbar>
      </div>
      <div className="chat-footer">
        <Form.Control
          className="form-control"
          placeholder="Type your message here..."
          type="text"
        />
        <Link
          aria-label="anchor"
          className="btn btn-primary mx-2 btn-icon btn-send"
          to="#"
        >
          <i className="ri-send-plane-2-line"></i>
        </Link>
      </div>
    </div>
  );
};

export default Message;
