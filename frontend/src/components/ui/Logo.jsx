import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="text-3xl font-extrabold text-blue-600"
    >
      SkillSphere
    </Link>
  );
}

export default Logo;