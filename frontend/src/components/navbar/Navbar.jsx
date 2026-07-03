import {
  Bell,
  Search,
} from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3 text-slate-400"
        />

        <input
          placeholder="Search..."
          className="rounded-xl border bg-slate-100 py-2 pl-10 pr-4 outline-none"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell />

        <img
          src="https://i.pravatar.cc/100"
          alt=""
          className="h-11 w-11 rounded-full"
        />

      </div>

    </header>
  );
}

export default Navbar;