import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="text-3xl font-extrabold text-brand-600 dark:text-brand-500 tracking-tight">
              SkillSphere
            </Link>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The premier marketplace connecting world-class freelance talent with the most ambitious businesses and projects globally.
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a href="#" className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              For Clients
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/search" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Find Freelancers
                </Link>
              </li>
              <li>
                <Link to="/post-gig" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Post a Gig
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Project Catalog
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              For Freelancers
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/search" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Boost Your Visibility
                </Link>
              </li>
              <li>
                <Link to="/my-gigs" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Community Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} SkillSphere Global Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              <span className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center text-[10px] font-bold">US</span>
              English
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              <span>₹</span>
              INR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;