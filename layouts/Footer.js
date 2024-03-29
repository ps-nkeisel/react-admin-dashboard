import React from "react";

const currentYear = new Date().getFullYear();
const footerLinks = [
  { title: "Blog", href: "https://blog.admin.com" },
  { title: "Help", href: "https://docs.admin.com" },
  {
    title: "Privacy Policy",
    href: "https://docs.admin.com/privacy-and-policy/",
  },
  {
    title: "Terms of Service",
    href: "https://docs.admin.com/privacy-and-policy/",
  },
];

const Footer = props => (
  <footer
    className="footer justify-content-start d-flex"
    {...props}
    style={{ marginTop: "auto", zIndex: 1 }}
  >
    <div className="mr-2">
      <nav className="nav">
        {footerLinks.map(({ title, href }) => (
          <a
            href={href}
            className="nav-link tx-medium"
            target="_blank"
            rel="nofollow"
            key={title}
          >
            {title}
          </a>
        ))}
      </nav>
    </div>
    <div className="d-none d-lg-block">
      <span>
        &copy; {currentYear} Admin {process.env.VERSION}{" "}
      </span>
    </div>
  </footer>
);

export default Footer;
