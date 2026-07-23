import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../services/userApi";
import { loginSuccess } from "../redux/slices/authSlice";

function useProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await getProfile();

        dispatch(
          loginSuccess({
            accessToken: localStorage.getItem("token"),
            user: data.data,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem("token")) {
      fetchProfile();
    }
  }, [dispatch]);
}

export default useProfile;