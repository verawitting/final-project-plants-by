import { Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { UserAuthPage } from "../pages/auth/UserAuthPage";
import { NotFound } from "../pages/notFound/NotFound";
import { ProductPage } from "../pages/productPage/ProductPage";
import { PlantsPage } from "../pages/plantsPage/PlantsPage";
import { FavouritesPage } from "../pages/favouritesPage/FavouritesPage";
import { CartPage } from "../pages/cartPage/CartPage";
import { CheckOut } from "../pages/checkOut/CheckOut";
import { About } from "../pages/about/About";
import { InspoPage } from "../pages/inspoPage/InspoPage";

const routes = (
  <>
    {/* HOMEPAGE */}
    <Route path="/" element={<Home />} />

    {/* AUTH PAGES */}
    <Route path="/login" element={<Login />} />
    {/* <Route path="/register" element={<Register />} /> */}

    {/* PLANTS PAGES */}
    <Route path="/plants/:id" element={<ProductPage />} />
    <Route path="/plants/all-plants" element={<PlantsPage />} />
    <Route path="/plants/all-plants/:category" element={<PlantsPage />} />

    {/* FAVOUITES/WISHLIST PAGE */}
    <Route path="/wishlist" element={<FavouritesPage />} />

    {/* CART PAGES */}
    <Route path="/cart" element={<CartPage />} />
    <Route path="/check-out" element={<CheckOut />} />

    {/* ABOUT AND CONTACT */}
    <Route path="/about" element={<About />} />

    {/* INSPIRATION */}
    <Route path="/inspo" element={<InspoPage />} />

    {/* NOT FOUND PAGE */}
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
