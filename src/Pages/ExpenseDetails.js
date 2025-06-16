import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

import ExpenseHeader from '../Components/ExpenseDetails/ExpenseHeader';
import ExpenseInfoCard from '../Components/ExpenseDetails/ExpenseInfoCard';
import DescriptionSection from '../Components/ExpenseDetails/DescriptionSection';
import ReceiptSection from '../Components/ExpenseDetails/ReceiptSection';
import ActionButtons from '../Components/ExpenseDetails/ActionButtons';
import AuditTrail from '../Components/ExpenseDetails/AuditTrail';
import DeleteExpenseModal from '../Components/ExpenseDetails/DeleteExpenseModal';
import ReceiptModal from '../Components/ExpenseDetails/ReceiptModal';

const ExpenseDetails = () => {
  const { groupId, expenseId } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Mock data - replace with actual API calls
  const expense = {
    id: expenseId,
    title: "Hotel Booking - Taj Resort",
    amount: 12000,
    category: "Accommodation",
    date: "2025-01-15T10:30:00Z",
    description: "3 nights stay at Taj Resort, Goa. Includes breakfast and pool access. Booked through MakeMyTrip with a 15% discount.",
    paidBy: {
      id: 1,
      name: "You",
      avatar: "Y",
      email: "you@example.com"
    },
    splitMethod: "equal",
    totalParticipants: 6,
    participants: [
      { id: 1, name: "You", avatar: "Y", amount: 2000, status: "paid" },
      { id: 2, name: "Priya Sharma", avatar: "P", amount: 2000, status: "owes" },
      { id: 3, name: "Arjun Patel", avatar: "A", amount: 2000, status: "owes" },
      { id: 4, name: "Sneha Reddy", avatar: "S", amount: 2000, status: "owes" },
      { id: 5, name: "Rahul Kumar", avatar: "R", amount: 2000, status: "owes" },
      { id: 6, name: "Kavya Singh", avatar: "K", amount: 2000, status: "owes" }
    ],
    excludedMembers: [
      { id: 7, name: "Dev Sharma", avatar: "D", reason: "Not attending trip" }
    ],
    bonusGiven: 0,
    receipt: {
      url: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",
      filename: "hotel_receipt.jpg",
      uploadedAt: "2025-01-15T10:35:00Z"
    },
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    createdBy: {
      id: 1,
      name: "You",
      avatar: "Y"
    },
    auditTrail: [
      {
        id: 1,
        action: "created",
        user: { name: "You", avatar: "Y" },
        timestamp: "2025-01-15T10:30:00Z",
        details: "Expense created"
      },
      {
        id: 2,
        action: "receipt_uploaded",
        user: { name: "You", avatar: "Y" },
        timestamp: "2025-01-15T10:35:00Z",
        details: "Receipt uploaded"
      }
    ]
  };

  const group = {
    id: groupId,
    name: "Goa Trip 2025",
    role: "Owner"
  };

  const canEdit = group.role === "Owner" || expense.createdBy.id === 1;

  const handleEdit = () => {
    navigate(`/groups/${groupId}/expenses/${expenseId}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    navigate(`/groups/${groupId}`);
  };

  const handleDownloadReceipt = () => {
    const link = document.createElement('a');
    link.href = expense.receipt.url;
    link.download = expense.receipt.filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <ExpenseHeader
        expense={expense}
        group={group}
        onBack={() => navigate(`/groups/${groupId}`)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <ExpenseInfoCard expense={expense} />

          {expense.description && (
            <DescriptionSection description={expense.description} />
          )}

          {expense.receipt && (
            <ReceiptSection
              receipt={expense.receipt}
              onView={() => setShowReceiptModal(true)}
              onDownload={handleDownloadReceipt}
            />
          )}

          {canEdit && (
            <ActionButtons
              onEdit={handleEdit}
              onDelete={() => setShowDeleteModal(true)}
            />
          )}

          <AuditTrail auditTrail={expense.auditTrail} />
        </motion.div>
      </main>

      <DeleteExpenseModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        expenseTitle={expense.title}
      />

      {expense.receipt && (
        <ReceiptModal
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          receipt={expense.receipt}
          onDownload={handleDownloadReceipt}
        />
      )}
    </div>
  );
};

export default ExpenseDetails;
