import { Link } from "react-router-dom";

function CTA(){

return(

<section className="bg-gradient-to-br from-brand-600 to-indigo-700 py-24 text-center text-white relative overflow-hidden">

{/* Decorative Elements */}
<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

<div className="relative z-10 mx-auto max-w-4xl px-6">
  <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
    Ready to Start Your Journey?
  </h2>

  <p className="mt-6 text-xl text-brand-100 max-w-2xl mx-auto">
    Join thousands of top freelancers and clients building incredible projects together on SkillSphere today.
  </p>

  <Link
    to="/register"
    className="mt-10 inline-block rounded-full bg-white px-10 py-4 font-bold text-brand-700 hover:bg-slate-50 hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
  >
    Create Your Account
  </Link>
</div>

</section>

)

}

export default CTA;