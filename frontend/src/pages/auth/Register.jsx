import RegisterForm from "../../components/auth/RegisterForm";

import { motion } from "framer-motion";
import Logo from "../../components/ui/Logo";

function Register() {
  return (
    <div className="min-h-screen flex flex-row-reverse bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        <div className="absolute top-8 right-8 sm:top-12 sm:right-12 lg:hidden">
          <Logo />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <RegisterForm />
        </motion.div>
      </div>

      {/* Left Art Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-12 left-12">
          <Logo />
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-700" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-white max-w-lg text-center"
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">Create your account.</h2>
          <p className="text-lg text-slate-300 font-medium">Join thousands of professionals scaling their careers and businesses on SkillSphere.</p>
        </motion.div>
      </div>

    </div>
  );
}

export default Register;