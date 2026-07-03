function Stats() {

const stats=[

["15K+","Freelancers"],

["7K+","Clients"],

["50K+","Projects"],

["99%","Success"]

];

return(

<section className="bg-slate-900 py-20 text-white">

<div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">

{

stats.map((item,index)=>(

<div key={index} className="text-center">

<h2 className="text-5xl font-bold">

{item[0]}

</h2>

<p className="mt-3">

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