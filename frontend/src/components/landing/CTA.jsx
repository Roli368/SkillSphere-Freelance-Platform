import { Link } from "react-router-dom";

function CTA(){

return(

<section className="bg-blue-600 py-24 text-center text-white">

<h2 className="text-5xl font-bold">

Ready to Start?

</h2>

<p className="mt-6 text-xl">

Join thousands of freelancers today.

</p>

<Link

to="/register"

className="mt-10 inline-block rounded-xl bg-white px-8 py-4 font-bold text-blue-700"

>

Create Account

</Link>

</section>

)

}

export default CTA;