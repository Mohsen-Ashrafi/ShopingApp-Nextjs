"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

export default function ImageSlider({ images, title }: Props) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] md:h-[450px] bg-gray-100 rounded-xl">
        No Image
      </div>
    );
  }

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:flex-col gap-2">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
              idx === current ? "border-blue-600" : "border-transparent"
            }`}
            style={{ width: 60, height: 60 }}
          >
            <Image
              src={src}
              alt={`${title} - ${idx}`}
              width={60}
              height={60}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-xl shadow-md bg-white">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="relative w-full flex-shrink-0 h-full">
              <Image
                src={src}
                alt={`${title} - ${idx}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 hover:bg-gray-200 hover:text-blue-600
              text-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-4xl sm:text-6xl"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 hover:bg-gray-200 hover:text-blue-600 
              text-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-4xl sm:text-6xl"
            >
              ›
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  idx === current ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
