function ProfileCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="flex items-center gap-4">

        <div className="h-16 w-16 rounded-full bg-blue-600"></div>

        <div>

          <h2 className="text-xl font-bold">

            Welcome 👋

          </h2>

          <p className="text-slate-500">

            Complete your profile

          </p>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;