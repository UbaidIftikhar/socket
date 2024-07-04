import { Fragment, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
// import desktoplogo from "../../../assets/images/brand-logos/desktop-logo.png";
// import logo from "../../../assets/images/brand-logos/logo.png";
// import desktopdarklogo from "../../../assets/images/brand-logos/desktop-dark.png";
// import { Link } from "react-router-dom";
import Loader from "../common/loader/loader.jsx";

const Login = ({
  handleValue,
  handleChange,
  handleSubmit,
  touched,
  errors,
  loader,
}) => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
          <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
            <div className="my-5 gap-3 d-flex align-items-center justify-content-center">
              <h3 className="h4 ">Glmpse</h3>
              {/* <img height={50} src={logo} alt="icon" /> */}
            </div>
            <Card className="custom-card">
              <Card.Body className="p-5">
                <p className="h5 fw-semibold mb-2 text-center">Sign In</p>
                <p className="mb-4 text-muted op-7 fw-normal text-center">
                  Welcome to dashboard
                </p>
                <Form onSubmit={handleSubmit}>
                  <div className="row gy-3">
                    <Col xl={12}>
                      <Form.Label
                        htmlFor="signin-username"
                        className="form-label text-default"
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control-lg"
                        id="email"
                        placeholder="email"
                        onChange={handleChange}
                        value={handleValue.email}
                        name="email"
                      />
                      {errors.email && touched.email && (
                        <div className="text-danger mt-1">{errors.email}</div>
                      )}
                    </Col>
                    <Col xl={12} className="mb-2">
                      <Form.Label
                        htmlFor="signin-password"
                        className="form-label text-default d-block"
                      >
                        Password
                        {/* <Link
                          to={PATHS.FORGET_PASSWORD}
                          className="float-end text-danger"
                        >
                          Forget password ?
                        </Link> */}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={passwordshow1 ? "text" : "password"}
                          className="form-control-lg"
                          id="password"
                          placeholder="password"
                          onChange={handleChange}
                          value={handleValue.password}
                          name="password"
                        />

                        <Button
                          variant="light"
                          className="btn"
                          onClick={() => setpasswordshow1(!passwordshow1)}
                        >
                          <i
                            className={`${
                              passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </InputGroup>
                      {errors.password && touched.password && (
                        <div className="text-danger mt-1 ">
                          {errors.password}
                        </div>
                      )}
                      <div className="mt-2">
                        <div className="form-check">
                          <Form.Check
                            className=""
                            type="checkbox"
                            onChange={handleChange}
                            value={handleValue.remember}
                            name="remember"
                            id="defaultCheck1"
                          />
                          <Form.Label
                            className="form-check-label text-muted fw-normal"
                            htmlFor="defaultCheck1"
                          >
                            Remember me
                          </Form.Label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={12} className="d-grid mt-2">
                      <button
                        className="btn btn-lg btn-primary"
                        disabled={loader}
                        type="submit"
                      >
                        {loader ? <Loader /> : "Sign In"}
                      </button>
                    </Col>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
