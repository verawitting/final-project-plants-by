import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartStore } from "../../stores/useCartStore";
// importing components
import { InputField } from "../../components/inputs/InputField";
import { Button } from "../../components/buttons/Button";
import { Accordion } from "../../components/accordion/Accordion";
import { CartItem } from "../../components/cart/cartItem/CartItem";
import { PersonalInfo } from "../../components/checkout/PersonalInfo";
import { DeliveryDetails } from "../../components/checkout/DeliveryDetails";
import { PaymentInfo } from "../../components/checkout/PaymentInfo";
import { OrderInfo } from "../../components/checkout/OrderInfo";
import { OrderSuccess } from "../../components/checkout/OrderSuccess";
// email js function
import emailjs from "@emailjs/browser";
// snackbar, icons and styling
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { RiTruckLine } from "react-icons/ri";
import "./CheckOutPage.css";


export const CheckOutPage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // variables for the emailjs function
  const serviceId = "service_yl79s0f";
  const templateId = "template_a3do47o";
  const publicKey = "14TsPm9sc7yUWZT-s";

  // email state for guest users for emailjs function
  const [email, setEmail] = useState("");

  // show state for show/hide additional personal information
  const [show, toggleShow] = useState(false);

  //This variable should change when we have an actual username
  let username = "Plant Friend";

  const { cart, calculateTotalPrice, clearCart } = cartStore();

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const sendEmail = async () => {
    
    // data to send to emailjs
    const templateParams = {
      to_email: email,
      to_name: username,
      message: cart
        .map(
          (item) =>
            `${item.plant_title}\n Botanical Name: ${item.botanical_name}\nPrice: €${item.price}\nQuantity: ${item.quantity}\n\n`
        )
        .join("\n"),
      image_link: cart[0].images.full_size_url,
      image_alt: cart[0].plant_title,
      logo_link: "https://i.ibb.co/6yySrmj/logo.png",
      logo_alt: "Plants by Holm & Witting logotype",
    };

    // sending the email to the given email address
    return emailjs
    .send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      if (response.status === 200) {
        // sending user to success message
        setShowSuccessMessage(true);
        window.scrollTo({
          top: 0,
          behavior: 'smooth', 
        });
      } else {
        // alerting user email was not sent
        setSnackbarOpen(true);
        setShowSuccessMessage(false);
      }
    })
    .catch((error) => {
      console.error("Email could not be sent:", error);
      setSnackbarOpen(true);
      setShowSuccessMessage(false);
    });
  };

  const handleContinueAsGuest = (e) => {
    e.preventDefault();
    toggleShow(!show);
  };

  // function to send email via emailjs to the user's email address
  const handlePayButtonClick = async (e) => {
    e.preventDefault();
    await sendEmail();
    clearCart();
  };

  const accordionItems = [
    {
      title: "Your information",
      content: (
        <>
          <div className="checkout-account-wrapper">
            <div className="coming-soon-wrapper">
              <span className="coming-soon">Coming soon...</span>
                Login to use your account to check out. 
                This is not implemented yet, so please check out as a guest below with your email.
              <div className="login-wrapper">
                <p>Already have an account?</p>
                <Button className={"checkout-btn gradient-btn"} btnText={"Log in"} ariaLabel={"Go to login"}/>
              </div>
              <div className="login-wrapper">
                <p>Create an account!</p>
                <Button className={"checkout-btn gradient-btn"} btnText={"Register"} ariaLabel={"Go to register"}/>
              </div>
            </div>
            <span 
            className="" 
            onClick={handleContinueAsGuest}>
              Continue as guest
            </span>
            <div className="form-wrapper">
              {show && (
                <>
                  <InputField
                    type={"email"}
                    name={"to_email"}
                    placeholder={"your.email@email.com"}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    ariaLabel={"Email input."}
                    labelTxt={"Please put in your email"}
                  />
                  <PersonalInfo />
                </>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Delivery details",
      content: (
        <>
          <div className="accordion-step-container">
            <div className="delivery-icons-wrapper">
              <div className="packed-with-love-container">
                <LuPackageCheck className="icon" />
                <p>packed with love</p>
              </div>
              <div className="climate-shipping-container">
                <RiTruckLine className="icon" />
                <p>climate shipping </p>
              </div>
            </div>
            <DeliveryDetails />
          </div>
        </>
      ),
    },
    {
      title: "Payment information",
      content: (
        <>
          <div className="acc-step-container">
            <PaymentInfo />
          </div>
        </>
      ),
    },
    {
      title: "Your order",
      content: (
        <>
          <OrderInfo />
          <div className="cart-list-container">
            {cart.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  index={index}
                  img={item.images.full_size_url}
                  title={item.plant_title}
                  price={item.price}
                  quantity={item.quantity}
                  botanicalName={item.botanical_name}
                />
              );
            })}
          </div>
        </>
      ),
    },
  ];

  return (
      <>
        <section className="checkout-section">
          <div className="checkout-page-wrapper">
            {showSuccessMessage ? (
              <OrderSuccess />
              ) : ( 
                <>
                  <Link to="/cart" className="go-back" aria-label="go back to cart">
                    <MdKeyboardArrowLeft className="go-back-icon" />
                    Go back to cart
                  </Link>
                  <h2 className="section-title">Check Out</h2>
                  <div className={"checkout-form"}>
                    <Accordion items={accordionItems} showButtons={true} openFirstAccordion={true}/>
                    <div className="btn-container-checkout">
                      <Link to="/plants/all-plants" aria-label="continue shopping">
                        <Button className="clear-btn checkout-btn" 
                          btnText="Continue shopping"/>
                      </Link>
                      <Button className={"checkout-btn terracotta-btn"} type={"submit"} btnText={"Pay"} onClick={(e) => handlePayButtonClick(e)} ariaLabel={"Pay and finish"}/>
                    </div>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarOpen(false)}
                      >
                        <MuiAlert
                          onClose={() => setSnackbarOpen(false)}
                          severity="error"
                          sx={{
                            width: "100%",
                            backgroundColor: "#bb5532",
                            color: "#f3f3ea",
                            "& .MuiSvgIcon-root": {
                              fill: "#f3f3ea",
                            },
                          }}
                        >
                          Unfortunatley, we could not send you an email...Are you sure you put in the right address? Try again!
                        </MuiAlert>
                      </Snackbar>
                    <p className="p-small">
                      *By pressing the pay button, you will get an email with your plant
                      buddies. Please remember, this is <b>not</b> an actual shop, no money
                      will be drawn, and unfortunately no plants will be sent. But thank you
                      for testing it out!{" "}
                    </p>
                  </div> 
                </>
              )}
        </div>
      </section>
    </>
  );
};
