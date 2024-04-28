import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/otherComponents/Routes/PrivateRoute";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Admin from "./components/navigation/Admin";
import Dashboard from "./components/screens/Dashboard";
import GentsOrders from "./components/screens/Gents/GentsOrders";
import GentsOrderInfo from "./components/screens/Gents/GentsOrderInfo";
import LadiesOrders from "./components/screens/Ladies/LadiesOrders";
import LadiesOrderInfo from "./components/screens/Ladies/LadiesOrderInfo";
import AddProducts from "./components/screens/Products/AddProducts";
import ProductsList from "./components/screens/Products/ProductsList";
import Feedback from "./components/screens/FeedBack/Feedback";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gents-orders" element={<GentsOrders />} />
          <Route path="gents-order-info/:id" element={<GentsOrderInfo />} />
          <Route path="ladies-orders" element={<LadiesOrders />} />
          <Route path="ladies-order-info/:id" element={<LadiesOrderInfo />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="products-list" element={<ProductsList />} />
          <Route path="feedbacks" element={<Feedback />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
