'use client'
import { createUesr, deleteUesr, getUserById, updateUser } from '@/server/controllers/usersController';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const HomePageComp = ({ users }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    const [edit, setEdit] = useState(false);

    const handleSave = async () => {
        try {
            if (name.length === 0 || email.length === 0) {
                throw new Error("Please fill in all the fields");
            } else {
                const saveUser = await createUesr({ name, email });
                if (saveUser.success) {
                    toast.success(saveUser.success);
                    setName("")
                    setEmail("");
                }

                if (saveUser.error) {
                    throw new Error(saveUser.error);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    const handleEditGetUesr = async (id) => {
        try {
            setEdit(true);
            const user = await getUserById(id);
            setName(user.name);
            setEmail(user.email);
            setUserId(id);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleUpdate = async () => {
        try {
            if (name.length === 0 || email.length === 0) {
                throw new Error("Please fill in all the fields");
            } else {
                const updatedUser = await updateUser(userId, { name, email });
                if (updatedUser.success) {
                    toast.success(updatedUser.success);
                    setName("")
                    setEmail("");
                    setEdit(false);
                }

                if (updatedUser.error) {
                    throw new Error(updatedUser.error);
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const delUser = await deleteUesr(id);

            if (delUser.success) {
                toast.success(delUser.success);
                setEdit(false);
                setName("")
                setEmail("");
            }

            if (delUser.error) {
                throw new Error(delUser.error);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex flex-col md:flex-row w-10/12 gap-5'>
            <div className='bg-white w-full md:w-6/12 p-5 rounded-md flex flex-col gap-4 shadow-md'>
                <div className='border-b-2'>
                    <h2 className='text-center text-xl font-semibold'>{edit ? "Update User details" : "Create an User"}</h2>
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <input type='text' name="Name" placeholder='Enter Name' className='outline-none border px-3 py-2 text-xl rounded-md w-full' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <input type='email' name="email" placeholder='Enter Email' className='outline-none border px-3 py-2 text-xl rounded-md w-full' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div>
                        <button className='w-full bg-blue-500 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-blue-700 duration-300' onClick={edit ? handleUpdate : handleSave}>{edit ? "Update" : "Save User"}</button>
                    </div>
                </div>
            </div>
            <div className='bg-white w-full md:w-6/12 p-5 rounded-md shadow-md flex flex-col gap-4'>
                <div className='border-b-2'>
                    <h2 className='text-center text-xl font-semibold'>Users</h2>
                </div>
                <div className='max-h-[250px] overflow-y-scroll'>
                    <div className="container mx-auto p-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">#</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">Name</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">Email</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length === 0 && (
                                            <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100" >
                                                <td colSpan={4} className="px-4 py-2 border-b border-gray-200 text-center font-bold">User not found</td>
                                            </tr>
                                        )
                                    }
                                    {
                                        users && users.map((user, i) => (
                                            <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100" key={i}>
                                                <td className="px-4 py-2 border-b border-gray-200">{i + 1}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{user.name}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{user.email}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 flex gap-2">
                                                    <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer" onClick={() => handleEditGetUesr(user._id)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600" onClick={() => handleDelete(user._id)}>
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageComp;

{/* <div className="container mx-auto p-4">
    <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">Email</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b border-gray-300">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-gray-200">Name Here</td>
                    <td className="px-4 py-2 border-b border-gray-200">email@test.com</td>
                    <td className="px-4 py-2 border-b border-gray-200 flex gap-3">
                        <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                        <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div> */}