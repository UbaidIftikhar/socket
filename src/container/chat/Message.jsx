import React, { useEffect, useState } from "react";
import face2 from "../../assets/images/faces/select2/p-1.jpg";
import face4 from "../../assets/images/faces/select2/p-1.jpg";
import face3 from "../../assets/images/faces/select2/p-1.jpg";
import face5 from "../../assets/images/faces/select2/p-1.jpg";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessages,
  receiveMessage,
  sendMessage,
} from "../../redux/socket/messageSlice";
import moment from "moment";

const Message = () => {
  const dispatch = useDispatch();
  const roomId = useParams()?.roomId;
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.conversations);
  const { messages, currentPage, totalPages } = useSelector(
    (state) => state.messages
  );
  let recpUser = list?.filter((lis) => lis?.roomId === roomId);
  recpUser = recpUser[0];

  useEffect(() => {
    dispatch(receiveMessage());
    dispatch(getAllMessages(roomId));
  }, [dispatch, roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    const messageData = {
      recipientEmail: recpUser?.otherUser?.email,
      username: user?.username,
      message: {
        sender: user?._id,
        recipient: recpUser?.otherUser?._id,
        roomId: roomId,
        text: message,
      },
    };
    dispatch(sendMessage(messageData));
    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className="main-chat-area border">
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
            {messages.map((msg, idx) => (
              <li
                key={idx}
                className={`${
                  msg.sender !== user._id ? "chat-item-start" : "chat-item-end"
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
                        {msg.sender === user._id
                          ? user?.name
                          : recpUser?.otherUser?.name}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          aria-label="anchor"
          className="btn btn-primary mx-2 btn-icon btn-send"
          to="#"
          // onClick={handleSendMessage}
          type="submit"
        >
          <i className="ri-send-plane-2-line"></i>
        </button>
      </div>
    </form>
  );
};

export default Message;
