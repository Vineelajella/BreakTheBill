// group overview page

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Receipt, 
  BarChart3, 
  Settings,
  Bell,
  Home,
  Calendar,
  Tag,
  User,
  Crown,
  UserPlus,
  Copy,
  UserMinus,
  Trash2,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Edit3
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import AddExpenseModal from '../Components/AddExpenseModal';
import ExpenseDetailModal from '../Components/ExpenseDetailModal';
import SettleUpModal from '../Components/SettleUpModal';
import InviteMemberModal from '../Components/InviteMemberModal';
import KickMemberModal from '../Components/KickMemberModal';
import TransferOwnershipModal from '../Components/TransferOwnershipModal';
import DeleteGroupModal from '../Components/DeleteGroupModal';
import EditExpenseModal from '../Components/EditExpenseModal';
import { toast } from 'react-toastify';

const GroupOverview = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('expenses');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterMember, setFilterMember] = useState('All');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showExpenseDetailModal, setShowExpenseDetailModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [showSettleUpModal, setShowSettleUpModal] = useState(false);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
  const [showKickMemberModal, setShowKickMemberModal] = useState(false);
  const [showTransferOwnershipModal, setShowTransferOwnershipModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  // Mock data - replace with actual API calls
  const group = {
    id: groupId,
    name: "Goa Trip 2025",
    balance: -1250,
    memberCount: 6,
    role: "Owner",
    inviteCode: "GOA2025",
    members: [
      { id: 1, name: "You", email: "you@example.com", avatar: "Y", role: "Owner", balance: -1250 },
      { id: 2, name: "Priya Sharma", email: "priya@example.com", avatar: "P", role: "Member", balance: 850 },
      { id: 3, name: "Arjun Patel", email: "arjun@example.com", avatar: "A", role: "Member", balance: -320 },
      { id: 4, name: "Sneha Reddy", email: "sneha@example.com", avatar: "S", role: "Member", balance: 720 },
      { id: 5, name: "Rahul Kumar", email: "rahul@example.com", avatar: "R", role: "Member", balance: 0 },
      { id: 6, name: "Kavya Singh", email: "kavya@example.com", avatar: "K", role: "Member", balance: 0 }
    ]
  };

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Hotel Booking - Taj Resort",
      amount: 12000,
      paidBy: "You",
      paidById: 1,
      splitBetween: 6,
      category: "Accommodation",
      date: "2025-01-15",
      description: "3 nights stay at Taj Resort, Goa",
      participants: group.members.map(m => ({ ...m, selected: true, amount: 2000 })),
      receipt: null,
      splitType: 'equal',
      createdAt: new Date().toISOString(),
      createdBy: { id: 1, name: "You", avatar: "Y" }
    },
    {
      id: 2,
      title: "Flight Tickets",
      amount: 8400,
      paidBy: "Priya Sharma",
      paidById: 2,
      splitBetween: 6,
      category: "Transport",
      date: "2025-01-14",
      description: "Round trip flights for all members",
      participants: group.members.map(m => ({ ...m, selected: true, amount: 1400 })),
      receipt: null,
      splitType: 'equal',
      createdAt: new Date().toISOString(),
      createdBy: { id: 2, name: "Priya Sharma", avatar: "P" }
    }
  ]);

  const categories = ['All', 'Food', 'Transport', 'Accommodation', 'Entertainment', 'Shopping', 'Other'];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || expense.category === filterCategory;
    const matchesMember = filterMember === 'All' || expense.paidBy === filterMember;
    return matchesSearch && matchesCategory && matchesMember;
  });

  const tabs = [
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'summary', label: 'Summary', icon: BarChart3 },
    ...(group.role === 'Owner' ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  const handleAddExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      title: expenseData.title,
      amount: parseFloat(expenseData.amount),
      paidBy: group.members.find(m => m.id.toString() === expenseData.paidBy)?.name || "You",
      paidById: parseInt(expenseData.paidBy),
      splitBetween: expenseData.participants.filter(p => p.selected).length,
      category: expenseData.category,
      date: expenseData.date,
      description: expenseData.description,
      participants: expenseData.participants.filter(p => p.selected).map(p => ({
        ...p,
        amount: expenseData.splitType === 'equal' 
          ? Math.round(parseFloat(expenseData.amount) / expenseData.participants.filter(pp => pp.selected).length)
          : p.amount
      })),
      receipt: null,
      splitType: expenseData.splitType,
      createdAt: new Date().toISOString(),
      createdBy: { id: 1, name: "You", avatar: "Y" }
    };

    setExpenses(prev => [newExpense, ...prev]);
    setShowAddExpenseModal(false);
    toast.success('Expense added successfully!');
  };

  const handleEditExpense = (expenseData) => {
    const updatedExpense = {
      ...selectedExpense,
      title: expenseData.title,
      amount: parseFloat(expenseData.amount),
      paidBy: group.members.find(m => m.id.toString() === expenseData.paidBy)?.name || "You",
      paidById: parseInt(expenseData.paidBy),
      splitBetween: expenseData.participants.filter(p => p.selected).length,
      category: expenseData.category,
      date: expenseData.date,
      description: expenseData.description,
      participants: expenseData.participants.filter(p => p.selected).map(p => ({
        ...p,
        amount: expenseData.splitType === 'equal' 
          ? Math.round(parseFloat(expenseData.amount) / expenseData.participants.filter(pp => pp.selected).length)
          : p.amount
      })),
      splitType: expenseData.splitType,
      updatedAt: new Date().toISOString()
    };

    setExpenses(prev => prev.map(exp => exp.id === selectedExpense.id ? updatedExpense : exp));
    setShowEditExpenseModal(false);
    setSelectedExpense(null);
    toast.success('Expense updated successfully!');
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
    toast.success('Expense deleted successfully!');
  };

  const handleViewExpenseDetail = (expense) => {
    setSelectedExpense(expense);
    setShowExpenseDetailModal(true);
  };

  const handleEditExpenseClick = (expense) => {
    setSelectedExpense(expense);
    setShowEditExpenseModal(true);
  };

  const handleKickMember = (member) => {
    setSelectedMember(member);
    setShowKickMemberModal(true);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    toast.success('Invite code copied to clipboard!');
  };

  const renderExpensesTab = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filterMember}
            onChange={(e) => setFilterMember(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
          >
            <option value="All">All Members</option>
            {group.members.map(member => (
              <option key={member.id} value={member.name}>{member.name}</option>
            ))}
          </select>
          <motion.button
            onClick={() => setShowAddExpenseModal(true)}
            className="flex items-center px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </motion.button>
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-[#00FF84] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{expense.title}</h3>
                    <span className="px-2 py-1 bg-[#00FF84]/20 text-[#00FF84] text-xs rounded-full">
                      {expense.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Paid by {expense.paidBy}</span>
                    <span>•</span>
                    <span>Split between {expense.splitBetween} people</span>
                    <span>•</span>
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#00FF84]">₹{expense.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">₹{Math.round(expense.amount / expense.splitBetween)} per person</div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleViewExpenseDetail(expense)}
                      className="flex items-center px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </motion.button>
                    {(group.role === 'Owner' || expense.createdBy.id === 1) && (
                      <motion.button
                        onClick={() => handleEditExpenseClick(expense)}
                        className="flex items-center px-3 py-2 bg-[#00FF84]/20 text-[#00FF84] rounded-lg hover:bg-[#00FF84]/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No expenses found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterCategory !== 'All' || filterMember !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first expense'
              }
            </p>
            {!searchTerm && filterCategory === 'All' && filterMember === 'All' && (
              <motion.button
                onClick={() => setShowAddExpenseModal(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Expense
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderMembersTab = () => (
    <div className="space-y-6">
      {/* Invite Section */}
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Invite Members</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="flex items-center bg-gray-800 rounded-lg p-3">
              <span className="text-gray-400 mr-2">Invite Code:</span>
              <span className="font-mono text-[#00FF84] font-semibold">{group.inviteCode}</span>
              <button
                onClick={copyInviteCode}
                className="ml-auto p-1 text-gray-400 hover:text-[#00FF84] transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <motion.button
            onClick={() => setShowInviteMemberModal(true)}
            className="flex items-center px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite by Email
          </motion.button>
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {group.members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {member.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    {member.role === 'Owner' && (
                      <Crown className="w-4 h-4 text-[#00FF84]" />
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.role === 'Owner' 
                        ? 'bg-[#00FF84]/20 text-[#00FF84]' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  {member.balance > 0 ? (
                    <div className="text-[#00FF84] font-semibold">+₹{member.balance}</div>
                  ) : member.balance < 0 ? (
                    <div className="text-red-400 font-semibold">-₹{Math.abs(member.balance)}</div>
                  ) : (
                    <div className="text-gray-400">Settled</div>
                  )}
                </div>
                {group.role === 'Owner' && member.role !== 'Owner' && (
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleKickMember(member)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <UserMinus className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSummaryTab = () => (
    <div className="space-y-6">
      {/* Debt Matrix */}
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Who Owes Whom</h3>
          <motion.button
            onClick={() => setShowSettleUpModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Settle Up
          </motion.button>
        </div>
        <div className="space-y-3">
          {group.members
            .filter(member => member.balance !== 0)
            .map((member, index) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold">
                    {member.avatar}
                  </div>
                  <span className="text-white">{member.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {member.balance > 0 ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-[#00FF84]" />
                      <span className="text-[#00FF84] font-semibold">Gets ₹{member.balance}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-semibold">Owes ₹{Math.abs(member.balance)}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Spending by Category</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            <BarChart3 className="w-16 h-16" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Spending Over Time</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            <BarChart3 className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
        <div className="flex gap-3">
          <motion.button
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </motion.button>
          <motion.button
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Download CSV
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderAdminTab = () => (
    <div className="space-y-6">
      {/* Group Settings */}
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Group Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Group Name</label>
            <input
              type="text"
              defaultValue={group.name}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
            />
          </div>
          <div className="flex gap-3">
            <motion.button
              className="px-4 py-2 bg-[#00FF84] text-black font-semibold rounded-lg hover:bg-[#00C97F] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
            <motion.button
              onClick={() => setShowTransferOwnershipModal(true)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Transfer Ownership
            </motion.button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <p className="text-gray-300 mb-4">
          Once you delete a group, there is no going back. Please be certain.
        </p>
        <motion.button
          onClick={() => setShowDeleteGroupModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Group
        </motion.button>
      </div>

      {/* Activity Logs */}
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {expenses.slice(0, 3).map((expense, index) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <span className="text-white font-medium">Expense added</span>
                <span className="text-gray-400 ml-2">by {expense.paidBy}</span>
                <p className="text-sm text-gray-500">{expense.title} - ₹{expense.amount.toLocaleString()}</p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(expense.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center">
              <motion.button
                onClick={() => navigate('/groups')}
                className="flex items-center text-gray-300 hover:text-[#00FF84] transition-colors mr-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Groups
              </motion.button>
              <div>
                <h1 className="text-xl font-bold">{group.name}</h1>
                <div className="flex items-center text-sm">
                  {group.balance > 0 ? (
                    <span className="text-[#00FF84]">You're owed ₹{Math.abs(group.balance)}</span>
                  ) : group.balance < 0 ? (
                    <span className="text-red-400">You owe ₹{Math.abs(group.balance)}</span>
                  ) : (
                    <span className="text-gray-400">All settled up</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-[#00FF84] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF84] rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold">
                U
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#00FF84] text-[#00FF84]'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'expenses' && renderExpensesTab()}
            {activeTab === 'members' && renderMembersTab()}
            {activeTab === 'summary' && renderSummaryTab()}
            {activeTab === 'admin' && renderAdminTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AddExpenseModal 
        isOpen={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        groupMembers={group.members}
        onSubmit={handleAddExpense}
      />
      
      <EditExpenseModal 
        isOpen={showEditExpenseModal}
        onClose={() => {
          setShowEditExpenseModal(false);
          setSelectedExpense(null);
        }}
        expense={selectedExpense}
        groupMembers={group.members}
        onSubmit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />
      
      <ExpenseDetailModal 
        isOpen={showExpenseDetailModal}
        onClose={() => {
          setShowExpenseDetailModal(false);
          setSelectedExpense(null);
        }}
        expense={selectedExpense}
      />
      
      <SettleUpModal 
        isOpen={showSettleUpModal}
        onClose={() => setShowSettleUpModal(false)}
        groupMembers={group.members}
      />
      
      <InviteMemberModal 
        isOpen={showInviteMemberModal}
        onClose={() => setShowInviteMemberModal(false)}
      />
      
      <KickMemberModal 
        isOpen={showKickMemberModal}
        onClose={() => setShowKickMemberModal(false)}
        member={selectedMember}
      />
      
      <TransferOwnershipModal 
        isOpen={showTransferOwnershipModal}
        onClose={() => setShowTransferOwnershipModal(false)}
        groupMembers={group.members.filter(m => m.role !== 'Owner')}
      />
      
      <DeleteGroupModal 
        isOpen={showDeleteGroupModal}
        onClose={() => setShowDeleteGroupModal(false)}
        groupName={group.name}
        onConfirm={() => navigate('/groups')}
      />
    </div>
  );
};

export default GroupOverview;