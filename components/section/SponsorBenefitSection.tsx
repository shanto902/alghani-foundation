import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaTshirt,
  FaBook,
  FaBackspace,
  FaFootballBall,
  FaMedkit,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GiEggClutch } from "react-icons/gi";

const SponsorBenefitSection = () => {
  const benefits = [
    { icon: <FaGraduationCap size={40} />, label: "Quality Education" },
    { icon: <FaChalkboardTeacher size={40} />, label: "Teacher" },
    { icon: <FaTshirt size={40} />, label: "Uniform" },
    { icon: <FaBook size={40} />, label: "Education Materials" },
    { icon: <FaBagShopping size={40} />, label: "School Bag" },
    { icon: <FaFootballBall size={40} />, label: "Co-curricular Activities" },
    { icon: <FaMedkit size={40} />, label: "Medical Support" },
    { icon: <GiEggClutch size={40} />, label: "Nutritious Food" },
  ];

  return (
    <section className="bg-primary text-white text-center py-10 px-6">
      <h2 className="text-3xl font-bold text-white">2500 BDT</h2>
      <p className="text-lg text-gray-300 mt-2 mb-6">
        Your monthly contribution helps provide life-changing, essential needs
        to your sponsored child and their community.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {benefits.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-white">{item.icon}</div>
            <p className="text-sm mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsorBenefitSection;
