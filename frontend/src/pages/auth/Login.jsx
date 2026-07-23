import LoginForm from "../../components/auth/LoginForm";

import { motion } from "framer-motion";
import Logo from "../../components/ui/Logo";

function Login() {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <Logo />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <LoginForm />
        </motion.div>
      </div>

      {/* Right Art Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-800 relative overflow-hidden items-center justify-center p-12">
        {/* Decorative Circles */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-32 -right-32 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-brand-400/30 rounded-full blur-3xl -bottom-32 -left-32 animate-pulse delay-1000" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-white max-w-lg text-center"
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">Your next big opportunity starts here.</h2>
          <p className="text-lg text-brand-100 font-medium">Join the premium network of top freelancers and visionary clients building the future together.</p>
        </motion.div>
      </div>

    </div>
  );
}

export default Login;