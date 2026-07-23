function Stats() {

const stats=[

["15K+","Freelancers"],

["7K+","Clients"],

["50K+","Projects"],

["99%","Success"]

];

return(

<section className="bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 py-24 text-white relative overflow-hidden">

<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

<div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4 px-6 relative z-10">

{

stats.map((item,index)=>(

<div key={index} className="text-center group">

<h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 group-hover:to-brand-400 transition-colors duration-300">

{item[0]}

</h2>

<p className="mt-4 text-lg font-medium text-brand-200 tracking-wide uppercase">

{item[1]}

</p>

</div>

))

}

</div>

</section>

)

}

export default Stats;