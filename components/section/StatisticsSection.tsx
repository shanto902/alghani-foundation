"use client";
import CountUp from "react-countup";

const StatisticsSection = () => {
  return (
    <section className="py-5">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Funds Raised */}
          <div className="">
            <h3 className="text-2xl font-bold text-primary mb-2 border-b-2 border-primary pb-2 w-[fit-content] text-center mx-auto">
              <CountUp end={1250000} duration={5} prefix="$" separator="," />
            </h3>
            <p className="text-gray-600">Total Funds Raised</p>
          </div>

          {/* Projects Funded */}
          <div className="">
            <h3 className="text-2xl font-bold text-primary mb-2 border-b-2 border-primary pb-2 w-[fit-content] text-center mx-auto">
              <CountUp end={350} duration={5} suffix="+" />
            </h3>
            <p className="text-gray-600">Projects Funded</p>
          </div>

          {/* Donors Worldwide */}
          <div className="">
            <h3 className="text-2xl font-bold text-primary mb-2 border-b-2 border-primary pb-2 w-[fit-content] text-center mx-auto">
              <CountUp end={12000} duration={5} suffix="+" />
            </h3>
            <p className="text-gray-600">Donors Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
