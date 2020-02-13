import { gql } from 'apollo-boost';

const queryEveryUser = gql`
  {
    everyUser {
      id
      email
      password
      status
      role
      createdAt
      updatedAt
    }
  }
`

const queryUserById = gql`
  query($id: String!) {
    user(id: $id) {
      id
      email
      password
      status
      role
      createdAt
      updatedAt
    }
  }
`

const queryCurrentUser = gql`
  {
    currentUser {
      id
      email
      password
      status
      role
      createdAt
      
    }
  }
`

const queryEveryEmployee = gql`
  {
    everyEmployee {
      id
      name
      userId
      gender
      ratePerHour
      jobTitle
      hoursPerWeek
      joinDate
      phone
      address
      payrollid
      badge
      pin
      picture
      department
    }
  }
`

const queryEmployeeById = gql`
  query($id: String!) {
    employee(id: $id) {
      id
      name
      userId
      gender
      ratePerHour
      jobTitle
      hoursPerWeek
      joinDate
      phone
      address
      payrollid
      badge
      pin
      picture
      department
    }
  }
`

const queryEveryPayroll = gql`
  {
    everyPayroll {
      id
      employeeId
      date
      salary
      ratePerHour
      ratePerDay
      totalWorkedHours
    }
  }
`

const queryPayrollById = gql`
  query($id: String!) {
    payroll(id: $id) {
      id
      employeeId
      date
      salary
      ratePerHour
      ratePerDay
      totalWorkedHours
    }
  }
`

const queryEveryCustomer = gql`
  {
    everyCustomer {
      id
      name
      phone
      address
      fax
      area
    }
  }
`

const queryCustomerById = gql`
  query($id: String!) {
    customer(id: $id) {
      id
      name
      phone
      address
      fax
      area

    }
  }
`

const queryEveryTicket = gql`
  {
    everyTicket {
      id
      customerId
    }
  }
`

const queryTicketById = gql`
  query($id: String!) {
    ticket(id: $id) {
      id
      customerId
    }
  }
`

const queryEveryRoute = gql`
  {
    everyRoute {
      id
      date
      startTime
      endTime
      techId
      companyTruckId
      description
      createdAt
      status
      gasExpense
      chemicalExpense
      profit
      loss
      totalSales
      totalHrs
    }
  }
`

const queryRouteById = gql`
  query($id: String!) {
    route(id: $id) {
      id
      date
      startTime
      endTime
      techId
      companyTruckId
      description
      createdAt
      status
      gasExpense
      chemicalExpense
      profit
      loss
      totalSales
      totalHrs
    }
  }
`

const queryEveryWashorder = gql`
  {
    everyWashorder {
      id
      status
      description
      customerId
      location
      payment
      customerVerification
      region
      comments
    }
  }
`

const queryWashorderById = gql`
  query($id: String!) {
    washorder(id: $id) {
      id
      status
      description
      customerId
      location
      payment
      customerVerification
      region
      comments
    }
  }
`

const queryEveryWashlog = gql`
  {
    everyWashlog {
      id
      routeId
      washOrderId
      stopNumber
      reachAt
      departAt
      createdAt
      status
      companyJobSIte
      specialInstruction
      vehicleType
      listpieces
      estimateTime
      hoursWorked
    }
  }
`

const queryWashlogById = gql`
  query($id: String!) {
    washlog(id: $id) {
      id
      routeId
      washOrderId
      stopNumber
      reachAt
      departAt
      createdAt
      status
      companyJobSIte
      specialInstruction
      vehicleType
      listpieces
      estimateTime
      hoursWorked
    }
  }
`

const queryEveryReport = gql`
  {
    everyReport {
      id
      name
      routeId
      userId
      description
      createdAt
      updatedAt
      createdBy
    }
  }
`

const queryReportById = gql`
  query($id: String!) {
    report(id: $id) {
      id
      name
      routeId
      userId
      description
      createdAt
      updatedAt
      createdBy
    }
  }
`

const queryEveryCompanytruck = gql`
  {
    everyCompanytruck {
      id
      number
      plate
      modal
      milesPerHr
      license
      avgFM
    }
  }
`

const queryCompanytruckById = gql`
  query($id: String!) {
    companytruck(id: $id) {
      id
      number
      plate
      modal
      milesPerHr
      license
      avgFM
    }
  }
`

const queryEveryEmployeeschedule = gql`
  {
    everyEmployeeschedule {
      id
      employeeId
      dayOfWeek
      joinTime
      off
      createdAt
      perDayPaid
    }
  }
`

const queryEmployeescheduleById = gql`
  query($id: String!) {
    employeeschedule(id: $id) {
      id
      employeeId
      dayOfWeek
      joinTime
      off
      createdAt
      perDayPaid
    }
  }
`

const queryEveryTickethistory = gql`
  {
    everyTickethistory {
      id
      assignedTo
      ticketId
    }
  }
`

const queryTickethistoryById = gql`
  query($id: String!) {
    tickethistory(id: $id) {
      id
      assignedTo
      ticketId
    }
  }
`

export { queryEveryUser, queryUserById , queryEveryEmployee, queryEmployeeById , queryEveryPayroll, queryPayrollById , queryEveryCustomer, queryCustomerById , queryEveryTicket, queryTicketById , queryEveryRoute, queryRouteById , queryEveryWashorder, queryWashorderById , queryEveryWashlog, queryWashlogById , queryEveryReport, queryReportById , queryEveryCompanytruck, queryCompanytruckById , queryEveryEmployeeschedule, queryEmployeescheduleById , queryEveryTickethistory, queryTickethistoryById, queryCurrentUser };