// components/ProfilePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { User, ShoppingBag, Home, List, LogOut, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import useUpdateAvatar from "../hooks/useUpdateAvatar";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";
import { useAddAddress } from "../hooks/useAddress";

const Profile = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [latestAddress, setLatestAddress] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser, // change the types of current user add a type alias or the interface for currentUser
  });
  const currentUser = data;
  const {
    mutate: uploadAvatar,
    isPending,
    data: profileImage,
  } = useUpdateAvatar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: loggingOut } = useLogout();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();
  const { mutate: addAddress, isPending: addingAddress } = useAddAddress();

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file);
  };
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["currentUser"], null);
        navigate("/login");
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className=" min-h-screen bg-white text-black p-4">
      <div className="flex flex-col lg:flex-row mx-auto justify-center">
        {/* Sidebar */}
        <aside className="w-full lg:w-[296px] lg:p-6 ">
          {/* Profile Photo */}
          <div className="flex flex-col mb-8">
            <div className="relative w-[230px] h-[230px] rounded-full overflow-hidden border border-gray-300">
              <img
                src={profileImage || "/logo/defaultprofileimage.jpg"}
                alt="Profile image"
                className="object-cover w-full h-full"
              />
              <label
                onClick={handleUploadImage}
                className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm py-1 text-center cursor-pointer"
              >
                <Upload size={16} className="inline mr-1" /> Upload
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
              <LogOut size={18} /> Logout
            </button>
            <p className="text-lg text-red-500 text-center w-full">
              {loggingOut ? "Logging out" : ""}
            </p>
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
                  {currentUser?.fullname || "Guest User"}
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
                  {currentUser?.email || "aura@gmail.com"}
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
                <p className="font-medium">Password: ••••••••</p>
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
              <div className="border border-gray-300 p-4 rounded flex justify-between items-start">
                {latestAddress ? (
                  <div>
                    <p className="font-medium">
                      {latestAddress.fullname || "Unknown Name"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {latestAddress.phone || "No phone provided"}
                    </p>
                    <p className="text-sm">
                      {latestAddress.street || "No street info"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {latestAddress.country || "No country info"}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No address added yet.</p>
                )}
                {latestAddress && (
                  <div className="space-x-2">
                    <button className="text-sm text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Add New Address Form */}
              <form
                className="space-y-2 border p-4 rounded"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newAddress = {
                    fullname: formData.get("fullname") as string,
                    phone: formData.get("phone") as string,
                    street: formData.get("street") as string,
                    landmark: formData.get("landmark") as string,
                    city: formData.get("city") as string,
                    state: formData.get("state") as string,
                    zip: formData.get("zip") as string,
                    country: formData.get("country") as string,
                  };
                  addAddress(newAddress, {
                    onSuccess: (data) => {
                      setLatestAddress(data);
                      e.currentTarget.reset();
                    },
                  });
                }}
              >
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  name="street"
                  type="text"
                  placeholder="Street / House No."
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  name="landmark"
                  type="text"
                  placeholder="Landmark (Optional)"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="zip"
                    type="text"
                    placeholder="Zip Code"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <button className="px-4 py-1 bg-black text-white rounded">
                  {addingAddress ? "saving" : "Add Address"}
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
