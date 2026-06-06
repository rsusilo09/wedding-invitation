"use client";

import React from "react";
import couple from "@/lib/constants/couple";

export type CoupleIntroProps = {
  brideName?: string;
  groomName?: string;
  date?: string;
  location?: string;
  brideImg?: string;
  groomImg?: string;
  brideInstagram?: string;
  groomInstagram?: string;
  className?: string;
};

export default function CoupleIntro({
  brideName = couple.brideName,
  groomName = couple.groomName,
  date = couple.date,
  location = couple.location,
  brideImg = couple.brideImg,
  groomImg = couple.groomImg,
  brideInstagram = couple.brideInstagram,
  groomInstagram = couple.groomInstagram,
  className = "",
}: CoupleIntroProps) {
  return (
    <section className={`py-16 px-4 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-widest text-pink-600">Perkenalan</p>
        <h2 className="mt-3 text-4xl font-serif text-zinc-900">
          {brideName} <span className="mx-2 text-zinc-400">&</span> <span className="text-pink-600">{groomName}</span>
        </h2>
        {date && (
          <p className="mt-2 text-sm text-zinc-600">
            {date} {location ? `• ${location}` : null}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 items-center">
          <div className="flex flex-col items-center">
            <div className="h-40 w-40 overflow-hidden rounded-full bg-zinc-100">
              {brideImg ? (
                <img src={brideImg} alt={`${brideName} photo`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-400">Photo</div>
              )}
            </div>
            <p className="mt-4 text-lg font-medium text-zinc-900">
              <a
                href={brideInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                {brideName}
              </a>
            </p>
            <p className="text-sm text-zinc-600">Bride</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-40 w-40 overflow-hidden rounded-full bg-zinc-100">
              {groomImg ? (
                <img src={groomImg} alt={`${groomName} photo`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-400">Photo</div>
              )}
            </div>
            <p className="mt-4 text-lg font-medium text-zinc-900">
              <a
                href={groomInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                {groomName}
              </a>
            </p>
            <p className="text-sm text-zinc-600">Groom</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="mx-auto max-w-xl text-sm text-zinc-600">
            Deskripsi singkat tentang pasangan dapat ditaruh di sini. Kamu bisa mengganti nama dan foto melalui props.
          </p>
        </div>
      </div>
    </section>
  );
}
