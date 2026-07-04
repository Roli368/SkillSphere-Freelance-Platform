import { useSelector } from "react-redux";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfo from "../../components/profile/ProfileInfo";

function Profile() {

const { user } = useSelector(state=>state.auth);

return(

<div className="space-y-8">

<ProfileHeader user={user}/>

<ProfileInfo user={user}/>

</div>

);

}

export default Profile;