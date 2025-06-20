import { Mail, Phone, MapPin } from "lucide-react";

const contactItems = [
  {
    icon: <MapPin size={20} />,
    title: "Address",
    lines: ["123 Hotel Street, City Center", "New York, NY 10001"],
  },
  {
    icon: <Phone size={20} />,
    title: "Phone",
    lines: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
  },
  {
    icon: <Mail size={20} />,
    title: "Email",
    lines: ["info@luxuryhotel.com", "reservations@luxuryhotel.com"],
  },
];

const ContactInfoCard = () => (
  <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
    <h2 className="heading-three mb-6 text-gray-900">Contact Information</h2>
    <div className="space-y-6">
      {contactItems.map((item, index) => (
        <div className="flex items-start gap-4" key={index}>
          <div className="text-green-600 mt-1">{item.icon}</div>
          <div className="text-sm space-y-1">
            <p className="font-semibold text-gray-800">{item.title}</p>
            {item.lines.map((line, idx) => (
              <p className="text-gray-600" key={idx}>{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ContactInfoCard;
