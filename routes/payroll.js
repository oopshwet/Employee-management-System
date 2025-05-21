// routes/payroll.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all payroll entries
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM payroll';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get payroll for a specific employee
router.get('/:employeeId', (req, res) => {
  const sql = 'SELECT * FROM payroll WHERE employee_id=?';
  db.query(sql, [req.params.employeeId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a payroll entry
router.post('/', (req, res) => {
  const { employee_id, pay_date, hours_worked, calculated_salary, tax, insurance, other_deductions, net_salary } = req.body;
  const sql = `INSERT INTO payroll (employee_id, pay_date, hours_worked, calculated_salary, tax, insurance, other_deductions, net_salary)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [employee_id, pay_date, hours_worked, calculated_salary, tax, insurance, other_deductions, net_salary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Payroll entry added successfully', payrollId: result.insertId });
    }
  );
});

// Update a payroll entry
router.put('/:payrollId', (req, res) => {
  const { employee_id, pay_date, hours_worked, calculated_salary, tax, insurance, other_deductions, net_salary } = req.body;
  const sql = `UPDATE payroll SET employee_id=?, pay_date=?, hours_worked=?, calculated_salary=?, tax=?, insurance=?, other_deductions=?, net_salary=?
               WHERE payroll_id=?`;
  db.query(
    sql,
    [employee_id, pay_date, hours_worked, calculated_salary, tax, insurance, other_deductions, net_salary, req.params.payrollId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Payroll entry updated successfully' });
    }
  );
});

// Delete a payroll entry
router.delete('/:payrollId', (req, res) => {
  const sql = 'DELETE FROM payroll WHERE payroll_id=?';
  db.query(sql, [req.params.payrollId], (err, result) => {
    if(err) return res.status(500).json({ error: err });
    res.json({ message: 'Payroll entry deleted successfully' });
  });
});

module.exports = router;
