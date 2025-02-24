import FeedbackForm from "./components/FeedbackForm";
import gguLogo from "./assets/ggu-logo.png";  // Add GGU round logo
import sgaLogo from "./assets/sga-logo.png";  // Add SGA rectangular logo

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gguBlue">
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="flex-1 flex items-center justify-center">
          <img src={gguLogo} alt="GGU Logo" className="w-40 h-auto" />
        </div>
        <div className="flex-1">
          <FeedbackForm />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src={sgaLogo} alt="SGA Logo" className="w-40 h-auto" />
        </div>
      </div>
    </div>
  );
}

export default App;
