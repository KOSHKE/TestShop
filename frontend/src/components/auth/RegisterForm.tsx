'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';
import { api } from '@/lib/api';
import Link from 'next/link';

/**
 * RegisterForm Component
 * Handles user registration with validation
 */
export function RegisterForm() {
  const [serverError, setServerError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError('');
      const { confirmPassword, agreeToTerms, ...registerData } = data;
      const response = await api.auth.register(registerData);
      
      // Store token
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      // Redirect to home
      window.location.href = '/';
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Show user-friendly error message based on status code
      if (error.status === 409) {
        setServerError('Email already exists');
      } else if (error.status === 400) {
        setServerError('Invalid registration data');
      } else if (error.status === 429) {
        setServerError('Too many attempts. Please try again later');
      } else if (error.message?.includes('Network') || error.message?.includes('fetch')) {
        setServerError('Network error. Please check your connection');
      } else if (error.message) {
        setServerError(error.message);
      } else {
        setServerError('Registration failed. Please try again');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Server Error */}
      {serverError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Full Name
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Password
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms checkbox */}
      <div>
        <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            {...register('agreeToTerms')}
            type="checkbox"
            className="mt-1 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
          />
          <span>
            I agree to the{' '}
            <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}

