const graphql = require('graphql');
const User = require('./db/user.js');
const Employee = require('./db/employee.js');
const Payroll = require('./db/payroll.js');
const Customer = require('./db/customer.js');
const Ticket = require('./db/ticket.js');
const Route = require('./db/route.js');
const Washorder = require('./db/washorder.js');
const Washlog = require('./db/washlog.js');
const Report = require('./db/report.js');
const Companytruck = require('./db/companytruck.js');
const Employeeschedule = require('./db/employeeschedule.js');
const Tickethistory = require('./db/tickethistory.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { email, id, role, status } = user;
  // console.log(user)
  return jwt.sign({ email, id, role, status }, secret, { expiresIn });
};

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;
  
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    relatedEmployee: {
      type: EmployeeType,
      resolve(parent, args) {
        return Employee.findById(parent.id);
      }
    },
    relatedReport: {
      type: ReportType,
      resolve(parent, args) {
        return Report.findById(parent.id);
      }
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    role: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLString },
    relatedPayroll: {
      type: PayrollType,
      resolve(parent, args) {
        return Payroll.findById(parent.id);
      }
    },
    relatedEmployeeschedule: {
      type: EmployeescheduleType,
      resolve(parent, args) {
        return Employeeschedule.findOne({ employeeId: parent.id });
      }
    },
    relatedTickethistory: {
      type: TickethistoryType,
      resolve(parent, args) {
        return Tickethistory.findById(parent.id);
      }
    },
    relatedRoute: {
      type: RouteType,
      resolve(parent, args) {
        return Route.findById(parent.id);
      }
    },
    name: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    relatedUser: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    gender: { type: GraphQLString },
    ratePerHour: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    hoursPerWeek: { type: GraphQLString },
    joinDate: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    payrollid: { type: GraphQLString },
    badge: { type: GraphQLString },
    pin: { type: GraphQLString },
    picture: { type: GraphQLString },
    department: { type: GraphQLString }
  })
});


const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString },
  })
});

const PayrollType = new GraphQLObjectType({
  name: 'Payroll',
  fields: () => ({
    id: { type: GraphQLString },
    employeeId: { type: new GraphQLNonNull(GraphQLID) },
    relatedEmployee: {
      type: EmployeeType,
      resolve(parent, args) {
        return Employee.findById(parent.employeeId);
      }
    },
    date: { type: GraphQLString },
    salary: { type: GraphQLString },
    ratePerHour: { type: GraphQLString },
    ratePerDay: { type: GraphQLString },
    totalWorkedHours: { type: GraphQLString }
  })
});

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    relatedWashorder: {
      type: WashorderType,
      resolve(parent, args) {
        return Washorder.findById(parent.id);
      }
    },
    everyRelatedTicket: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Ticket.findById(parent.id);
      }
    },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    fax: { type: GraphQLString }
  })
});

const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: { type: GraphQLString },
    relatedTickethistory: {
      type: TickethistoryType,
      resolve(parent, args) {
        return Tickethistory.findById(parent.id);
      }
    },
    customerId: { type: new GraphQLNonNull(GraphQLID) },
    relatedCustomer: {
      type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      }
    }
  })
});

const RouteType = new GraphQLObjectType({
  name: 'Route',
  fields: () => ({
    id: { type: GraphQLString },
    relatedWashlog: {
      type: WashlogType,
      resolve(parent, args) {
        return Washlog.findById(parent.id);
      }
    },
    relatedReport: {
      type: ReportType,
      resolve(parent, args) {
        return Report.findById(parent.id);
      }
    },
    date: { type: new GraphQLNonNull(GraphQLString) },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    techId: { type: GraphQLID },
    everyRelatedEmployee: {
      type: new GraphQLList(EmployeeType),
      resolve(parent, args) {
        return Employee.findById(parent.techId);
      }
    },
    companyTruckId: { type: GraphQLID },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    status: { type: GraphQLString },
    gasExpense: { type: GraphQLString },
    chemicalExpense: { type: GraphQLString },
    profit: { type: GraphQLString },
    loss: { type: GraphQLString },
    totalSales: { type: GraphQLString },
    totalHrs: { type: GraphQLString }
  })
});

const WashorderType = new GraphQLObjectType({
  name: 'Washorder',
  fields: () => ({
    id: { type: GraphQLString },
    relatedWashlog: {
      type: WashlogType,
      resolve(parent, args) {
        return Washlog.findById(parent.id);
      }
    },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    customerId: { type: new GraphQLNonNull(GraphQLID) },
    everyRelatedCustomer: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      }
    },
    location: { type: GraphQLString },
    payment: { type: GraphQLString },
    customerVerification: { type: GraphQLString },
    region: { type: GraphQLString },
    comments: { type: GraphQLString }
  })
});

const WashlogType = new GraphQLObjectType({
  name: 'Washlog',
  fields: () => ({
    id: { type: GraphQLString },
    routeId: { type: new GraphQLNonNull(GraphQLID) },
    relatedRoute: {
      type: RouteType,
      resolve(parent, args) {
        return Route.findById(parent.routeId);
      }
    },
    washOrderId: { type: GraphQLID },
    relatedWashorder: {
      type: WashorderType,
      resolve(parent, args) {
        return Washorder.findById(parent.washOrderId);
      }
    },
    stopNumber: { type: GraphQLString },
    reachAt: { type: GraphQLString },
    departAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    status: { type: GraphQLString },
    companyJobSIte: { type: GraphQLString },
    specialInstruction: { type: GraphQLString },
    vehicleType: { type: GraphQLString },
    listpieces: { type: new GraphQLList(GraphQLString) },
    estimateTime: { type: GraphQLString },
    hoursWorked: { type: GraphQLString }
  })
});

const ReportType = new GraphQLObjectType({
  name: 'Report',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    routeId: { type: GraphQLID },
    relatedRoute: {
      type: RouteType,
      resolve(parent, args) {
        return Route.findById(parent.routeId);
      }
    },
    userId: { type: GraphQLID },
    everyRelatedUser: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    createdBy: { type: GraphQLString }
  })
});

const CompanytruckType = new GraphQLObjectType({
  name: 'Companytruck',
  fields: () => ({
    id: { type: GraphQLString },
    number: { type: GraphQLString },
    plate: { type: GraphQLString },
    modal: { type: GraphQLString },
    milesPerHr: { type: GraphQLString },
    license: { type: GraphQLString },
    avgFM: { type: GraphQLString }
  })
});

const EmployeescheduleType = new GraphQLObjectType({
  name: 'Employeeschedule',
  fields: () => ({
    id: { type: GraphQLString },
    employeeId: { type: new GraphQLNonNull(GraphQLString) },
    relatedEmployee: {
      type: EmployeeType,
      resolve(parent, args) {
        return Employee.findById(parent.employeeId);
      }
    },
    dayOfWeek: { type: GraphQLString },
    joinTime: { type: GraphQLString },
    off: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    perDayPaid: { type: GraphQLString }
  })
});

const TickethistoryType = new GraphQLObjectType({
  name: 'Tickethistory',
  fields: () => ({
    id: { type: GraphQLString },
    assignedTo: { type: GraphQLID },
    everyRelatedEmployee: {
      type: new GraphQLList(EmployeeType),
      resolve(parent, args) {
        return Employee.findById(parent.assignedTo);
      }
    },
    ticketId: { type: new GraphQLNonNull(GraphQLID) },
    relatedTicket: {
      type: TicketType,
      resolve(parent, args) {
        return Ticket.findById(parent.ticketId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    everyUser: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    currentUser: {
      type: UserType,
      // args: { id: { type: GraphQLString}},
      resolve(parent, args, req) {
        console.log(req.currentUser)
        if (!req.currentUser) {
          return null;
        }
        return User.findById(req.currentUser.id);
      }
    },

    everyEmployee: {
      type: new GraphQLList(EmployeeType),
      resolve() {
        return Employee.find({});
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Employee.findById(args.id);
      }
    },
    everyPayroll: {
      type: new GraphQLList(PayrollType),
      resolve() {
        return Payroll.find({});
      }
    },
    payroll: {
      type: PayrollType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Payroll.findById(args.id);
      }
    },
    everyCustomer: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return Customer.find({});
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Customer.findById(args.id);
      }
    },
    everyTicket: {
      type: new GraphQLList(TicketType),
      resolve() {
        return Ticket.find({});
      }
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Ticket.findById(args.id);
      }
    },
    everyRoute: {
      type: new GraphQLList(RouteType),
      resolve() {
        return Route.find({});
      }
    },
    route: {
      type: RouteType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Route.findById(args.id);
      }
    },
    everyWashorder: {
      type: new GraphQLList(WashorderType),
      resolve() {
        return Washorder.find({});
      }
    },
    washorder: {
      type: WashorderType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Washorder.findById(args.id);
      }
    },
    everyWashlog: {
      type: new GraphQLList(WashlogType),
      resolve() {
        return Washlog.find({});
      }
    },
    washlog: {
      type: WashlogType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Washlog.findById(args.id);
      }
    },
    everyReport: {
      type: new GraphQLList(ReportType),
      resolve() {
        return Report.find({});
      }
    },
    report: {
      type: ReportType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Report.findById(args.id);
      }
    },
    everyCompanytruck: {
      type: new GraphQLList(CompanytruckType),
      resolve() {
        return Companytruck.find({});
      }
    },
    companytruck: {
      type: CompanytruckType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Companytruck.findById(args.id);
      }
    },
    everyEmployeeschedule: {
      type: new GraphQLList(EmployeescheduleType),
      resolve() {
        return Employeeschedule.find({});
      }
    },
    employeeschedule: {
      type: EmployeescheduleType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Employeeschedule.findById(args.id);
      }
    },
    everyTickethistory: {
      type: new GraphQLList(TickethistoryType),
      resolve() {
        return Tickethistory.find({});
      }
    },
    tickethistory: {
      type: TickethistoryType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Tickethistory.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
        role: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
      },
      resolve(parent, args) {
        const user = new User(args);
        return user.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
        role: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, args);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      }
    },
    signIn: {
      type: TokenType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },

      },
      resolve: async function (parent, args) {
        const user = await User.findOne({ "email": args.email });
        // console.log(user)
        if (!user) {
          throw new Error("User not found");
        }
        //console.log(user.password)
        const isValidPassword = await bcrypt.compare(args.password, user.password);
        if (!isValidPassword) {
          throw new Error("Ongeldig wachtwoord");
        }
        return { token: createToken(user, "process.env.SECRET", "8hr") };
      }

      // resolve(parent, args) {
      //   return Users.findOne("email", args.email);
      // }
    },
    addEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        gender: { type: GraphQLString },
        ratePerHour: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        hoursPerWeek: { type: GraphQLString },
        joinDate: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        payrollid: { type: GraphQLString },
        badge: { type: GraphQLString },
        pin: { type: GraphQLString },
        picture: { type: GraphQLString },
        department: { type: GraphQLString }
      },
      resolve(parent, args) {
        const employee = new Employee(args);
        return employee.save();
      }
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        gender: { type: GraphQLString },
        ratePerHour: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        hoursPerWeek: { type: GraphQLString },
        joinDate: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        payrollid: { type: GraphQLString },
        badge: { type: GraphQLString },
        pin: { type: GraphQLString },
        picture: { type: GraphQLString },
        department: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, args);
      }
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Employee.findByIdAndRemove(args.id);
      }
    },
    addPayroll: {
      type: PayrollType,
      args: {
        id: { type: GraphQLString },
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: GraphQLString },
        salary: { type: GraphQLString },
        ratePerHour: { type: GraphQLString },
        ratePerDay: { type: GraphQLString },
        totalWorkedHours: { type: GraphQLString }
      },
      resolve(parent, args) {
        const payroll = new Payroll(args);
        return payroll.save();
      }
    },
    updatePayroll: {
      type: PayrollType,
      args: {
        id: { type: GraphQLString },
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: GraphQLString },
        salary: { type: GraphQLString },
        ratePerHour: { type: GraphQLString },
        ratePerDay: { type: GraphQLString },
        totalWorkedHours: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Payroll.findByIdAndUpdate(args.id, args);
      }
    },
    deletePayroll: {
      type: PayrollType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Payroll.findByIdAndRemove(args.id);
      }
    },
    addCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        fax: { type: GraphQLString }
      },
      resolve(parent, args) {
        const customer = new Customer(args);
        return customer.save();
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        fax: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Customer.findByIdAndUpdate(args.id, args);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Customer.findByIdAndRemove(args.id);
      }
    },
    addTicket: {
      type: TicketType,
      args: {
        id: { type: GraphQLString },
        customerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const ticket = new Ticket(args);
        return ticket.save();
      }
    },
    updateTicket: {
      type: TicketType,
      args: {
        id: { type: GraphQLString },
        customerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(args.id, args);
      }
    },
    deleteTicket: {
      type: TicketType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Ticket.findByIdAndRemove(args.id);
      }
    },
    addRoute: {
      type: RouteType,
      args: {
        id: { type: GraphQLString },
        date: { type: new GraphQLNonNull(GraphQLString) },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        techId: { type: GraphQLID },
        companyTruckId: { type: GraphQLID },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        status: { type: GraphQLString },
        gasExpense: { type: GraphQLString },
        chemicalExpense: { type: GraphQLString },
        profit: { type: GraphQLString },
        loss: { type: GraphQLString },
        totalSales: { type: GraphQLString },
        totalHrs: { type: GraphQLString }
      },
      resolve(parent, args) {
        const route = new Route(args);
        return route.save();
      }
    },
    updateRoute: {
      type: RouteType,
      args: {
        id: { type: GraphQLString },
        date: { type: new GraphQLNonNull(GraphQLString) },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
        techId: { type: GraphQLID },
        companyTruckId: { type: GraphQLID },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        status: { type: GraphQLString },
        gasExpense: { type: GraphQLString },
        chemicalExpense: { type: GraphQLString },
        profit: { type: GraphQLString },
        loss: { type: GraphQLString },
        totalSales: { type: GraphQLString },
        totalHrs: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Route.findByIdAndUpdate(args.id, args);
      }
    },
    deleteRoute: {
      type: RouteType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Route.findByIdAndRemove(args.id);
      }
    },
    addWashorder: {
      type: WashorderType,
      args: {
        id: { type: GraphQLString },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        customerId: { type: new GraphQLNonNull(GraphQLID) },
        location: { type: GraphQLString },
        payment: { type: GraphQLString },
        customerVerification: { type: GraphQLString },
        region: { type: GraphQLString },
        comments: { type: GraphQLString }
      },
      resolve(parent, args) {
        const washorder = new Washorder(args);
        return washorder.save();
      }
    },
    updateWashorder: {
      type: WashorderType,
      args: {
        id: { type: GraphQLString },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        customerId: { type: new GraphQLNonNull(GraphQLID) },
        location: { type: GraphQLString },
        payment: { type: GraphQLString },
        customerVerification: { type: GraphQLString },
        region: { type: GraphQLString },
        comments: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Washorder.findByIdAndUpdate(args.id, args);
      }
    },
    deleteWashorder: {
      type: WashorderType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Washorder.findByIdAndRemove(args.id);
      }
    },
    addWashlog: {
      type: WashlogType,
      args: {
        id: { type: GraphQLString },
        routeId: { type: new GraphQLNonNull(GraphQLID) },
        washOrderId: { type: GraphQLID },
        stopNumber: { type: GraphQLString },
        reachAt: { type: GraphQLString },
        departAt: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        status: { type: GraphQLString },
        companyJobSIte: { type: GraphQLString },
        specialInstruction: { type: GraphQLString },
        vehicleType: { type: GraphQLString },
        listpieces: { type: new GraphQLList(GraphQLString) },
        estimateTime: { type: GraphQLString },
        hoursWorked: { type: GraphQLString }
      },
      resolve(parent, args) {
        const washlog = new Washlog(args);
        return washlog.save();
      }
    },
    updateWashlog: {
      type: WashlogType,
      args: {
        id: { type: GraphQLString },
        routeId: { type: new GraphQLNonNull(GraphQLID) },
        washOrderId: { type: GraphQLID },
        stopNumber: { type: GraphQLString },
        reachAt: { type: GraphQLString },
        departAt: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        status: { type: GraphQLString },
        companyJobSIte: { type: GraphQLString },
        specialInstruction: { type: GraphQLString },
        vehicleType: { type: GraphQLString },
        listpieces: { type: new GraphQLList(GraphQLString) },
        estimateTime: { type: GraphQLString },
        hoursWorked: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Washlog.findByIdAndUpdate(args.id, args);
      }
    },
    deleteWashlog: {
      type: WashlogType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Washlog.findByIdAndRemove(args.id);
      }
    },
    addReport: {
      type: ReportType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        routeId: { type: GraphQLID },
        userId: { type: GraphQLID },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        createdBy: { type: GraphQLString }
      },
      resolve(parent, args) {
        const report = new Report(args);
        return report.save();
      }
    },
    updateReport: {
      type: ReportType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        routeId: { type: GraphQLID },
        userId: { type: GraphQLID },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        createdBy: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Report.findByIdAndUpdate(args.id, args);
      }
    },
    deleteReport: {
      type: ReportType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Report.findByIdAndRemove(args.id);
      }
    },
    addCompanytruck: {
      type: CompanytruckType,
      args: {
        id: { type: GraphQLString },
        number: { type: GraphQLString },
        plate: { type: GraphQLString },
        modal: { type: GraphQLString },
        milesPerHr: { type: GraphQLString },
        license: { type: GraphQLString },
        avgFM: { type: GraphQLString }
      },
      resolve(parent, args) {
        const companytruck = new Companytruck(args);
        return companytruck.save();
      }
    },
    updateCompanytruck: {
      type: CompanytruckType,
      args: {
        id: { type: GraphQLString },
        number: { type: GraphQLString },
        plate: { type: GraphQLString },
        modal: { type: GraphQLString },
        milesPerHr: { type: GraphQLString },
        license: { type: GraphQLString },
        avgFM: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Companytruck.findByIdAndUpdate(args.id, args);
      }
    },
    deleteCompanytruck: {
      type: CompanytruckType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Companytruck.findByIdAndRemove(args.id);
      }
    },
    addEmployeeschedule: {
      type: EmployeescheduleType,
      args: {
        id: { type: GraphQLString },
        employeeId: { type: new GraphQLNonNull(GraphQLString) },
        dayOfWeek: { type: GraphQLString },
        joinTime: { type: GraphQLString },
        off: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        perDayPaid: { type: GraphQLString }
      },
      resolve(parent, args) {
        const employeeschedule = new Employeeschedule(args);
        return employeeschedule.save();
      }
    },
    updateEmployeeschedule: {
      type: EmployeescheduleType,
      args: {
        id: { type: GraphQLString },
        employeeId: { type: new GraphQLNonNull(GraphQLString) },
        dayOfWeek: { type: GraphQLString },
        joinTime: { type: GraphQLString },
        off: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        perDayPaid: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Employeeschedule.findByIdAndUpdate(args.id, args);
      }
    },
    deleteEmployeeschedule: {
      type: EmployeescheduleType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Employeeschedule.findByIdAndRemove(args.id);
      }
    },
    addTickethistory: {
      type: TickethistoryType,
      args: {
        id: { type: GraphQLString },
        assignedTo: { type: GraphQLID },
        ticketId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const tickethistory = new Tickethistory(args);
        return tickethistory.save();
      }
    },
    updateTickethistory: {
      type: TickethistoryType,
      args: {
        id: { type: GraphQLString },
        assignedTo: { type: GraphQLID },
        ticketId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Tickethistory.findByIdAndUpdate(args.id, args);
      }
    },
    deleteTickethistory: {
      type: TickethistoryType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return Tickethistory.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});