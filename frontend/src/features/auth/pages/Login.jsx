import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
	const [form, setForm] = useState({ email: '', password: '' })

	function handleChange(e) {
		const { name, value } = e.target
		setForm((s) => ({ ...s, [name]: value }))
	}

	function handleSubmit(e) {
		e.preventDefault()
		// Replace with real login call
		console.log('Login:', form)
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-6" style={{
			background: `radial-gradient(1200px 600px at 10% 10%, rgba(78,153,163,0.12), transparent 10%), 
						 radial-gradient(900px 400px at 90% 90%, rgba(0,0,0,0.18), transparent 20%), 
						 #0b0f12`
		}}>
			<div className="w-full max-w-md bg-linear-to-b from-white/2 to-white/1 rounded-lg p-7 shadow-2xl border border-primary/10">
				<h2 className="text-xl font-bold text-primary mb-3">Welcome back</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
							placeholder="Your password"
						/>
					</label>

					<button type="submit" className="auth-button">Login</button>
				</form>

				<p className="auth-footer">
					Don’t have an account? <Link to="/register">Register</Link>
				</p>
			</div>
		</div>
	)
}

