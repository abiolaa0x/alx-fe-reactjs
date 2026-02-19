function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 max-w-xs md:max-w-sm mx-auto my-20 sm:p-4 md:p-8 rounded-lg shadow-lg hover:shadow-xl">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full mx-auto sm:w-24 sm:h-24 md:w-36 md:h-36 hover:scale-110 transition-transform duration-300 ease-in-out"
      />

      <h1 className="text-blue-800 hover:text-blue-500 my-4 sm:text-lg md:text-xl">
        John Doe
      </h1>

      <p className="text-gray-600 sm:text-sm md:text-base">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
