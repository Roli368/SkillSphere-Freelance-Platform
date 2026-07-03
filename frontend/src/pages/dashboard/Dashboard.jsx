import {
  Briefcase,
  FileText,
  IndianRupee,
  Users,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import RecentJobs from "../../components/dashboard/RecentJobs";
import RecentProposals from "../../components/dashboard/RecentProposals";
import ProfileCard from "../../components/dashboard/ProfileCard";

function Dashboard() {
  return (
    <div className="space-y-8">

      <ProfileCard />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Jobs"
          value="24"
          icon={<Briefcase />}
        />

        <StatCard
          title="Proposals"
          value="12"
          icon={<FileText />}
        />

        <StatCard
          title="Clients"
          value="8"
          icon={<Users />}
        />

        <StatCard
          title="Earnings"
          value="₹52K"
          icon={<IndianRupee />}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentJobs />

        <RecentProposals />

      </div>

    </div>
  );
}

export default Dashboard;