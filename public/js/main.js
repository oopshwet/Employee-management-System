// public/js/main.js
document.addEventListener("DOMContentLoaded", () => {

  // Helper functions to load and display data
  // 🟢 Load Employees
  function loadEmployees() {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        let tableContent = `<table class="table table-bordered"><thead>
            <tr><th>ID</th><th>Name</th><th>Job Title</th><th>Department</th><th>Actions</th></tr>
        </thead><tbody>`;
  
        data.forEach(employee => {
          tableContent += `<tr>
            <td>${employee.employee_id}</td>
            <td>${employee.first_name} ${employee.last_name}</td>
            <td>${employee.job_title}</td>
            <td>${employee.department}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${employee.employee_id})">Delete</button>
            </td>
          </tr>`;
        });
  
        tableContent += `</tbody></table>`;
        document.getElementById('employeeList').innerHTML = tableContent;
      })
      .catch(err => console.error("Error fetching employees:", err));
  }
  

  function editEmployee(employeeId) {
    const first_name = prompt("Enter new first name:");
    const last_name = prompt("Enter new last name:");
    const job_title = prompt("Enter new job title:");
    const department = prompt("Enter new department:");
    const email = prompt("Enter new email:");
  
    if (first_name && last_name && job_title && department && email) {
      const updatedData = { first_name, last_name, job_title, department, email };
  
      fetch(`/api/employees/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      })
      .then(res => res.json())
      .then(response => {
        alert(response.message);
        loadEmployees(); // Refresh the table
      })
      .catch(err => console.error("Error updating employee:", err));
    } else {
      alert("Invalid input! Employee was not updated.");
    }
  }

  function deleteEmployee(employeeId) {
    if (confirm("Are you sure you want to delete this employee?")) {
      fetch(`/api/employees/${employeeId}`, { method: "DELETE" })
        .then(res => res.json())
        .then(response => {
          alert(response.message);
          loadEmployees(); // Refresh employee list
        })
        .catch(err => console.error("Error deleting employee:", err));
    }
  }
  


  function loadSalary() {
    fetch('/api/salary')
      .then(res => res.json())
      .then(data => {
        let output = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Employee ID</th><th>Basic Salary</th></tr></thead><tbody>';
        data.forEach(record => {
          output += `<tr>
                         <td>${record.salary_id}</td>
                         <td>${record.employee_id}</td>
                         <td>${record.basic_salary}</td>
                       </tr>`;
        });
        output += '</tbody></table>';
        document.getElementById('salaryList').innerHTML = output;
      })
      .catch(err => console.error(err));
  }

  function loadPayroll() {
    fetch('/api/payroll')
      .then(res => res.json())
      .then(data => {
        let output = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Employee ID</th><th>Pay Date</th><th>Net Salary</th></tr></thead><tbody>';
        data.forEach(record => {
          output += `<tr>
                         <td>${record.payroll_id}</td>
                         <td>${record.employee_id}</td>
                         <td>${record.pay_date}</td>
                         <td>${record.net_salary}</td>
                       </tr>`;
        });
        output += '</tbody></table>';
        document.getElementById('payrollList').innerHTML = output;
      })
      .catch(err => console.error(err));
  }

  function loadLeaveRequests() {
    fetch('/api/leaves')
      .then(res => res.json())
      .then(data => {
        let output = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Employee ID</th><th>Leave Type</th><th>Status</th></tr></thead><tbody>';
        data.forEach(record => {
          output += `<tr>
                         <td>${record.leave_id}</td>
                         <td>${record.employee_id}</td>
                         <td>${record.leave_type}</td>
                         <td>${record.status}</td>
                       </tr>`;
        });
        output += '</tbody></table>';
        document.getElementById('leaveList').innerHTML = output;
      })
      .catch(err => console.error(err));
  }

  // Load all data when the page loads
  loadEmployees();
  loadSalary();
  loadPayroll();
  loadLeaveRequests();

  // Form submissions
  document.getElementById("employeeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    fetch('/api/employees', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        alert(response.message);
        this.reset();
        loadEmployees();
      })
      .catch(err => console.error(err));
  });

  document.getElementById("salaryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    fetch('/api/salary', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        alert(response.message);
        this.reset();
        loadSalary();
      })
      .catch(err => console.error(err));
  });

  document.getElementById("payrollForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    fetch('/api/payroll', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        alert(response.message);
        this.reset();
        loadPayroll();
      })
      .catch(err => console.error(err));
  });

  document.getElementById("leaveForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    fetch('/api/leaves', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        alert(response.message);
        this.reset();
        loadLeaveRequests();
      })
      .catch(err => console.error(err));
  });
});
