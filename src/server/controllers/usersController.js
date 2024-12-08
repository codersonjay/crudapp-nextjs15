"use server";
import { revalidatePath } from "next/cache";
import { dbConn } from "../dbConn/dbConn";
import User from "../models/usersModel";

//Create User
export const createUesr = async (data) => {
  try {
    const { name, email } = data;

    if (name.length === 0 || email.length === 0) {
      return { error: "Please fill in all the fields!" };
    }

    //Database connection
    await dbConn();

    const saveUser = new User({
      name,
      email,
    });

    const user = await saveUser.save();

    revalidatePath("/");

    if (user) return { success: "User saved successfully!" };
  } catch (error) {
    return { error: "Internal Server Error!" };
  }
};

//Get Users

export const getUsers = async () => {
  try {
    //Database connection
    await dbConn();

    const getUsers = await User.find();
    const users = JSON.parse(JSON.stringify(getUsers));
    if (users) return users;
  } catch (error) {
    return { error: "Internal Server Error!" };
  }
};

// get single user
export const getUserById = async (id) => {
  try {
    //Database connection
    await dbConn();

    const getUser = await User.findById(id);
    const user = JSON.parse(JSON.stringify(getUser));
    if (user) return user;
  } catch (error) {
    return { error: "Internal Server Error!" };
  }
};

// update user
export const updateUser = async (id, data) => {
  try {
    const { name, email } = data;
    if (name.length === 0 || email.length === 0) {
      return { error: "Please fill in all the fields!" };
    }

    //Database connection
    await dbConn();

    const updateUser = await User.findByIdAndUpdate(id, { name, email });

    revalidatePath("/");
    if (updateUser) return { success: "User Updated Sucessfully!" };
  } catch (error) {
    return { error: "Internal Server Error!" };
  }
};

// Delete user
export const deleteUesr = async (id) => {
  try {
    //Database connection
    await dbConn();

    const delUser = await User.findByIdAndDelete(id);
    revalidatePath("/");
    if (delUser) return { success: "User deleted successfully!" };
  } catch (error) {
    return { error: "Internal Server Error!" };
  }
};
