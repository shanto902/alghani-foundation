import Image from "next/image";
import CustomButton from "../common/CustomButton";

const SponsorSection = () => {
  return (
    <section className="my-10 flex flex-col md:flex-row items-center  overflow-hidden p-6">
      {/* Left side - Image */}
      <div className="md:w-1/2  w-full relative">
        <Image
          src="https://images.pexels.com/photos/1427430/pexels-photo-1427430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Sponsor a child"
          width={600}
          height={400}
          className="w-full object-top h-[500px] object-cover rounded-xl"
        />
      </div>

      {/* Right side - Content */}
      <div className="md:w-1/2 w-full p-6">
        <h2 className="text-2xl font-bold mb-4">SPONSOR A CHILD PROGRAM</h2>
        <p className="text-gray-700 mb-4">
          We believe in the potential of every child and that education is the
          key to unlocking that potential. Yet, due to financial constraints,
          for countless children, education is an unattainable luxury. For the
          past 17 years, we have been working to change this reality!
        </p>
        <p className="text-gray-700 mb-4">
          Through our Sponsor A Child Program, we have ensured quality education
          for over 4500 children from underserved communities.
        </p>
        <p className="text-gray-700 mb-6">
          You can also join the initiative. With just <strong>BDT 2,500</strong>{" "}
          per month, you can give children in need access to educational
          opportunities and support their journey towards a brighter future.
          Help change a life today!
        </p>
        <CustomButton
          className="bg-primary hover:bg-white text-white hover:text-primary"
          href="/donate"
        >
          Sponsor A Child
        </CustomButton>
      </div>
    </section>
  );
};

export default SponsorSection;
