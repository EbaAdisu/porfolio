"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

const AdminLoginPage = () => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    setIsLoading(false);

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      toast.error("Authentication Failed", {
        description: "The provided token is incorrect.",
      });
    }
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-card-foreground text-sm font-bold mb-2" htmlFor="token">
              Access Token
            </label>
            <Input
              id="token"
              type="password"
              placeholder="******************"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;