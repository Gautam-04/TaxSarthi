import React from 'react'
import './Form.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CheckBox from '../../components/mis/CheckBox';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import States from '../../utils/States.json';

function FormFilling() {
const Link = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <a href=' ' style={{color: "black" , textDecoration: "none"}}>{children}</a>
  </OverlayTrigger>
);

  return (
    <section id="form-filling">
      <div className="personalInfo">
        <h1 className="formTitle">Personal Information</h1>
        <hr style={{ marginBottom: 20 }} />
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="First Name" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Middle Name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Middle Name" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Last Name" />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Aadhar Card Number"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Aadhar Card Number" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="PanCard Number"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="PanCard Number" />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Flat No, Building Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label style={{ display: "flex", alignItems: "center" }}>
              Permanant Address{" "}
              <span style={{ marginLeft: "10px" }}>
                <Link id="t-2" title="Select If permanent address is the same">
                  <CheckBox onChange={() => {}} />
                </Link>
              </span>
            </Form.Label>
            <Form.Control placeholder="locality, city" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State/UT</Form.Label>
              <Form.Select>
                {States.map(
                  (
                    state // Added parentheses and return statement
                  ) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>

          <hr style={{ marginBottom: 20 }} />
          <h1 className="formTitle">Employeers Information</h1>
          <hr style={{ marginBottom: 20 }} />
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Name of Employer</Form.Label>
            <Form.Control placeholder="Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address of the Employer</Form.Label>
            <Form.Control placeholder="Flat No, Building Name" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>PAN Of the Deductor</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>TAN Of the Deductor</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Link
                id="t-2"
                title="provided by the Employer
(If available)"
              >
                <Form.Label style={{ display: "flex", alignItems: "center" }}>
                  Employee Reference No
                </Form.Label>
              </Link>
              <Form.Control />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Period With Employer (yyyy).</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="From"
                className="mb-3"
              >
                <Form.Control placeholder="From" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="To"
                className="mb-3"
              >
                <Form.Control placeholder="To (yyyy)" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Assessment Year</Form.Label>
              <Form.Control placeholder="2022-2023" />
            </Form.Group>
          </Row>

          <hr style={{ marginBottom: 20 }} />
          <h1 className="formTitle">Employeers Information</h1>
          <hr style={{ marginBottom: 20 }} />

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Have you verified the Information"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default FormFilling;