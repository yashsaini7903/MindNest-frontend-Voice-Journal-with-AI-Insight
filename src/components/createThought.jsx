import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { AllThoughtAction } from "../store/store";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();

    if (!title || !content) {
      setError("Please enter both title and content.");
      return;
    }

    // ✅ Get token from localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to create a thought.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/journal/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(AllThoughtAction.addOne(data));
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to create entry. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <div className="card shadow p-4" style={{ width: "600px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold text-success">Create a New Thought</h3>

        {error && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title of your thought
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              ref={titleRef}
              placeholder="Write your thought title..."
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label fw-semibold">
              Your thought
            </label>
            <textarea
              className="form-control"
              id="content"
              ref={contentRef}
              rows="4"
              placeholder="Express your thoughts here..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
