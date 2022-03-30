import './App.css';
import { createBrowserHistory } from 'history'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import { Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './templates/CheckOutTemplate/CheckoutTemplate';
import { CheckOutCom } from './pages/Checkout/Checkout';
import { Suspense, lazy } from 'react'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './component/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import DashBoard from './pages/Dashboard/DashBoard';
import Films from './pages/Films/Films';
import ShowTime from './pages/ShowTime/ShowTime';
import AddNew from './pages/Films/AddNew/AddNew';
import Edit from './pages/Films/Edit/Edit';
import AddNewUser from './pages/Dashboard/AddNewUser';
import EditUser from './pages/Dashboard/EditUser';

const CheckOutTemplateLazy = lazy(() => import('./templates/CheckOutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path='/profile' exact Component={Profile} />
        <CheckoutTemplate path="/checkout/:id/:idphim" exact Component={CheckOutCom} />
        {/* <Suspense fallback={<h1>Loading...</h1>}>
          <CheckOutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />
        <AdminTemplate path='/admin/films' exact Component={Films}  />
        <AdminTemplate path='/admin/films/addnew' exact Component={AddNew}  />
        <AdminTemplate path='/admin/films/edit/:id' exact Component={Edit}  />
        <AdminTemplate path='/admin/films/showtimes/:id/:tenphim' exact Component={ShowTime}  />
        <AdminTemplate path='/admin/users' exact Component={DashBoard}  />
        <AdminTemplate path='/admin/users/addnewuser' exact Component={AddNewUser}  />
        <AdminTemplate path='/admin/users/edituser/:taikhoan' exact Component={EditUser}  />
        {/* <AdminTemplate path='/admin/showtimes' exact Component={ShowTime}  /> */}
       </Switch>
    </Router>
  );
}

export default App;
