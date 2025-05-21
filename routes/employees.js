// routes/employees.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 🟢 Get all employees
router.get('/', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 🟢 Get an employee by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM employees WHERE employee_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// 🟢 Add a new employee
router.post('/', (req, res) => {
  const { first_name, last_name, job_title, department, email } = req.body;
  const sql = `INSERT INTO employees (first_name, last_name, job_title, department, email, status) VALUES (?, ?, ?, ?, ?, 'Active')`;

  db.query(sql, [first_name, last_name, job_title, department, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee added successfully', employeeId: result.insertId });
  });
});

// 🟡 Update an employee
router.put('/:id', (req, res) => {
  const { first_name, last_name, job_title, department, email } = req.body;
  const sql = `UPDATE employees SET first_name=?, last_name=?, job_title=?, department=?, email=? WHERE employee_id=?`;

  db.query(sql, [first_name, last_name, job_title, department, email, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee updated successfully' });
  });
});

// 🔴 Delete an employee
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM employees WHERE employee_id = ?';

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee deleted successfully' });
  });
});

module.exports = router;
