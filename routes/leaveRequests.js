const express = require('express');
const router = express.Router();
const db = require('../db');

// 🟢 Get all leave requests
router.get('/', (req, res) => {
  db.query('SELECT * FROM leave_requests', (err, results) => {
    if (err) {
      console.error('Error fetching leave requests:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// 🟢 Get leave requests for a specific employee
router.get('/:employeeId', (req, res) => {
  db.query('SELECT * FROM leave_requests WHERE employee_id=?', [req.params.employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching leave requests for employee:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// 🟡 Add a leave request
router.post('/', (req, res) => {
  const { employee_id, leave_type, start_date, end_date, reason } = req.body;
  
  // Validate required fields
  if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, status, reason)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [employee_id, leave_type, start_date, end_date, 'Pending', reason], (err, result) => {
    if (err) {
      console.error('Error submitting leave request:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Leave request submitted successfully', leaveId: result.insertId });
  });
});

// 🔵 Update leave request status
router.put('/:leaveId', (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  db.query('UPDATE leave_requests SET status=? WHERE leave_id=?', [status, req.params.leaveId], (err, result) => {
    if (err) {
      console.error('Error updating leave request:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Leave request updated successfully' });
  });
});

// 🔴 Delete a leave request
router.delete('/:leaveId', (req, res) => {
  db.query('DELETE FROM leave_requests WHERE leave_id=?', [req.params.leaveId], (err, result) => {
    if (err) {
      console.error('Error deleting leave request:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Leave request deleted successfully' });
  });
});

module.exports = router;
