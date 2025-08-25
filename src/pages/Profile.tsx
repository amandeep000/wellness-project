// components/ProfilePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { User, ShoppingBag, Home, List, LogOut, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { useUpdateProfile, useUpdateAvatar } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddAddress,
  useGetAddresses,
  useUpdateAddress,
  useDeleteAddress,
} from "../hooks/useAddress";

import { useAuth } from "../hooks/useAuth";

interface Address {
  _id: string;
  type: string;
  fullname: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar, isPending: avatarLoading } = useUpdateAvatar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: loggingOut } = useLogout();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();
  const { mutate: addAddress, isPending: addingAddress } = useAddAddress();
  const { mutate: updateAddress, isPending: updatingAddress } =
    useUpdateAddress();
  const { mutate: deleteAddress, isPending: deletingAddress } =
    useDeleteAddress();
  const { data: addresses = [], isLoading: addressesLoading } =
    useGetAddresses();
  const { data: currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, isLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file);
  };

  // logout
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["currentUser"], null);
        navigate("/");
      },
    });
  };

  // Update Name
  const handleUpdateName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullname = formData.get("fullname") as string;
    if (!fullname) return;

    updateProfile({ fullname }, { onSuccess: () => setIsEditing(null) });
  };

  // Update Email
  const handleUpdateEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    if (!email) return;

    updateProfile({ email }, { onSuccess: () => setIsEditing(null) });
  };

  // Update Password
  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    if (!oldPassword || !newPassword) return;

    updateProfile(
      { oldPassword, newPassword },
      { onSuccess: () => setIsEditing(null) }
    );
  };

  // Add Address
  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress = {
      type: formData.get("type") as string,
      fullname: formData.get("fullname") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      isDefault: formData.get("isDefault") === "on",
    };
    console.log("Sending address data:", newAddress);
    addAddress(newAddress, {
      onSuccess: () => {
        e.currentTarget.reset();
      },
    });
  };

  // Update Address
  const handleUpdateAddress = (
    e: React.FormEvent<HTMLFormElement>,
    addressId: string
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedAddress = {
      type: formData.get("type") as string,
      fullname: formData.get("fullname") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      isDefault: formData.get("isDefault") === "on",
    };

    updateAddress(
      { addressId, addressData: updatedAddress },
      {
        onSuccess: () => {
          setEditingAddress(null);
        },
      }
    );
  };

  // Delete Address
  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(addressId);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className=" min-h-screen bg-white text-black p-4">
      <div className="flex flex-col lg:flex-row mx-auto justify-center">
        {/* Sidebar */}
        <aside className="w-full lg:w-[296px] lg:p-6 ">
          {/* Profile Photo */}
          <div className="flex flex-col mb-8">
            <div className="relative w-[230px] h-[230px] rounded-full overflow-hidden border border-gray-300">
              <img
                src={currentUser?.avatar || "/logo/defaultprofileimage.jpg"}
                alt="Profile image"
                className="object-cover w-full h-full"
              />
              <label className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm py-1 text-center cursor-pointer">
                <Upload size={16} className="inline mr-1" />{" "}
                {avatarLoading ? "Uploading..." : "upload"}
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col justify-center items-start text-lg pl-4 space-y-5">
            <Link
              to={"#"}
              className="flex items-center gap-4 hover:text-gray-600 w-full"
            >
              <User size={20} /> <span>Admin</span>
            </Link>
            <Link
              to={"/shop"}
              className="flex justify-evenly items-center gap-4 hover:text-gray-600"
            >
              <ShoppingBag size={20} /> Shop
            </Link>
            <Link
              to={"/"}
              className="flex items-center gap-4 hover:text-gray-600"
            >
              <Home size={20} /> Home
            </Link>
            <Link
              to={"#"}
              className="flex items-center gap-4 hover:text-gray-600"
            >
              <List size={20} /> Orders
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-800"
            >
              <LogOut size={18} /> {loggingOut ? "Logging You Out" : "Logout"}
            </button>
          </nav>
        </aside>

        <main className="w-full max-w-[896px] p-6 border border-gray-600 rounded-md">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <hr className="my-4 border-gray-300" />

          {/* User Info */}
          <section className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  NAME:{" "}
                  <span className="uppercase">
                    {currentUser?.fullname || "Guest User"}
                  </span>
                </p>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    setIsEditing(isEditing === "name" ? null : "name")
                  }
                >
                  {isEditing === "name" ? "Close" : "Edit"}
                </button>
              </div>
              {isEditing === "name" && (
                <form onSubmit={handleUpdateName} className="mt-2 space-y-2">
                  <input
                    name="fullname"
                    type="text"
                    placeholder="Enter new name"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1 bg-black text-white rounded"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save"}
                  </button>
                </form>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  EMAIL: <span>{currentUser?.email || "aura@gmail.com"}</span>
                </p>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    setIsEditing(isEditing === "email" ? null : "email")
                  }
                >
                  {isEditing === "email" ? "Close" : "Edit"}
                </button>
              </div>
              {isEditing === "email" && (
                <form onSubmit={handleUpdateEmail} className="mt-2 space-y-2">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter new email"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1 bg-black text-white rounded"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save"}
                  </button>
                </form>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p className="font-medium">PASSWORD: ••••••••</p>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() =>
                    setIsEditing(isEditing === "password" ? null : "password")
                  }
                >
                  {isEditing === "password" ? "Close" : "Change"}
                </button>
              </div>
              {isEditing === "password" && (
                <form
                  onSubmit={handleUpdatePassword}
                  className="mt-2 space-y-2"
                >
                  <input
                    name="oldPassword"
                    type="password"
                    placeholder="Current password"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <input
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1 bg-black text-white rounded"
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </form>
              )}
            </div>
          </section>

          <hr className="my-6 border-gray-300" />

          {/* Address Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>
            <div className="space-y-4">
              {addressesLoading ? (
                <p className="text-center">Loading addresses...</p>
              ) : addresses.length > 0 ? (
                addresses.map((address: Address) => (
                  <div
                    key={address._id}
                    className="border border-gray-300 p-4 rounded"
                  >
                    {editingAddress === address._id ? (
                      // Edit Form
                      <form
                        onSubmit={(e) => handleUpdateAddress(e, address._id)}
                        className="space-y-2"
                      >
                        <select
                          name="type"
                          defaultValue={address.type}
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="billing">Billing</option>
                          <option value="shipping">Shipping</option>
                          <option value="both">Both</option>
                        </select>
                        <input
                          name="fullname"
                          type="text"
                          defaultValue={address.fullname}
                          placeholder="Full Name"
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                        <input
                          name="phoneNumber"
                          type="text"
                          defaultValue={address.phoneNumber}
                          placeholder="Phone Number"
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                        <input
                          name="street"
                          type="text"
                          defaultValue={address.street}
                          placeholder="Street / House No."
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            name="city"
                            type="text"
                            defaultValue={address.city}
                            placeholder="City"
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                          />
                          <input
                            name="state"
                            type="text"
                            defaultValue={address.state}
                            placeholder="State"
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            name="postalCode"
                            type="text"
                            defaultValue={address.postalCode}
                            placeholder="Zip Code"
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                          />
                          <input
                            name="country"
                            type="text"
                            defaultValue={address.country}
                            placeholder="Country"
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            name="isDefault"
                            type="checkbox"
                            defaultChecked={address.isDefault}
                            className="w-4 h-4"
                          />
                          <label className="text-sm text-gray-600">
                            Set as default address
                          </label>
                        </div>
                        <div className="space-x-2">
                          <button
                            type="submit"
                            className="px-4 py-1 bg-black text-white rounded"
                            disabled={updatingAddress}
                          >
                            {updatingAddress ? "Updating..." : "Update"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingAddress(null)}
                            className="px-4 py-1 bg-gray-300 text-black rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Display Address
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{address.fullname}</p>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 capitalize">
                            {address.type} • {address.phoneNumber}
                          </p>
                          <p className="text-sm">{address.street}</p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.country}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingAddress(address._id)}
                            className="text-sm text-blue-600 hover:underline"
                            disabled={updatingAddress}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address._id)}
                            className={`text-sm hover:underline ${
                              addresses.length === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600"
                            }`}
                            disabled={deletingAddress || addresses.length === 1}
                            title={
                              addresses.length === 1
                                ? "Cannot delete the only address"
                                : ""
                            }
                          >
                            {deletingAddress ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="border border-gray-300 p-4 rounded">
                  <p className="text-gray-500 italic">
                    No addresses added yet.
                  </p>
                </div>
              )}

              {/* Add New Address Form */}
              <form
                className="space-y-2 border p-4 rounded"
                onSubmit={handleAddAddress}
              >
                <h3 className="font-medium mb-2">Add New Address</h3>
                <select
                  name="type"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="billing">Billing</option>
                  <option value="shipping">shipping</option>
                  <option value="both">Both</option>
                </select>
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  name="street"
                  type="text"
                  placeholder="Street / House No."
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="Zip Code"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input name="isDefault" type="checkbox" className="w-4 h-4" />
                  <label className="text-sm text-gray-600">
                    Set as default address
                  </label>
                </div>
                <button
                  type="submit"
                  className="px-4 py-1 bg-black text-white rounded"
                  disabled={addingAddress}
                >
                  {addingAddress ? "Adding..." : "Add Address"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
