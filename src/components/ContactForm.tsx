import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Using Formspree - replace YOUR_FORM_ID with actual form ID after setup
      const response = await fetch("https://formspree.io/f/xpwzjgon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl glass-input";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder="Your name"
          style={{ color: 'var(--text-primary)' }}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder="your@email.com"
          style={{ color: 'var(--text-primary)' }}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputClasses} resize-none`}
          placeholder="Your message..."
          style={{ color: 'var(--text-primary)' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 px-4 glass-button font-medium rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ color: 'var(--accent)' }}
      >
        {status === "loading" ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} />
            Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <div
          className="p-3 rounded-xl glass-panel text-center"
          role="alert"
          style={{ color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.3)' }}
        >
          Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div
          className="p-3 rounded-xl glass-panel text-center"
          role="alert"
          style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
        >
          Something went wrong. Please try again or email me directly.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
