import DashboardFilter from "../components/dashboard/DashboardFilter";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Heading from "../components/Heading";
const Home = () => {
  return (
    <div className="p-10 ">
      <div className="flex justify-between items-center">
        <Heading as="h2">Dashboard</Heading>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
};

export default Home;
