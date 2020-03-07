import { gql } from 'apollo-boost';

const signIn = gql`
  mutation($email: String!,$password: String!){
    signIn(email: $email, password: $password){
      token
    }
  }
`

const addUserMutation = gql`
  mutation($email: String!, $password: String!, $status: String, $role: String, $createdAt: String, $updatedAt: String) {
    addUser(email: $email, password: $password, status: $status, role: $role, createdAt: $createdAt, updatedAt: $updatedAt) {
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

const updateUserMutation = gql`
  mutation($id: String!, $email: String!, $password: String!, $status: String, $role: String, $createdAt: String, $updatedAt: String) {
    updateUser(id: $id, email: $email, password: $password, status: $status, role: $role, createdAt: $createdAt, updatedAt: $updatedAt) {
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

const deleteUserMutation = gql`
  mutation($id: String!){
    deleteUser(id: $id){
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

const addEmployeeMutation = gql`
  mutation($name: String, $userId: ID!, $gender: String, $ratePerHour: String, $jobTitle: String, $hoursPerWeek: String, $joinDate: String, $phone: String, $address: String, $payrollid: String, $badge: String, $pin: String, $picture: String, $department: String) {
    addEmployee(name: $name, userId: $userId, gender: $gender, ratePerHour: $ratePerHour, jobTitle: $jobTitle, hoursPerWeek: $hoursPerWeek, joinDate: $joinDate, phone: $phone, address: $address, payrollid: $payrollid, badge: $badge, pin: $pin, picture: $picture, department: $department) {
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

const updateEmployeeMutation = gql`
  mutation($id: String!, $name: String, $userId: ID!, $gender: String, $ratePerHour: String, $jobTitle: String, $hoursPerWeek: String, $joinDate: String, $phone: String, $address: String, $payrollid: String, $badge: String, $pin: String, $picture: String, $department: String) {
    updateEmployee(id: $id, name: $name, userId: $userId, gender: $gender, ratePerHour: $ratePerHour, jobTitle: $jobTitle, hoursPerWeek: $hoursPerWeek, joinDate: $joinDate, phone: $phone, address: $address, payrollid: $payrollid, badge: $badge, pin: $pin, picture: $picture, department: $department) {
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

const deleteEmployeeMutation = gql`
  mutation($id: String!){
    deleteEmployee(id: $id){
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

const addPayrollMutation = gql`
  mutation($employeeId: ID!, $date: String, $salary: String, $ratePerHour: String, $ratePerDay: String, $totalWorkedHours: String) {
    addPayroll(employeeId: $employeeId, date: $date, salary: $salary, ratePerHour: $ratePerHour, ratePerDay: $ratePerDay, totalWorkedHours: $totalWorkedHours) {
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

const updatePayrollMutation = gql`
  mutation($id: String!, $employeeId: ID!, $date: String, $salary: String, $ratePerHour: String, $ratePerDay: String, $totalWorkedHours: String) {
    updatePayroll(id: $id, employeeId: $employeeId, date: $date, salary: $salary, ratePerHour: $ratePerHour, ratePerDay: $ratePerDay, totalWorkedHours: $totalWorkedHours) {
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

const deletePayrollMutation = gql`
  mutation($id: String!){
    deletePayroll(id: $id){
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

const addCustomerMutation = gql`
  mutation($name: String, $phone: String, $address: String, $fax: String, $area: String) {
    addCustomer(name: $name, phone: $phone, address: $address, fax: $fax, area: $area) {
      id
      name
      phone
      address
      fax
      area
    }
  }
`

const updateCustomerMutation = gql`
  mutation($id: String!, $name: String, $phone: String, $address: String, $fax: String) {
    updateCustomer(id: $id, name: $name, phone: $phone, address: $address, fax: $fax) {
      id
      name
      phone
      address
      fax
    }
  }
`

const deleteCustomerMutation = gql`
  mutation($id: String!){
    deleteCustomer(id: $id){
      id
      name
      phone
      address
      fax
    }
  }
`

const addTicketMutation = gql`
  mutation($customerId: ID!, category: String, assignTo: ID, description: String, comment: String, dateCallReceived: String, createdAt: String, status: String) {
    addTicket(customerId: $customerId, category: $category, assignTo: $assignTo, description: $description, comment: $comment, dateCallReceived: $dateCallReceived, createdAt: $createdAt, status: $status) {
      id
      customerId
      category
      assignTo
      description
      comment
      dateCallReceived
      createdAt
      status
    }
  }
`

const updateTicketMutation = gql`
  mutation($id: String!, $customerId: ID!) {
    updateTicket(id: $id, customerId: $customerId) {
      id
      customerId
      category
      assignTo
      description
      comment
      dateCallReceived
      createdAt
      status
    }
  }
`

const deleteTicketMutation = gql`
  mutation($id: String!){
    deleteTicket(id: $id){
      id
      customerId
      category
      assignTo
      description
      comment
      dateCallReceived
      createdAt
      status
    }
  }
`

const addRouteMutation = gql`
  mutation($date: String!, $startTime: String, $endTime: String, $techId: ID, $companyTruckId: ID, $description: String, $createdAt: String, $status: String, $gasExpense: String, $chemicalExpense: String, $profit: String, $loss: String, $totalSales: String, $totalHrs: String) {
    addRoute(date: $date, startTime: $startTime, endTime: $endTime, techId: $techId, companyTruckId: $companyTruckId, description: $description, createdAt: $createdAt, status: $status, gasExpense: $gasExpense, chemicalExpense: $chemicalExpense, profit: $profit, loss: $loss, totalSales: $totalSales, totalHrs: $totalHrs) {
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

const updateRouteMutation = gql`
  mutation($id: String!, $date: String!, $startTime: String, $endTime: String, $techId: ID, $companyTruckId: ID, $description: String, $createdAt: String, $status: String, $gasExpense: String, $chemicalExpense: String, $profit: String, $loss: String, $totalSales: String, $totalHrs: String) {
    updateRoute(id: $id, date: $date, startTime: $startTime, endTime: $endTime, techId: $techId, companyTruckId: $companyTruckId, description: $description, createdAt: $createdAt, status: $status, gasExpense: $gasExpense, chemicalExpense: $chemicalExpense, profit: $profit, loss: $loss, totalSales: $totalSales, totalHrs: $totalHrs) {
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

const deleteRouteMutation = gql`
  mutation($id: String!){
    deleteRoute(id: $id){
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

const addWashorderMutation = gql`
  mutation($status: String, $description: String, $customerId: ID!, $location: String, $payment: String, $customerVerification: String, $region: String, $comments: String) {
    addWashorder(status: $status, description: $description, customerId: $customerId, location: $location, payment: $payment, customerVerification: $customerVerification, region: $region, comments: $comments) {
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

const updateWashorderMutation = gql`
  mutation($id: String!, $status: String, $description: String, $customerId: ID!, $location: String, $payment: String, $customerVerification: String, $region: String, $comments: String) {
    updateWashorder(id: $id, status: $status, description: $description, customerId: $customerId, location: $location, payment: $payment, customerVerification: $customerVerification, region: $region, comments: $comments) {
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

const deleteWashorderMutation = gql`
  mutation($id: String!){
    deleteWashorder(id: $id){
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

const addWashlogMutation = gql`
  mutation($routeId: ID!, $washOrderId: ID, $stopNumber: String, $reachAt: String, $departAt: String, $createdAt: String, $status: String, $companyJobSIte: String, $specialInstruction: String, $vehicleType: String, $listpieces: [String], $estimateTime: String, $hoursWorked: String) {
    addWashlog(routeId: $routeId, washOrderId: $washOrderId, stopNumber: $stopNumber, reachAt: $reachAt, departAt: $departAt, createdAt: $createdAt, status: $status, companyJobSIte: $companyJobSIte, specialInstruction: $specialInstruction, vehicleType: $vehicleType, listpieces: $listpieces, estimateTime: $estimateTime, hoursWorked: $hoursWorked) {
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

const updateWashlogMutation = gql`
  mutation($id: String!, $routeId: ID!, $washOrderId: ID, $stopNumber: String, $reachAt: String, $departAt: String, $createdAt: String, $status: String, $companyJobSIte: String, $specialInstruction: String, $vehicleType: String, $listpieces: [String], $estimateTime: String, $hoursWorked: String) {
    updateWashlog(id: $id, routeId: $routeId, washOrderId: $washOrderId, stopNumber: $stopNumber, reachAt: $reachAt, departAt: $departAt, createdAt: $createdAt, status: $status, companyJobSIte: $companyJobSIte, specialInstruction: $specialInstruction, vehicleType: $vehicleType, listpieces: $listpieces, estimateTime: $estimateTime, hoursWorked: $hoursWorked) {
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

const deleteWashlogMutation = gql`
  mutation($id: String!){
    deleteWashlog(id: $id){
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

const addReportMutation = gql`
  mutation($name: String, $routeId: ID, $userId: ID, $description: String, $createdAt: String, $updatedAt: String, $createdBy: String) {
    addReport(name: $name, routeId: $routeId, userId: $userId, description: $description, createdAt: $createdAt, updatedAt: $updatedAt, createdBy: $createdBy) {
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

const updateReportMutation = gql`
  mutation($id: String!, $name: String, $routeId: ID, $userId: ID, $description: String, $createdAt: String, $updatedAt: String, $createdBy: String) {
    updateReport(id: $id, name: $name, routeId: $routeId, userId: $userId, description: $description, createdAt: $createdAt, updatedAt: $updatedAt, createdBy: $createdBy) {
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

const deleteReportMutation = gql`
  mutation($id: String!){
    deleteReport(id: $id){
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

const addCompanytruckMutation = gql`
  mutation($number: String, $plate: String, $modal: String, $milesPerHr: String, $license: String, $avgFM: String) {
    addCompanytruck(number: $number, plate: $plate, modal: $modal, milesPerHr: $milesPerHr, license: $license, avgFM: $avgFM) {
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

const updateCompanytruckMutation = gql`
  mutation($id: String!, $number: String, $plate: String, $modal: String, $milesPerHr: String, $license: String, $avgFM: String) {
    updateCompanytruck(id: $id, number: $number, plate: $plate, modal: $modal, milesPerHr: $milesPerHr, license: $license, avgFM: $avgFM) {
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

const deleteCompanytruckMutation = gql`
  mutation($id: String!){
    deleteCompanytruck(id: $id){
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

const addEmployeescheduleMutation = gql`
  mutation($employeeId: String!, $dayOfWeek: String, $joinTime: String, $off: Boolean, $createdAt: String, $perDayPaid: String) {
    addEmployeeschedule(employeeId: $employeeId, dayOfWeek: $dayOfWeek, joinTime: $joinTime, off: $off, createdAt: $createdAt, perDayPaid: $perDayPaid) {
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

const updateEmployeescheduleMutation = gql`
  mutation($id: String!, $employeeId: String!, $dayOfWeek: String, $joinTime: String, $off: Boolean, $createdAt: String, $perDayPaid: String) {
    updateEmployeeschedule(id: $id, employeeId: $employeeId, dayOfWeek: $dayOfWeek, joinTime: $joinTime, off: $off, createdAt: $createdAt, perDayPaid: $perDayPaid) {
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

const deleteEmployeescheduleMutation = gql`
  mutation($id: String!){
    deleteEmployeeschedule(id: $id){
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

const addTickethistoryMutation = gql`
  mutation($assignedTo: ID, $ticketId: ID!,assignedBy: ID, status: String, forwardDept: String, commnets: String ) {
    addTickethistory(assignedTo: $assignedTo, ticketId: $ticketId, assignedBy:$assignedBy, status:$status,forwardDept:$forwardDept,commnets:$comments) {
      id
      ticketId
      assignedTo
      assignedBy
      status
      forwardDept
      comments
    }
  }
`

const updateTickethistoryMutation = gql`
  mutation($id: String!, $assignedTo: ID, $ticketId: ID!) {
    updateTickethistory(id: $id, assignedTo: $assignedTo, ticketId: $ticketId) {
      id
      ticketId
      assignedTo
      assignedBy
      status
      forwardDept
      comments
    }
  }
`

const deleteTickethistoryMutation = gql`
  mutation($id: String!){
    deleteTickethistory(id: $id){
      id
      ticketId
      assignedTo
      assignedBy
      status
      forwardDept
      comments
    }
  }
`

export {
  signIn,
  addUserMutation,
  updateUserMutation,
  deleteUserMutation,
  addEmployeeMutation,
  updateEmployeeMutation,
  deleteEmployeeMutation,
  addPayrollMutation,
  updatePayrollMutation,
  deletePayrollMutation,
  addCustomerMutation,
  updateCustomerMutation,
  deleteCustomerMutation,
  addTicketMutation,
  updateTicketMutation,
  deleteTicketMutation,
  addRouteMutation,
  updateRouteMutation,
  deleteRouteMutation,
  addWashorderMutation,
  updateWashorderMutation,
  deleteWashorderMutation,
  addWashlogMutation,
  updateWashlogMutation,
  deleteWashlogMutation,
  addReportMutation,
  updateReportMutation,
  deleteReportMutation,
  addCompanytruckMutation,
  updateCompanytruckMutation,
  deleteCompanytruckMutation,
  addEmployeescheduleMutation,
  updateEmployeescheduleMutation,
  deleteEmployeescheduleMutation,
  addTickethistoryMutation,
  updateTickethistoryMutation,
  deleteTickethistoryMutation,
};