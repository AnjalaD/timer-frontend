import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-100vh">
      <h1>Home</h1>
      <Link to="/timer">Timer</Link>
    </div>
  );
};
