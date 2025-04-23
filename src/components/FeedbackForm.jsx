import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import {
  LightBulbIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Notification from "./Notification";
import Spinner from "./Spinner";
import ProgressSteps from "./ProgressSteps";

const FEEDBACK_CATEGORIES = [
  { 
    id: "suggestion", 
    name: "Suggestion",
    description: "Share your ideas for improvement",
    icon: LightBulbIcon
  },
  { 
    id: "concern", 
    name: "Concern",
    description: "Report issues or problems",
    icon: ExclamationTriangleIcon
  },
  { 
    id: "general", 
    name: "General Feedback",
    description: "Other thoughts or comments",
    icon: ChatBubbleLeftRightIcon
  },
];

const STEPS = [
  { id: 'category', name: 'Select Category' },
  { id: 'feedback', name: 'Write Feedback' },
  { id: 'review', name: 'Review & Submit' }
];

const MAX_FEEDBACK_LENGTH = import.meta.env.VITE_MAX_FEEDBACK_LENGTH || 1000;
const RATE_LIMIT_REQUESTS = import.meta.env.VITE_RATE_LIMIT_REQUESTS || 5;
const RATE_LIMIT_WINDOW = import.meta.env.VITE_RATE_LIMIT_WINDOW_MINUTES || 60;

const FeedbackForm = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [draftFeedback, setDraftFeedback] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const feedback = watch("feedback", "");
  const category = watch("category", "");

  // Load draft feedback from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem("feedbackDraft");
    if (savedDraft) {
      setDraftFeedback(savedDraft);
    }
  }, []);

  // Update current step based on form progress
  useEffect(() => {
    if (category) {
      setCurrentStep(1);
      if (feedback) {
        setCurrentStep(2);
      }
    } else {
      setCurrentStep(0);
    }
  }, [category, feedback]);

  // Autosave draft
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (feedback) {
        localStorage.setItem("feedbackDraft", feedback);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [feedback]);

  // Rate limiting check
  const checkRateLimit = () => {
    const now = new Date();
    if (lastSubmissionTime) {
      const timeSinceLastSubmission = (now - new Date(lastSubmissionTime)) / 1000 / 60; // minutes
      if (submissionCount >= RATE_LIMIT_REQUESTS && timeSinceLastSubmission < RATE_LIMIT_WINDOW) {
        return false;
      }
    }
    return true;
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
  };

  const onSubmit = (data) => {
    setShowConfirmation(true);
  };

  const confirmSubmission = () => {
    if (!checkRateLimit()) {
      showNotification("error", `Please wait before submitting more feedback. Maximum ${RATE_LIMIT_REQUESTS} submissions per ${RATE_LIMIT_WINDOW} minutes.`);
      return;
    }

    setIsLoading(true);
    setShowConfirmation(false);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        showNotification("success", "Thank you! Your feedback has been submitted successfully.");
        reset();
        localStorage.removeItem("feedbackDraft");
        setSubmissionCount(prev => prev + 1);
        setLastSubmissionTime(new Date().toISOString());
        setCurrentStep(0);
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
        showNotification("error", "Sorry, there was an error submitting your feedback. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyboardSubmit = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gguBlue/5 to-lightBlue/10 p-4 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <img src="/src/assets/ggu-logo.png" alt="GGU Logo" className="w-16 h-16 md:w-20 md:h-20" />
          <div className="h-8 w-px bg-gray-300" />
          <img src="/src/assets/sga-logo.png" alt="SGA Logo" className="w-24 md:w-32 h-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gguBlue mb-2">Student Voice Portal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Share your thoughts anonymously with the Student Government Association</p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ProgressSteps steps={STEPS} currentStep={currentStep} />

          <div className="p-6 md:p-8">
            <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FEEDBACK_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        register("category").onChange({ target: { value: cat.id } });
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        category === cat.id 
                          ? 'border-gguBlue bg-gguBlue/5' 
                          : 'border-gray-200 hover:border-gguBlue/50'
                      }`}
                    >
                      <div className="text-center">
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${
                          category === cat.id ? 'text-gguBlue' : 'text-gray-400'
                        }`} />
                        <span className="block text-lg font-medium">{cat.name}</span>
                        <span className="text-sm text-gray-500">{cat.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}

              {/* Feedback Input */}
              <div className="relative">
                <TextareaAutosize
                  {...register("feedback", {
                    required: "Please enter your feedback",
                    maxLength: {
                      value: MAX_FEEDBACK_LENGTH,
                      message: `Feedback must not exceed ${MAX_FEEDBACK_LENGTH} characters`,
                    },
                  })}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-gguBlue/50 focus:border-transparent min-h-[200px]"
                  defaultValue={draftFeedback}
                  onKeyDown={handleKeyboardSubmit}
                />
                <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{feedback.length}/{MAX_FEEDBACK_LENGTH}</span>
                  <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">⌘ + Enter to submit</kbd>
                </div>
              </div>
              {errors.feedback && (
                <p className="mt-1 text-sm text-red-600">{errors.feedback.message}</p>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    localStorage.removeItem("feedbackDraft");
                    setCurrentStep(0);
                  }}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !category || !feedback}
                  className="px-8 py-2 bg-gguBlue text-white rounded-lg hover:bg-lightBlue disabled:opacity-50 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Feedback</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Your feedback is anonymous and helps improve the GGU community</p>
      </footer>

      <Notification
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ show: false, type: "", message: "" })}
      />

      <Transition show={showConfirmation} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowConfirmation(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Submission
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to submit this feedback?
                  </p>
                  <div className="mt-4 bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-sm">Category: {
                      FEEDBACK_CATEGORIES.find(cat => cat.id === category)?.name
                    }</p>
                    <p className="mt-1 text-sm">{feedback}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gguBlue border border-transparent rounded-md hover:bg-lightBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={confirmSubmission}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FeedbackForm;
