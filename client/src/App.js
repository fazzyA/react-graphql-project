import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AddEmployee from './pages/employee/Form';
import AddTicket from 'components/Form/AddTicket';
import AddCustomer from './pages/customer/Form';
import AddClient from 'components/Form/AddClient';
import ClientList from 'components/Form/ClientList';
import AddUser from 'components/Form/AddUser';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import CustomerCalendar from 'components/CustomerCalendar';
import EmployeeCalendar from 'components/EmployeeCalendar';

const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));
const SchedularPage = React.lazy(() => import('pages/SchedularPage'));
const TicketPage = React.lazy(() => import('pages/TicketPage'));
const ReportPage = React.lazy(() => import('pages/ReportPage'));
// const EmployeePage = React.lazy(() => import('pages/EmployeePage'));
const EmployeePage = React.lazy(() => import('pages/employee/List.js'));
const CustomerPage = React.lazy(() => import('pages/customer/List.js'));
const OrderPage = React.lazy(() => import('pages/OrderPage'));
const ExpensePage = React.lazy(() => import('pages/ExpensePage'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />
                <Route exact path="/schedular" component={SchedularPage} />
                <Route exact path="/ticket" component={TicketPage} />
                <Route exact path="/report" component={ReportPage} />
                <Route exact path="/employee" component={EmployeePage} />
                <Route exact path="/customer" component={CustomerPage} />
                <Route exact path="/order" component={OrderPage} />
                <Route exact path="/expense" component={ExpensePage} />
                <Route exact path="/customer-calendar" component={CustomerCalendar} />
                <Route exact path="/employee-calendar" component={EmployeeCalendar} />
                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
                <Route exact path="/addemployee" component={AddEmployee} />
                <Route exact path="/addticket" component={AddTicket} />
                <Route exact path="/addcustomer" component={AddCustomer} />
                <Route exact path="/adduser" component={AddUser} />
                <Route exact path="/addclient" component={AddClient} />
                <Route exact path="/clientlist" component={ClientList} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
