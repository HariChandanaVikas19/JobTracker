import Hero from "./landing/Hero";
import Features from "./landing/Features";
import HowItWorks from "./landing/HowItWorks";
import CallToAction from "./landing/CallToAction";
import Footer from "./landing/Footer";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/auth/authSlice";

const Landing = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <main>
        <Hero loggedIn={isLoggedIn} />
        <Features />
        <HowItWorks />
        <CallToAction loggedIn={isLoggedIn} />
      </main>
      <Footer loggedIn={isLoggedIn} />
    </>
  );
};

export default Landing;
