import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "./card";
import { AllThoughtAction,MyThoughtAction } from "../store/store";

const ThoughtList = () => {
  const { thoughts } = useSelector((store) => store.AllThoughts);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add initial thoughts to Redux
  const handleAddInitial = (data) => {
    dispatch(AllThoughtAction.addInitial(data));
    dispatch(MyThoughtAction.addInitial(data));
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchThoughts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:3000/api/journal/all", {
          signal,
          credentials: "include", // ✅ sends JWT if needed
        });

        if (!res.ok) {
          throw new Error("Failed to fetch thoughts.");
        }

        const data = await res.json();
        handleAddInitial(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Something went wrong while fetching thoughts.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();

    return () => controller.abort();
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 fw-bold text-primary">
        All Thoughts 
      </h3>

      {loading && <p className="text-center text-muted">Loading thoughts...</p>}
      {error && (
        <p className="text-center text-danger fw-semibold">{error}</p>
      )}

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {thoughts.length > 0 ? (
          thoughts.map((thought, index) => (
            <Card
              key={index}
              title={thought.title}
              content={thought.content}
            />
          ))
        ) : (
          !loading && <p className="text-center text-muted">No thoughts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ThoughtList;
