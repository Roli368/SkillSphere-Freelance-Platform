function ProfileInfo({user}){

return(

<div className="rounded-2xl bg-white p-8 shadow">

<h2 className="mb-6 text-2xl font-bold">

Profile Information

</h2>

<div className="space-y-5">

<div>

<b>Full Name</b>

<p>{user?.fullName}</p>

</div>

<div>

<b>Email</b>

<p>{user?.email}</p>

</div>

<div>

<b>Role</b>

<p>{user?.role}</p>

</div>

<div>

<b>Verified</b>

<p>

{

user?.isVerified

?

"Yes"

:

"No"

}

</p>

</div>

</div>

</div>

)

}

export default ProfileInfo;