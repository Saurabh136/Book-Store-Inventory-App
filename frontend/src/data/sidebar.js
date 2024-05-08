import { FaTh, FaRegChartBar} from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import SellForm from "../components/sell/SellForm"; // Import the SellForm component

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Add Sell", // Add Sell option to the sidebar
    icon: <FcSalesPerformance />,
    path: "/add-sell",
    component: SellForm, // Use SellForm as the component for this route
  },
 
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  // {
  //   title: "Report Bug",
  //   icon: <FaCommentAlt />,
  //   path: "/contact-us",
  // },
];

export default menu;
