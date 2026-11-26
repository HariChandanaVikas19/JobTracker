import Hero from "./landing/Hero";
import Features from "./landing/Features";
import HowItWorks from "./landing/HowItWorks";
import CallToAction from "./landing/CallToAction";
import Footer from "./landing/Footer";
import { useAuth } from "../context/useAuth";

const Landing = () => {
  const { isLoggedIn } = useAuth();

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
