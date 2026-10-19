"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OwnerLoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to create admin session.");
      }

      setLoginData({
        email: "",
        password: "",
      });

      window.location.href = "/owner/member-update";
    } catch (error) {
      console.error("Owner login failed:", error);

      setLoginData({
        email: "",
        password: "",
      });

      setLoginError("Invalid or unauthorized login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-20 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 md:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Owner Login</h1>

          <p className="mt-3 text-muted-foreground">
            Sign in to access the Member of the Month admin page.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="ownerEmail"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>

            <Input
              id="ownerEmail"
              type="email"
              placeholder="owner@example.com"
              autoComplete="off"
              required
              className="bg-muted border-border rounded-xl h-12"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor="ownerPassword"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>

            <Input
              id="ownerPassword"
              type="password"
              placeholder="Enter password"
              autoComplete="new-password"
              required
              className="bg-muted border-border rounded-xl h-12"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </div>

          {loginError && (
            <p className="text-sm text-red-500 text-center">{loginError}</p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full rounded-full h-14 text-lg font-semibold"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
}