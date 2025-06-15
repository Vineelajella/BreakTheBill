import React from 'react';

const AuthLayout = ({ welcomeContent, formContent }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Welcome/Logo */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-dark-800 to-dark-900 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full bg-primary-500"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FF84' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-md">
          {welcomeContent}
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary-500 p-3 rounded-2xl animate-float">
                <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white ml-3">Break The Bill</h1>
            </div>
          </div>

          {formContent}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
