import { UserCircle } from "lucide-react";

function ProfileHeader({user}){

return(

<div className="rounded-2xl bg-white p-8 shadow">

<div className="flex items-center gap-6">

{

user?.avatar ?

<img

src={user.avatar}

alt=""

className="h-28 w-28 rounded-full object-cover"

/>

:

<UserCircle

size={110}

className="text-slate-400"

/>

}

<div>

<h1 className="text-4xl font-bold">

{user?.fullName}

</h1>

<p className="mt-2 text-slate-500">

{user?.email}

</p>

</div>

</div>

</div>

)

}

export default ProfileHeader;