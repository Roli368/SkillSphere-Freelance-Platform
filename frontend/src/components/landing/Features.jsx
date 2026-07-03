import {
  Briefcase,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: <Briefcase size={40} />,
    title: "Thousands of Jobs",
    desc: "Find projects from startups and enterprises."
  },
  {
    icon: <Wallet size={40} />,
    title: "Secure Payments",
    desc: "Payments are protected and transparent."
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Verified Users",
    desc: "Every client and freelancer is verified."
  }
];

function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">

          Why SkillSphere?

        </h2>

        <div className="grid gap-8 md:grid-cols-3">

          {features.map((item,index)=>(
            <div
              key={index}
              className="rounded-2xl bg-slate-50 p-8 shadow hover:shadow-xl transition"
            >

              <div className="text-blue-600">

                {item.icon}

              </div>

              <h3 className="mt-5 text-2xl font-bold">

                {item.title}

              </h3>

              <p className="mt-3 text-slate-600">

                {item.desc}

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;