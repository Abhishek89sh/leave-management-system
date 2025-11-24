import Link from "next/link";
import Button from "../../components/userNav/btn/Button";
import styles from "./Home.module.css";
import ContactForm from "../../components/contactForm/ContactForm";

export default function Home() {
  const adminsInfo = [
    {
      name: "Abhishek", 
      role: "Developer of HoliDesk", 
      contact: "+91 8580468441", 
      email: "abhisheksharma73341@gmail.com",
      img: "/assets/images/developer.jpeg"
    },
    {
      name: "Abhinay Bhardwaj",
      role: "Tester, Database Designer",
      contact: "+91 9805369286",
      email: "abhinaybhardwaj676@gmail.com",
      img: "/assets/images/abhinay.jpg"
    },
    {
      name: "Monika Chauhan",
      role: "UI Designer",
      contact: "+91 8350982008",
      email: "monikachauhan6@gmail.com",
      img: "/assets/images/monika.jpg"
    },
  ]

  return (
    <main className={styles.main}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Smart Leave <span>Management System</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Fast, automated & paperless leave request workflow for faculty and staff.
          </p>

          <div className={styles.heroButtons}>
            <Button styles={styles.primaryBtn} />
            <Link href="#contact" className={styles.secondaryBtn}>Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>Features</h2>

        <div className={styles.featuresGrid}>
          <FeatureCard title="Easy Leave Request" desc="Submit leave applications in seconds." />
          <FeatureCard title="Auto Approval Flow" desc="Application → Adjusment's → Users's Head → Approved" />
          <FeatureCard title="Live Dashboard" desc="Track status, balances & analytics." />
          <FeatureCard title="Notifications" desc="Get instant alerts & updates." />
          <FeatureCard title="Role-Based Panels" desc="Separate dashboards for each role." />
          <FeatureCard title="Adjustment Management" desc="Organize class/work adjustments easily." />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className={styles.how}>
        <h2 className={styles.sectionTitle}>How It Works</h2>

        <div className={styles.stepsGrid}>
          <Step num="1" text="User submits leave request" />
          <Step num="2" text="Selected faculties recieves Adjustment Request" />
          <Step num="3" text="User's Head Accepts/Rejects the leave request" />
          <Step num="4" text="Leave Approved" />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.contact}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>

        {/* ADMIN TEAM LIST */}
        <div className={styles.adminGrid}>
          {adminsInfo.map((item, index)=>(
            <AdminCard
              key={index}
              img={item.img}
              name={item.name}
              role={item.role}
              phone={item.contact}
              email={item.email}
            />
          ))}
        </div>

        <ContactForm />
      </section>


      {/* FOOTER */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} HoliDesk. All rights reserved.
      </footer>
    </main>
  );
}

// Components

function FeatureCard({ title, desc }) {
  return (
    <div className={styles.featureCard}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </div>
  );
}

function AdminCard({ img, name, role, phone = "", email }) {
  return (
    <div className={styles.adminCard}>
      <img src={img} alt={name} className={styles.adminImg} />
      <h3 className={styles.adminName}>{name}</h3>
      <p className={styles.adminRole}>{role}</p>
      {phone !== "" && <p className={styles.adminContact}>📞 {phone}</p>}
      <p className={styles.adminContact}>✉️ {email}</p>
    </div>
  );
}


function Step({ num, text }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepNumber}>{num}</div>
      <p className={styles.stepText}>{text}</p>
    </div>
  );
}
