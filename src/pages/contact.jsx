import { useState } from 'react'
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-bark-300 dark:text-cream-100 mb-3">Message Sent Successfully</h2>
        <p className="text-bark-50/60 dark:text-cream-100/40 mb-8">
          Thank you, {form.name}. We will get back to you at {form.email} shortly.
        </p>
        <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }} className="btn-primary">
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">Questions, feedback, or custom Panchangam requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 联系信息 */}
        <div className="space-y-6">
          {[
            { icon: Mail, title: 'Email', value: 'info@panchangam.app', desc: 'We reply within 24 hours' },
            { icon: Phone, title: 'Phone', value: '+91 98765 43210', desc: 'Mon-Sat, 9 AM - 6 PM IST' },
            { icon: MapPin, title: 'Location', value: 'Chennai, Tamil Nadu', desc: 'India' },
          ].map(item => (
            <div key={item.title} className="card p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/20 flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-saffron-500" />
              </div>
              <div>
                <p className="font-semibold text-bark-300 dark:text-cream-100">{item.title}</p>
                <p className="text-sm text-saffron-600 dark:text-saffron-400 mt-0.5">{item.value}</p>
                <p className="text-xs text-bark-50/50 dark:text-cream-100/30 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="card p-5 bg-gradient-to-br from-saffron-50 to-cream-200 dark:from-saffron-900/20 dark:to-bark-200">
            <h3 className="font-bold text-bark-300 dark:text-cream-100 mb-2">Custom Panchangam</h3>
            <p className="text-sm text-bark-50/60 dark:text-cream-100/40 leading-relaxed">
              Need a Panchangam for a specific location, event, or date range? We provide customized Panchangam services for weddings, Gruhapravesam, and other ceremonies.
            </p>
          </div>
        </div>

        {/* 表单 */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'ring-2 ring-red-400 border-red-400' : ''}`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'ring-2 ring-red-400 border-red-400' : ''}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={e => handleChange('subject', e.target.value)}
                className={`input-field ${errors.subject ? 'ring-2 ring-red-400 border-red-400' : ''}`}
                placeholder="What is this about?"
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-bark-300 dark:text-cream-100 mb-1.5">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                className={`input-field resize-none ${errors.message ? 'ring-2 ring-red-400 border-red-400' : ''}`}
                placeholder="Tell us more about your inquiry..."
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-primary inline-flex items-center gap-2">
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}