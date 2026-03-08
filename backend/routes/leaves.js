const express = require('express');
const router = express.Router();
const { protect, employerOnly } = require('../middleware/auth');
const LeaveRequest = require('../models/LeaveRequest');

// Get leave requests depend on role
router.get('/', protect, async (req, res) => {
    try {
        if (req.user.role === 'employer') {
            const requests = await LeaveRequest.find().populate('employeeId', 'name email').sort({ createdAt: -1 });
            res.json(requests);
        } else {
            const requests = await LeaveRequest.find({ employeeId: req.user._id }).sort({ createdAt: -1 });
            res.json(requests);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Apply for leave (Employee only)
router.post('/', protect, async (req, res) => {
    try {
        if (req.user.role !== 'employee') {
            return res.status(403).json({ message: 'Only employees can apply for leave' });
        }

        const { leaveType, startDate, endDate, reason } = req.body;

        const leaveRequest = await LeaveRequest.create({
            employeeId: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason,
            status: 'Pending'
        });

        res.status(201).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Approve or Reject leave (Employer only)
router.put('/:id', protect, employerOnly, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const leaveRequest = await LeaveRequest.findById(req.params.id);
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        leaveRequest.status = status;
        await leaveRequest.save();

        res.json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
