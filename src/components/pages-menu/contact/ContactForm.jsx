// const ContactForm = () => {

//   return (
//     <form>
//       <div className="row">
//         <div className="form-group col-lg-12 col-md-12 col-sm-12">
//           <div className="response"></div>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-6 col-md-12 col-sm-12 form-group">
//           <label>Your Name</label>
//           <input
//             type="text"
//             name="username"
//             className="username"
//             placeholder="Your Name*"
//             required
//           />
//         </div>
//         {/* End .col */}

//         <div className="col-lg-6 col-md-12 col-sm-12 form-group">
//           <label>Your Email</label>
//           <input
//             type="email"
//             name="email"
//             className="email"
//             placeholder="Your Email*"
//             required
//           />
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <label>Subject</label>
//           <input
//             type="text"
//             name="subject"
//             className="subject"
//             placeholder="Subject *"
//             required
//           />
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <label>Your Message</label>
//           <textarea
//             name="message"
//             placeholder="Write your message..."
//             required=""
//           ></textarea>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <button
//             className="theme-btn btn-style-one"
//             type="submit"
//             id="submit"
//             name="submit-form"
//           >
//             Send Massage
//           </button>
//         </div>
//         {/* End .col */}
//       </div>
//     </form>
//   );
// };

// export default ContactForm;


import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { usePostContactCreate } from "@/queries/conact.query"; // مسیر خود را تنظیم کنید

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { mutate } = usePostContactCreate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });

    mutate(data, {
      onSuccess: () => {
        message.success("Your message has been sent successfully!");
        setFormData({
          name: "",
          subject: "",
          email: "",
          phone: "",
          message: "",
        });
      },
      onError: () => {
        message.error("Failed to send message. Please try again.");
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6 col-md-12 col-sm-12 form-group">
        <label>Your Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name*"
          required
        />
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12 form-group">
        <label>Your Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email*"
          required
        />
      </div>

      <div className="col-lg-6 col-md-12 col-sm-12 form-group">
        <label>Your Phone</label>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
      </div>

      <div className="col-lg-6 col-md-12 col-sm-12 form-group">
        <label>Subject</label>
        <Input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject*"
          required
        />
      </div>

      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
        <label>Your Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          required
          className="w-100"
        />
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
        <Button  style={{ width: "100%", height: "50px" }}  type="primary" htmlType="submit" loading={loading}>
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
