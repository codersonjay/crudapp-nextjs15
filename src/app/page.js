import HomePageComp from "@/components/HomePageComp";
import { getUsers } from "@/server/controllers/usersController";

const HomePage = async () => {
  const users = await getUsers();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <HomePageComp users={users} />
    </div>
  );
};

export default HomePage;
