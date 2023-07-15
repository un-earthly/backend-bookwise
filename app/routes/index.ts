import express, { RequestHandler } from 'express'
const router = express.Router()
import UserRoute from "../modules/user/user.route"
import BookRoute from "../modules/book/book.route"
import WishListRoute from "../modules/book/book.route"
type route = {
    path: string,
    route: RequestHandler
}

const Router: route[] = [
    {
        path: "/users",
        route: UserRoute
    },
    {
        path: "/book",
        route: BookRoute
    },
    {
        path: "/wishlist",
        route: WishListRoute
    },
]


Router.map(r => router.use(r.path, r.route))

export default router