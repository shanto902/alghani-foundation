"use client";
import { TPartnerBlock } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { motion, AnimatePresence } from "framer-motion";
import { FaX } from "react-icons/fa6";
import PostBody from "../post-body/PostBody";
import Link from "next/link";

const PartnerBlock = ({ block }: { block: TPartnerBlock }) => {
  const [selectedPartner, setSelectedPartner] = useState<
    null | (typeof block.item.partners)[0]
  >(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = (partner: (typeof block.item.partners)[0]) => {
    if (selectedPartner?.partner_id.id === partner.partner_id.id) {
      setSelectedPartner(null);
      setIsPaused(false);
    } else {
      setSelectedPartner(partner);
      setIsPaused(true);
    }
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isPaused ? (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Marquee
                speed={50}
                pauseOnHover={true}
                gradient={true}
                autoFill={true}
              >
                {block?.item?.partners?.map((partner) => (
                  <div
                    key={partner.partner_id.id}
                    className="mx-8 cursor-pointer"
                  >
                    <div
                      onClick={() => handleClick(partner)}
                      className="relative w-24 h-24 mx-auto"
                      title={partner.partner_id.name}
                    >
                      <Image
                        className="object-cover aspect-square opacity-60 hover:opacity-100 transition-opacity duration-300"
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${partner.partner_id.logo}`}
                        alt={partner.partner_id.name}
                        height={96}
                        width={96}
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
            </motion.div>
          ) : (
            <motion.div
              key="static-logos"
              className="flex justify-center flex-wrap gap-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {block?.item?.partners?.map((partner) => (
                <div key={partner.partner_id.id} className="cursor-pointer">
                  <div
                    onClick={() => handleClick(partner)}
                    className={`relative w-24 h-24 mx-auto rounded-lg p-1 transition-all duration-300 ${
                      selectedPartner?.partner_id.id === partner.partner_id.id
                        ? "bg-primary"
                        : ""
                    }`}
                    title={partner.partner_id.name}
                  >
                    <Image
                      className={` ${
                        selectedPartner?.partner_id.id === partner.partner_id.id
                          ? "opacity-100 shadow-xl"
                          : "opacity-60"
                      } object-cover  aspect-square rounded-lg  hover:opacity-100 transition-all shadow-none duration-300`}
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${partner.partner_id.logo}`}
                      alt={partner.partner_id.name}
                      height={96}
                      width={96}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPartner && (
            <motion.div
              key="desc-box"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-8 bg-primary text-white p-6 rounded-lg shadow max-w-3xl mx-auto"
            >
              <div className=" text-left flex justify-between items-center mb-3">
                <Link
                  target="_blank"
                  href={selectedPartner.partner_id.link}
                  className="text-lg hover:underline font-semibold"
                >
                  {selectedPartner.partner_id.name}
                </Link>
                <button
                  onClick={() => {
                    setSelectedPartner(null);
                    setIsPaused(false);
                  }}
                  className="text-sm bg-white text-primary p-2 rounded-lg font-bold"
                >
                  <FaX />
                </button>
              </div>
              <hr className="bg-white h-px" />
              {selectedPartner.partner_id.description && (
                <div className="text-left mt-2">
                  <PostBody
                    body={selectedPartner.partner_id.description}
                  ></PostBody>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PartnerBlock;
