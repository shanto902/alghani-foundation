import { TReportBlock } from "@/interfaces";
import React from "react";
import CustomButton from "../common/CustomButton";

const ReportBlock = ({ block }: { block: TReportBlock }) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {block.item.section_name}
          </h2>
          <div className="space-y-4">
            {block.item.reports.map((report, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {report.reports_id.title}
                  </h3>
                  <p className="text-textSecondary">
                    <span className="font-bold">Year:</span>{" "}
                    {report.reports_id.year}
                  </p>
                </div>
                <CustomButton
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_ASSETS_URL}${report.reports_id.pdf}`}
                >
                  {" "}
                  Download
                </CustomButton>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportBlock;
