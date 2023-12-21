"use server";

import Question from "@/database/question.model";
import User from "@/database/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/lib/actions/shared.types";
import { connectToDatebase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export async function getUserById(params: any) {
  try {
    connectToDatebase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatebase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatebase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatebase();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });
    if (!user) throw new Error("User not found");

    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
