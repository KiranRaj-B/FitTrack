import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  HelpCircle,
  AlertCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const faqs = [
  {
    question: 'How do I sync my fitness device?',
    answer: 'Go to Profile > Connected Devices and follow the instructions to pair your device. We support most major fitness trackers and smartwatches.',
  },
  {
    question: 'Can I manually add workouts?',
    answer: 'Yes! Click the "Add Activity" button on the Activity page to manually log your workouts, including type, duration, and other metrics.',
  },
  {
    question: 'How are my calories calculated?',
    answer: 'Calorie calculations are based on your activity level, heart rate data (if available), and personal metrics like age, weight, and height.',
  },
  {
    question: 'How do I set custom goals?',
    answer: 'Visit the Goals page and click "Add New Goal". You can set targets for steps, calories, weight, and active minutes.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium">{question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 pl-8 pr-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'support',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { name, email, subject, message } = formData;
  
    const whatsappNumber = "+919611929845"; 
    const text = `New Contact Form Submission%0A
  Name: ${name}%0A
  Email: ${email}%0A
  Subject: ${subject}%0A
  Message: ${message}`;
  
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;
  
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="text-gray-500">Get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <a href="mailto:support@fittrack.com" className="text-sm text-blue-600">
                  support@kiranrajbadakambi.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <a href="tel:+1234567890" className="text-sm text-blue-600">
                  +91 9611929845
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-500">
                  Available 24/7
                </p>
              </div>
            </div>
            <button className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <a
                href="https://wa.me/+919611929845?text=Hey%20Kiran,%20I%20have%20a%20doubt%20on%20my%20fitness,%20can%20you%20be%20available%20in%20the%20office%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-full"
              >
                Start Chat
              </a>
            </button> 
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="billing">Billing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2 border rounded-lg h-32 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* Support Resources */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Help Center</h3>
          </div>
          <p className="mb-4">Find detailed guides and tutorials in our help center.</p>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Visit Help Center
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6" />
            <h3 className="text-lg font-semibold">System Status</h3>
          </div>
          <p className="mb-4">Check our system status and any ongoing issues.</p>
          <button className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors">
            View Status
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Community</h3>
          </div>
          <p className="mb-4">Join our community forum to connect with other users.</p>
          <button className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;