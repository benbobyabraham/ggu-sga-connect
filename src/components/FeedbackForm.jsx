import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

const FeedbackForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const form = useRef();

  const sendFeedback = (data) => {
    emailjs
      .sendForm(
        "service_d348qgq",  // Replace with your EmailJS Service ID
        "template_u70rlyr", // Replace with your EmailJS Template ID
        form.current,
        "Mpz_bz4-MyLTr2ASg"   // Replace with your EmailJS Public Key
      )
      .then(() => {
        alert("Feedback sent successfully!");
        reset(); // Reset form after submission
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-bgWhite">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gguBlue text-center mb-4">
          Anonymous Feedback
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Your voice matters! Share your feedback anonymously with the Student Government Association.
        </p>
        <form ref={form} onSubmit={handleSubmit(sendFeedback)} className="space-y-4">
          <textarea
            {...register("feedback")}
            placeholder="Write your feedback here..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lightBlue"
            required
          />
          <button type="submit" className="w-full bg-gguBlue text-white py-2 rounded-md hover:bg-lightBlue transition">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
