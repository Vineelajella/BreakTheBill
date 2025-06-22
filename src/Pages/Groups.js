import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  UserPlus,
  Search,
  Filter,
  Crown,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  LogOut,
  Bell,
  Settings,
  Home,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateGroupModal from '../Components/CreateGroupModal';
import JoinGroupModal from '../Components/JoinGroupModal';
import LeaveGroupModal from '../Components/LeaveGroupModal';
import { toast } from 'react-toastify';

const Groups = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Initialize groups from localStorage or use default data
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    if (savedGroups) {
      try {
        return JSON.parse(savedGroups);
      } catch (error) {
        console.error('Error parsing saved groups:', error);
      }
    }

    // Default groups if no saved data
    return [
      {
        id: 1,
        name: "Goa Trip 2025",
        balance: -1250,
        memberCount: 6,
        role: "Owner",
        lastActivity: "2h ago",
        inviteCode: "GOA2025",
        members: [
          { id: 1, name: "You", avatar: "Y", email: "you@example.com", role: "Owner", balance: -1250 },
          { id: 2, name: "Priya", avatar: "P", email: "priya@example.com", role: "Member", balance: 850 },
          { id: 3, name: "Arjun", avatar: "A", email: "arjun@example.com", role: "Member", balance: -320 },
          { id: 4, name: "Sneha", avatar: "S", email: "sneha@example.com", role: "Member", balance: 720 }
        ]
      },
      {
        id: 2,
        name: "Flatmates - Koramangala",
        balance: 850,
        memberCount: 4,
        role: "Member",
        lastActivity: "1d ago",
        inviteCode: "FLAT01",
        members: [
          { id: 1, name: "Rahul", avatar: "R", email: "rahul@example.com", role: "Owner", balance: 0 },
          { id: 2, name: "You", avatar: "Y", email: "you@example.com", role: "Member", balance: 850 },
          { id: 3, name: "Kavya", avatar: "K", email: "kavya@example.com", role: "Member", balance: 0 },
          { id: 4, name: "Dev", avatar: "D", email: "dev@example.com", role: "Member", balance: 0 }
        ]
      },
      {
        id: 3,
        name: "Office Lunch Group",
        balance: -320,
        memberCount: 8,
        role: "Member",
        lastActivity: "3d ago",
        inviteCode: "LUNCH8",
        members: [
          { id: 1, name: "Team Lead", avatar: "T", email: "lead@example.com", role: "Owner", balance: 0 },
          { id: 2, name: "You", avatar: "Y", email: "you@example.com", role: "Member", balance: -320 }
        ]
      }
    ];
  });

  // Save groups to localStorage whenever groups state changes
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'All' || group.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const handleLeaveGroup = (group) => {
    setSelectedGroup(group);
    setShowLeaveModal(true);
  };

  const confirmLeaveGroup = () => {
    const updatedGroups = groups.filter(g => g.id !== selectedGroup.id);
    setGroups(updatedGroups);
    setShowLeaveModal(false);
    setSelectedGroup(null);
    toast.success(`Left ${selectedGroup.name} successfully!`);
  };

  const handleCreateGroup = (newGroup) => {
    const updatedGroups = [newGroup, ...groups];
    setGroups(updatedGroups);

    // Clear filters so new group appears
    setFilterRole('All');
    setSearchTerm('');

    // Close modal and show success message
    setShowCreateModal(false);
    toast.success(`Group "${newGroup.name}" created successfully!`);

    // Navigate to the new group
    setTimeout(() => {
      navigate(`/groups/${newGroup.id}`);
    }, 1000);
  };

  const handleJoinGroup = (inviteCode) => {
    // Mock join group logic - in real app, this would call an API
    const newGroup = {
      id: Date.now(),
      name: `Group ${inviteCode}`,
      balance: 0,
      memberCount: 3,
      role: "Member",
      lastActivity: "now",
      inviteCode: inviteCode,
      members: [
        { id: 1, name: "Group Owner", avatar: "O", email: "owner@example.com", role: "Owner", balance: 0 },
        { id: 2, name: "You", avatar: "Y", email: "you@example.com", role: "Member", balance: 0 }
      ]
    };

    const updatedGroups = [newGroup, ...groups];
    setGroups(updatedGroups);
    setShowJoinModal(false);
    toast.success(`Joined group successfully!`);
  };

  const handleGroupClick = (group) => {
    // Navigate to the specific group using its actual ID
    navigate(`/groups/${group.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-[#00FF84] p-2 rounded-xl">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-xl font-bold ml-3">Break The Bill</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center text-gray-300 hover:text-[#00FF84] transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </button>
              <button className="flex items-center text-[#00FF84] font-medium">
                <Users className="w-4 h-4 mr-2" />
                Groups
              </button>
              <button className="flex items-center text-gray-300 hover:text-[#00FF84] transition-colors">
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
              </button>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-[#00FF84] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF84] rounded-full"></span>
              </button>
              <button className="p-2 text-gray-300 hover:text-[#00FF84] transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Groups</h2>
            <p className="text-gray-400">Manage your expense groups and track balances</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <motion.button
              onClick={() => setShowJoinModal(true)}
              className="flex items-center px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-xl hover:border-[#00FF84] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Join Group
            </motion.button>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </motion.button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Owner">Owner</option>
              <option value="Member">Member</option>
            </select>
          </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-[#00FF84] transition-all duration-300 h-full cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 40px rgba(0, 255, 132, 0.1)",
                      y: -5
                    }}
                    onClick={() => handleGroupClick(group)}
                  >
                    {/* Group Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-[#00FF84] transition-colors">
                          {group.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {group.role === 'Owner' ? (
                              <Crown className="w-4 h-4 text-[#00FF84] mr-1" />
                            ) : (
                              <User className="w-4 h-4 text-gray-400 mr-1" />
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${group.role === 'Owner'
                                ? 'bg-[#00FF84]/20 text-[#00FF84]'
                                : 'bg-gray-700 text-gray-300'
                              }`}>
                              {group.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      {group.role !== 'Owner' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLeaveGroup(group);
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Balance */}
                    <div className="mb-4">
                      <div className="flex items-center">
                        {group.balance > 0 ? (
                          <>
                            <TrendingUp className="w-5 h-5 text-[#00FF84] mr-2" />
                            <span className="text-[#00FF84] font-semibold">
                              You're owed ₹{Math.abs(group.balance)}
                            </span>
                          </>
                        ) : group.balance < 0 ? (
                          <>
                            <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
                            <span className="text-red-400 font-semibold">
                              You owe ₹{Math.abs(group.balance)}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400">All settled up</span>
                        )}
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-3">
                          {(group.members || []).slice(0, 4).map((member, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black text-xs font-bold border-2 border-gray-800"
                            >
                              {member.avatar}
                            </div>
                          ))}

                          {group.memberCount > 4 && (
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 text-xs font-bold border-2 border-gray-800">
                              +{group.memberCount - 4}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-400">
                          {group.memberCount} member{group.memberCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Updated {group.lastActivity}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm || filterRole !== 'All' ? 'No groups found' : "You're not part of any group yet"}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterRole !== 'All'
                ? 'Try adjusting your search or filter criteria'
                : 'Create or join a group to start splitting expenses with friends'
              }
            </p>
            {!searchTerm && filterRole === 'All' && (
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Group
                </motion.button>
                <motion.button
                  onClick={() => setShowJoinModal(true)}
                  className="px-6 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl hover:border-[#00FF84] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Group
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateGroup}
      />

      <JoinGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSubmit={handleJoinGroup}
      />

      <LeaveGroupModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onConfirm={confirmLeaveGroup}
        groupName={selectedGroup?.name}
      />

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="w-14 h-14 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-6 h-6 text-black" />
        </motion.button>
      </div>
    </div>
  );
};

export default Groups;