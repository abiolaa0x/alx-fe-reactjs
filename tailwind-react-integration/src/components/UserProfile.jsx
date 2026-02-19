function UserProfile () {
  return (
    <div className="user-profile bg-gray-300 max-w-sm mx-auto my-20 p-8 rounded-lg shadow-lg">
      <img src="https://via.placeholder.com/150" alt="User" className="rounded-full mx-auto w-36 h-36 " />
      <h1  className="text-xl text-blue-800 my-4">John Doe</h1>
      <p className="text-gray-600 text-base">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
};

export default UserProfile;
