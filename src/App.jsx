import { About, Contact, Experience, Hero, Feedbacks, Tech, Works, Navbar } from "./components";
import { StarsCanvas } from "./components/canvas";

const App = () => {
  return (
    <div className="relative z-0 bg-hero-pattern">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Works />
      <Tech />
      <div className="relative z-0">
        <Contact />
      </div>
    </div>
  );
};

export default App;
