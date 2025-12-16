"use client";

import { useState } from "react";
import { createUserSchema } from "@/schemas/user.schema";

type FormState = {
  name: string;
  email: string;
  password: string;
  age: string;
};

type ErrorState = {
  [key: string]: string;
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = createUserSchema.safeParse({
      ...form,
      age: Number(form.age),
    });

    if (!parsed.success) {
      const fieldErrors: ErrorState = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await res.json();

    if (!res.ok) {
      const backendErrors: ErrorState = {};
      data.errors?.forEach((err: any) => {
        backendErrors[err.field] = err.message;
      });
      setErrors(backendErrors);
      return;
    }

    alert("🎉 Registration Successful!");
    setForm({ name: "", email: "", password: "", age: "" });
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit} autoComplete="off">
        {/* Header Section */}
        <div style={styles.header}>
          <h2 style={styles.title}>ZOD VALIDATION PROJECT</h2>
          <h3 style={styles.subtitle}>Register Your Account</h3>
          <p style={styles.description}>
            Fill in your details below to get started
          </p>
        </div>

        {/* Name Field */}
        <div style={styles.field}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoComplete="off"
            style={styles.input}
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div style={styles.field}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="new-email"
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div style={styles.field}>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="new-password"
            style={styles.input}
          />
          {errors.password && (
            <span style={styles.error}>{errors.password}</span>
          )}
        </div>

        {/* Age Field */}
        <div style={styles.field}>
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            style={styles.input}
          />
          {errors.age && <span style={styles.error}>{errors.age}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Register Now
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    width: "100%",
    maxWidth: "450px",
    borderRadius: "12px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    fontSize: "1.8rem",
    color: "#111",
    marginBottom: "5px",
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.3rem",
    color: "#222",
    marginBottom: "8px",
    textAlign: "center",
  },
  description: {
    fontSize: "0.95rem",
    color: "#555",
    textAlign: "center",
    maxWidth: "320px",
    lineHeight: "1.4",
  },
  field: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border 0.3s, box-shadow 0.3s",
    outline: "none",
  },
  error: {
    color: "#d00000",
    fontSize: "12px",
    marginTop: "4px",
    animation: "fadeIn 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Optional: input focus and button hover effects
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      (input as HTMLInputElement).style.borderColor = "#111";
      (input as HTMLInputElement).style.boxShadow = "0 0 5px rgba(0,0,0,0.1)";
    });
    input.addEventListener("blur", () => {
      (input as HTMLInputElement).style.borderColor = "#ccc";
      (input as HTMLInputElement).style.boxShadow = "none";
    });
  });

  const button = document.querySelector("button");
  if (button) {
    button.addEventListener("mouseover", () => {
      (button as HTMLButtonElement).style.backgroundColor = "#333";
    });
    button.addEventListener("mouseout", () => {
      (button as HTMLButtonElement).style.backgroundColor = "#111";
    });
  }
});
