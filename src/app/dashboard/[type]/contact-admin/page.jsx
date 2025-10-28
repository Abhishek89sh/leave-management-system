"use client";
import React, { useState } from "react";
import styles from "./contactAdmin.module.css";

export default function ContactAdmin() {
  const [form, setForm] = useState({ name: "", email: "", issue: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted!");
  };

  const admins = [
    {
      role: "Project Manager, Developer",
      name: "Abhishek Sharma",
      img: "/assets/images/developer.jpeg",
      email: "dev@example.com",
      phone: "+91 98765 43210",
    },
    {
      role: "Designer",
      name: "Priya Verma",
      img: "/images/designer.jpg",
      email: "design@example.com",
      phone: "+91 91234 56789",
    },
    {
      role: "Tester",
      name: "Rahul Mehta",
      img: "/images/tester.jpg",
      email: "qa@example.com",
      phone: "+91 99887 66554",
    },
  ];

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>
        <input
          type="text"
          name="name"
          placeholder="Objective"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="issue"
          placeholder="Describe your problem..."
          value={form.issue}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <h3 className={styles.title}>Or Contact</h3>
      <div className={styles.adminSection}>
        {admins.map((admin, index) => (
          <div key={index} className={styles.card}>
            <img src={admin.img} alt={admin.role} className={styles.image} />
            <h3>{admin.role}</h3>
            <p className={styles.name}>{admin.name}</p>
            <p>Email: <span>{admin.email}</span></p>
            <p>Phone: <span>{admin.phone}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
