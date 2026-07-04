import { useSelector } from "react-redux";

function Dashboard() {

  const { user } = useSelector(
    (state) => state.auth
  );

  return (

    <div className="space-y-6">

      <h1 className="text-4xl font-bold">

        Welcome,

        {" "}

        {user?.fullName}

        👋

      </h1>

      <div className="rounded-2xl bg-white p-8 shadow">

        <h2 className="text-2xl font-bold">

          Profile

        </h2>

        <div className="mt-6 space-y-3">

          <p>

            <b>Email :</b>

            {" "}

            {user?.email}

          </p>

          <p>

            <b>Role :</b>

            {" "}

            {user?.role}

          </p>

          <p>

            <b>Verified :</b>

            {" "}

            {user?.isVerified
              ? "Yes"
              : "No"}

          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;