import Spinner from "@/components/common/Spinner";
import CareerForm from "@/components/form/CareerForm";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <CareerForm />
      </Suspense>
    </div>
  );
};

export default page;
