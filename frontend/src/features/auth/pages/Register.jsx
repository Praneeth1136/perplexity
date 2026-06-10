import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Replace with real register call
    console.log('Register:', form)
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      background: `radial-gradient(1200px 600px at 10% 10%, rgba(78,153,163,0.12), transparent 10%), 
                   radial-gradient(900px 400px at 90% 90%, rgba(0,0,0,0.18), transparent 20%), 
                   #0b0f12`
    }}>
      <div className="w-full max-w-md bg-linear-to-b from-white/2 to-white/1 rounded-lg p-7 shadow-2xl border border-primary/10">
        <h2 className="text-xl font-bold text-primary mb-3">Create account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col text-xs text-muted">
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="mt-2 px-3 py-2 rounded-lg border border-white/4 bg-white/2 text-cyan-subtle placeholder-white/30 outline-none focus:border-primary/30"
              placeholder="Your username"
            />
          </label>

          <label className="flex flex-col text-xs text-muted">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 px-3 py-2 rounded-lg border border-white/4 bg-white/2 text-cyan-subtle placeholder-white/30 outline-none focus:border-primary/30"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col text-xs text-muted">
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 px-3 py-2 rounded-lg border border-white/4 bg-white/2 text-cyan-subtle placeholder-white/30 outline-none focus:border-primary/30"
              placeholder="Create a password"
            />
          </label>

          <button type="submit" className="mt-1 px-3 py-2 rounded-lg bg-linear-to-r from-primary to-[#2b7e7f] text-white font-semibold hover:opacity-90 transition">Register</button>
        </form>

        <p className="mt-4 text-xs text-muted">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link></p>
		</div>
        </div>
    </>
	)
}

