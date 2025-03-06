import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { getCareerData } from "@/helpers/fetchFromDirectus";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import moment from "moment";
import React from "react";
import {
  FaBriefcase,
  FaUsers,
  FaMapMarkerAlt,
  FaUserTie,
  FaGraduationCap,
  FaTransgender,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaGift,
} from "react-icons/fa";
interface PageProps {
  params: Promise<{
    permalink: string;
    career: string;
  }>;
}
export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("careers", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug"],
      })
    );

    const allParams =
      (
        result as {
          slug: string;
        }[]
      ).map((item) => ({
        career: item.slug,
        permalink: "career",
      })) || [];

    return allParams;
  } catch (error) {
    console.error("Error fetching career:", error);
    throw new Error("Error fetching Career");
  }
};

const page = async ({ params }: PageProps) => {
  const { career } = await params;

  const careerData = await getCareerData(career);

  const jobOverview = [
    {
      label: "Employment Type",
      value: careerData.job_type,
      icon: <FaBriefcase />,
    },
    { label: "No. of Vacancies", value: careerData.vacancy, icon: <FaUsers /> },
    { label: "Location", value: careerData.location, icon: <FaMapMarkerAlt /> },
    {
      label: "Experience Required",
      value: `${careerData.experience} years`,
      icon: <FaUserTie />,
    },
    {
      label: "Educational Qualification",
      value: careerData.edu_qualification,
      icon: <FaGraduationCap />,
    },
    {
      label: "Gender",
      value: careerData.gender === "both" ? "Male / Female" : careerData.gender,
      icon: <FaTransgender />,
    },
    {
      label: "Working Days",
      value: careerData.working_days,
      icon: <FaCalendarAlt />,
    },
    { label: "Office Hour", value: careerData.office_hour, icon: <FaClock /> },
    { label: "Salary", value: careerData.salary, icon: <FaMoneyBillWave /> },
    { label: "Benefits", value: careerData.benefits, icon: <FaGift /> },
  ];

  return (
    <PaddingContainer className=" mx-auto md:p-6">
      {/* Job Title and Publish Date */}
      <div className="md:text-center my-10 space-y-2">
        <h1 className="text-3xl font-bold">{careerData.position}</h1>
        <p className="text-gray-500">
          <span className="font-bold">Published:</span>{" "}
          {moment(careerData.date_updated).format("MMM DD, YYYY")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 my-10">
        {/* Brief Description */}
        <div className="md:col-span-2 mt-6  md:p-6 rounded-lg ">
          <PostBody body={careerData.body} />
        </div>

        {/* Job Overview - Sidebar */}
        <div className="mt-6 w-full relative">
          <div>
            <div className=" shadow-md p-6 rounded-lg mb-5 border-2 border-primary ">
              <h2 className="text-2xl font-bold mb-4">Job Overview</h2>
              <ul className="space-y-4 text-lg text-gray-700">
                {jobOverview.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="bg-primary size-12 text-white p-3 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p className="flex flex-col">
                      <span className="font-semibold">{item.label}</span>
                      <span>{item.value}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Section */}
            <div className="shadow-md p-6 rounded-lg mb-5 border-2 border-primary ">
              <h2 className="text-xl my-2 font-bold mb-4">
                {` Application Deadline: 
              ${moment(careerData.deadline).format("MMM DD, YYYY")}`}
              </h2>

              <CustomButton
                href={`/career/form?slug=${careerData.slug}`}
                className="my-2"
              >
                Apply Now
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default page;
