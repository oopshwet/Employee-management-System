// routes/salary.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all salary details records
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM salary_details';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get salary details for an employee
router.get('/:employeeId', (req, res) => {
  const sql = 'SELECT * FROM salary_details WHERE employee_id = ?';
  db.query(sql, [req.params.employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a salary record
router.post('/', (req, res) => {
  const { employee_id, basic_salary, allowances, deductions, bonus, effective_date } = req.body;
  const sql = `INSERT INTO salary_details (employee_id, basic_salary, allowances, deductions, bonus, effective_date)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [employee_id, basic_salary, allowances, deductions, bonus, effective_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Salary detail added successfully', salaryId: result.insertId });
  });
});

// Update salary detail record
router.put('/:salaryId', (req, res) => {
  const { employee_id, basic_salary, allowances, deductions, bonus, effective_date } = req.body;
  const sql = `UPDATE salary_details SET employee_id=?, basic_salary=?, allowances=?, deductions=?, bonus=?, effective_date=?
               WHERE salary_id=?`;
  db.query(sql, [employee_id, basic_salary, allowances, deductions, bonus, effective_date, req.params.salaryId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Salary detail updated successfully' });
  });
});

// Delete a salary record
router.delete('/:salaryId', (req, res) => {
  const sql = 'DELETE FROM salary_details WHERE salary_id=?';
  db.query(sql, [req.params.salaryId], (err, result) => {
    if(err) return res.status(500).json({ error: err });
    res.json({ message: 'Salary detail deleted successfully' });
  });
});

module.exports = router;
