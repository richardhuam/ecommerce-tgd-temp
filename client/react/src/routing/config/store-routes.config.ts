import LoginPage from '@/pages/login/login.page';
import SignUpPage from '@/pages/signup/signup.page';
import UnauthorizedPage from '@/pages/unauthorized/unauthorized.page';
import ErrorPage from '@/pages/error/error.page';
import NotFoundPage from '@/pages/404/not-found.page';
import HomePage from '@/pages/home/home.page';
import StoreLayout from '@/features/layouts/store-layout/store-layout';
import { STORE_ROUTES } from '@/config/routes.config';
import AuthLayout from '@/features/layouts/auth-layout/auth-layout';
import ReviewsPage from '@/pages/reviews/reviews.page';
import AboutPage from '@/pages/about/about.page';
import ContactPage from '@/pages/contact/contact.page';
import ProductDetailsPage from '@/pages/products/product-details.page';
import { IStoreRoute } from '../interfaces/store-routes.interface';

export const STORE_ROUTES_CONFIG: IStoreRoute[] = [
  {
    path: STORE_ROUTES.HOME,
    component: HomePage,
    layout: StoreLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.ABOUT,
    component: AboutPage,
    layout: StoreLayout,
    subs: [],
  },
  {
    path: `${STORE_ROUTES.PRODUCTS}/:productSkuWithSlug`,
    component: ProductDetailsPage,
    layout: StoreLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.CONTACT,
    component: ContactPage,
    layout: StoreLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.REVIEWS,
    component: ReviewsPage,
    layout: StoreLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.LOGIN,
    component: LoginPage,
    layout: AuthLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.SIGN_UP,
    component: SignUpPage,
    layout: AuthLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.UNAUTHORIZED,
    component: UnauthorizedPage,
    layout: AuthLayout,
    subs: [],
  },
  {
    path: STORE_ROUTES.NOT_FOUND,
    component: NotFoundPage,
    layout: null,
    subs: [],
  },
  {
    path: STORE_ROUTES.ERROR,
    component: ErrorPage,
    layout: null,
    subs: [],
  },
];
