import { BadgeCheck, Briefcase, Clock, DollarSign, GraduationCap, Code } from "lucide-react";

function ProfileInfo({ user, freelancerProfile }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Profile Information
        </h2>
        {user?.role === "freelancer" && freelancerProfile && (
          <span className="px-3 py-1 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold text-sm rounded-full border border-brand-200 dark:border-brand-500/20">
            Freelancer
          </span>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Full Name</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 break-words">{user?.fullName}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Email</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 break-words">{user?.email}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Role</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 capitalize">{user?.role}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Status</span>
          <div className="text-lg font-bold">
            {user?.isVerified ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <BadgeCheck size={20} /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Freelancer Specific Info */}
      {user?.role === "freelancer" && freelancerProfile && (
        <div className="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-8">
          
          {/* Bio & Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <Briefcase className="text-brand-500" size={20} /> Professional Headline
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg break-words">
                  {freelancerProfile.headline || "No headline provided."}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <Code className="text-brand-500" size={20} /> About Me
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed break-words">
                  {freelancerProfile.bio || "No biography provided."}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-800/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Hourly Rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">${freelancerProfile.hourlyRate}/hr</p>
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Availability</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white capitalize">{freelancerProfile.availability}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          {freelancerProfile.skills && freelancerProfile.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {freelancerProfile.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700">
                    {skill.name} <span className="opacity-50 ml-1">({skill.level})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {freelancerProfile.education && freelancerProfile.education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <GraduationCap className="text-brand-500" size={20} /> Education
              </h3>
              <div className="space-y-4">
                {freelancerProfile.education.map((edu, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                      <GraduationCap size={18} className="text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{edu.institute} • {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {freelancerProfile.certifications && freelancerProfile.certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <BadgeCheck className="text-brand-500" size={20} /> Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freelancerProfile.certifications.map((cert, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50">
                    <h4 className="font-bold text-slate-900 dark:text-white">{cert.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{cert.issuer} • {cert.year}</p>
                    {cert.link && <a href={cert.link} className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mt-2 inline-block hover:underline" target="_blank" rel="noreferrer">View Certificate</a>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Milestone Pricing Setup */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 mt-4">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="text-indigo-500" size={20} /> Pricing Structure
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                {freelancerProfile.milestonePricing ? "Accepts Milestone-based Pricing for long-term projects." : "Strictly Hourly Pricing."}
              </p>
          </div>


        </div>
      )}

    </div>
  );
}

export default ProfileInfo;