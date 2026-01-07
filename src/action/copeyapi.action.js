"use server";

import ConnectDB from "@/lib/config/db";
import usermodel from "@/lib/models/usermodel";
import apimodel from "@/lib/models/apimodel";
import { getServerSession } from "next-auth";

export async function getEndpint(apiId) {
  const session = await getServerSession();

  if (!session) {
    return { error: "Login Required" };
  }

  try {
    await ConnectDB();

    const User = await usermodel.findOne({
      email: session.user.email,
    });

    // daily reset logic

    const today = new Date();
    const lastReset = new Date(User.apiCopeyLimit.lastResetData);

    console.log(today.toDateString(), lastReset.toDateString());

    if (today.toDateString() !== lastReset.toDateString()) {
      User.apiCopeyLimit.copeidToday = 0;
      User.apiCopeyLimit.lastResetData = today;
    }

    if (
      User.subscriptionPlan === "free" &&
      User.apiCopeyLimit.copeidToday >= User.apiCopeyLimit.daily
    ) {
      return { error: "Daily limit reached" };
    }

    const api = await apimodel.findById(apiId);

    User.apiCopeyLimit.copeidToday += 1;
    await User.save();

    return {
      endpoint: api.apiEndpint,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}
