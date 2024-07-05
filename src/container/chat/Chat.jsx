import { FC, Fragment, useEffect } from "react";
import {
  Button,
  Col,
  Dropdown,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
  Form,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
// import { Scrollbar } from 'react-scrollbars-custom';
// import RSC from "react-scrollbars-custom";
import { Photosmediadata } from "./chatdata";
import face2 from "../../assets/images/faces/select2/p-1.jpg";
import face4 from "../../assets/images/faces/select2/p-1.jpg";
import face3 from "../../assets/images/faces/select2/p-1.jpg";
import face5 from "../../assets/images/faces/select2/p-1.jpg";

import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../redux/socket/roomSlice";
import moment from "moment";

const Chat = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.conversations);

  const handleFetchConversations = () => {
    const userId = user._id;
    dispatch(fetchConversations(userId));
  };
  useEffect(() => {
    handleFetchConversations();
  }, []);

  return (
    <div className="min-vh-100">
      <div className="main-chart-wrapper p-2 gap-2 d-lg-flex">
        <div className="chat-info border">
          <Link
            aria-label="anchor"
            to="#"
            className="btn btn-secondary btn-icon rounded-circle chat-add-icon"
          >
            <i className="ri-add-line"></i>
          </Link>
          <div className="d-flex align-items-center justify-content-between w-100 p-3 border-bottom">
            <div>
              <h5 className="fw-semibold mb-0">Messages</h5>
            </div>
          </div>
          <div className="chat-search p-3 border-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search Chat"
                aria-describedby="button-addon2"
              />
              <Button
                variant=""
                aria-label="button"
                className="btn btn-light"
                type="button"
                id="button-addon2"
              >
                <i className="ri-search-line text-muted"></i>
              </Button>
            </div>
          </div>
          <Tab.Container defaultActiveKey="first">
            <Tab.Content>
              <Tab.Pane className="border-0 chat-users-tab" eventKey="first">
                <PerfectScrollbar>
                  <ul
                    className="list-unstyled mb-0 mt-2 chat-users-tab"
                    id="chat-msg-scroll"
                  >
                    <li className="pb-0">
                      <p className="text-muted fs-11 fw-semibold mb-2 op-7">
                        ALL CHATS
                      </p>
                    </li>
                    {list?.map((lis, idx) => (
                      <li key={idx} className="chat-inactive checkforactive">
                        <Link to={lis?.roomId}>
                          <div className="d-flex align-items-top">
                            <div className="me-1 lh-1">
                              <span className="avatar avatar-md offline me-2 avatar-rounded">
                                <img src={face3} alt="img" />
                              </span>
                            </div>
                            <div className="flex-fill">
                              <p className="mb-0 fw-semibold">
                                {lis?.otherUser?.name}
                                <span className="float-end text-muted fw-normal fs-11">
                                  {moment(lis?.timestamp).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </span>
                              </p>
                              <p className="fs-12 mb-0">
                                <span className="chat-msg text-truncate">
                                  {lis?.recentMessage}
                                </span>
                                <span className="chat-read-icon float-end align-middle">
                                  <i className="ri-check-double-fill"></i>
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </PerfectScrollbar>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
