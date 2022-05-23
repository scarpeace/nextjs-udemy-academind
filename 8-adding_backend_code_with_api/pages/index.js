import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedbacks, setFeedbacks] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function getAllFeedbacks() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedbacks));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Adress </label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback </label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button type="submit">Send Feedback</button>
      </form>

      <hr />
      <button onClick={getAllFeedbacks}>LoadFeedbacks</button>
      <ul>
        {feedbacks.map((feedback) => (
          <>
            <li key={feedback.id}>Feedback: {feedback.text}</li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
