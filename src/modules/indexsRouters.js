import { globalError } from "../middleware/globalError.js"
import addressRouter from "./addresses/addressRoutes.js"
import authRouter from "./auth/authRoute.js"
import BrandRouter from "./brand/brandRoutes.js"
import cartRouter from "./cart/cartRoutes.js"
import categoryRouter from "./category/categoryRoutes.js"
import couponroute from "./coupon/coupon.routes.js"
import productRouter from "./product/productRoutes.js"
import reviewroute from "./review/reviewroutes.js"
import supcategoryRouter from "./subcategory/subCategoryRoutes.js"
import userRouter from "./user/userRouter.js"
import whishlistRouter from "./wishlist/wishlistroutes.js"

export const boostrap = (app) => {
    app.use(globalError);
    app.use('/categories', categoryRouter),
    app.use('/supcategories', supcategoryRouter),
    app.use('/Brands', BrandRouter),
    app.use('/Product', productRouter),
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/review", reviewroute);
    app.use("/api/v1/wishlist", whishlistRouter);
    app.use("/api/v1/address", addressRouter);
    app.use("/api/v1/coupon", couponroute);
    app.use("/api/v1/cart", cartRouter);
}