import { CartItem } from "../../components/cart/cartItem/CartItem";
import { Input } from "../../components/inputs/Input";
import { InputReadOnly } from "../../components/inputs/InputReadOnly";
import { Button } from "../../components/buttons/Button";
import { PersonalInfo } from "../../components/checkout/PersonalInfo";
import { DeliveryDetails } from "../../components/checkout/DeliveryDetails";
import { PaymentInfo } from "../../components/checkout/PaymentInfo";
import { OrderInfo } from "../../components/cart/OrderInfo";
import { cartStore } from "../../stores/cartStore";
import { useState } from "react";
import emailjs from "@emailjs/browser"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import "./CheckOut.css";

const serviceId = import.meta.env.REACT_APP_SERVICE_ID;
const templateId = import.meta.env.REACT_APP_TEMPLATE_ID;
const publicKey = import.meta.env.REACT_APP_PUBLIC_KEY;


export const CheckOut = () => {
  
  const [email, setEmail] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [show, toggleShow] = useState(false);

  const { cart } = cartStore();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1 );
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1 );
  };

  

  const sendEmail = (e) => {
    e.preventDefault();
    
    const templateParams = {
      to_email: "", 
      order: "Thank YOU",
    };
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Email could not be sent:', error);
    });
  } 

  return (
    <section>
      <h2>Check Out</h2>
      
      <form className={"checkout-form"} onSubmit={sendEmail}>
      <Accordion className="personal-info-accordion" defaultExpanded>
        <AccordionSummary>
          <Button btnText={"YOUR INFORMATION"}/>
        </AccordionSummary>
        <AccordionDetails className="accordion-detail-wrapper">
          <div className="acc-step-container">
            <p>Already have an account?</p>
            <Button btnText={"Log in"}/> 
            <Button btnText={"Register"}/>
            <Button btnText={"Continue as guest"} onClick={() => toggleShow(!show)}/>
            {show && <PersonalInfo />}
            <Button btnText={"Next"} onClick={handleNext}/>
          </div>
          <p>STEP 1/3</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={activeStep === 1}>
        <AccordionSummary>
          <Button btnText={"DELIVERY DETAILS"}/>
        </AccordionSummary>
        <AccordionDetails className="accordion-detail-wrapper">
          <div className="acc-step-container">
            <DeliveryDetails />
            <Button btnText={"Back"} onClick={handleBack}/>
            <Button btnText={"Next"} onClick={handleNext}/>      
          </div>
          <p>STEP 2/3</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={activeStep === 2}>
        <AccordionSummary>
          <Button btnText={"PAYMENT INFORMATION"}/>
        </AccordionSummary>
        <AccordionDetails className="accordion-detail-wrapper">
          <div className="acc-step-container">
            <PaymentInfo />
            <Button btnText={"Back"} onClick={handleBack}/>
            <Button btnText={"Next"} onClick={handleNext}/>
          </div>
          <p>STEP 3/3</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={activeStep === 3}>
        <AccordionSummary>
          <Button btnText={"YOUR ORDER"}/>
        </AccordionSummary>
        <AccordionDetails>
          <OrderInfo />
          {cart.map((item, index) => {
            return (
              <CartItem
                index={index}
                img={item.images.full_size_url}
                title={item.plant_title}
                price={item.price}
              />
            );
          })}
          <Button btnText={"Back"} onClick={handleBack}/>
        </AccordionDetails>
      </Accordion>

      <Button type={"submit"} btnText={"Pay"} />
      <p>
        *By pressing the pay button, you will get an email with your plant buddies.
        Please remember, this is <b>not</b> an actual shop, no money will be drawn,
        and unfortunately no plants will be sent. But thank you for testing it out!{" "}
      </p>
      </form>
    </section>
  );
};
