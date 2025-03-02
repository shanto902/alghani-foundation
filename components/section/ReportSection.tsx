import React from "react";

const ReportSection = () => {
  const annualReports = [
    { year: "2022-23", title: "Annual Report 2022-23" },
    { year: "2021-22", title: "Annual Report 2021-22" },
    { year: "2020-21", title: "Annual Report 2020-21" },
  ];

  const auditorReports = [
    { year: "2022-23", title: "Auditor's Report 2022-23" },
    { year: "2021-22", title: "Auditor's Report 2021-22" },
    { year: "2020-21", title: "Auditor's Report 2020-21" },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Annual Reports
          </h2>
          <div className="space-y-4">
            {annualReports.map((report, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800">
                  {report.title}
                </h3>
                <p className="text-gray-600">Year: {report.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Auditor&apos;s Reports
          </h2>
          <div className="space-y-4">
            {auditorReports.map((report, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800">
                  {report.title}
                </h3>
                <p className="text-gray-600">Year: {report.year}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportSection;
