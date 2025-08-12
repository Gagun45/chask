"use client";

import {
  clearTeams,
  fetchMyTeams,
} from "@/redux/features/myTeams/myTeamsSlice";
import type { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthDataLoader = () => {
  const { data, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log('clearing my teams...')
      dispatch(clearTeams());
    }
    if (status === "authenticated" && data.user?.id) {
      console.log("fetching my teams...");
      dispatch(fetchMyTeams());
    }
  }, [status, data, dispatch]);
  return null;
};
export default AuthDataLoader;
