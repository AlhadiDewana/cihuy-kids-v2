import React from 'react';
import { LogOut } from 'lucide-react';

const UserMenu = ({ user, onLogout, onProfileClick, onSettingsClick }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
      {/* User info */}
      <div className="px-4 py-2 border-b">
        <p className="text-sm font-semibold text-gray-700">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>

      {/* Menu items */}
      <div className="mt-2">
        <button
          onClick={onProfileClick}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Profile
        </button>

        <button
          onClick={onSettingsClick}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Settings
        </button>

        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;