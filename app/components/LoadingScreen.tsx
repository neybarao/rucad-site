"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    const t1 = setTimeout(() => setFading(true), 1200);
    const t2 = setTimeout(() => {
      setGone(true);
      document.documentElement.classList.remove("no-scroll");
    }, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loading ${fading ? "loading--fade" : ""}`} aria-hidden>
      <svg
        width="124"
        height="143"
        viewBox="0 0 124 143"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="loading__mark"
      >
        <g filter="url(#filter0_dddddd_359_4)">
          <path d="M69.8625 112.171C74.793 110.95 79.188 121.048 53.0742 125.9C50.3953 126.397 47.7963 124.729 47.2415 122.031C46.6866 119.333 48.3984 116.69 51.0649 116.129L69.8625 112.171Z" fill="white"/>
          <path d="M61.9883 16.9873C86.8411 16.9873 106.988 37.3741 106.988 62.5224C106.988 82.1905 96.1765 94.4087 83.6289 101.732C71.3215 108.915 56.9673 111.681 48.2727 112.915C45.2383 113.346 42.4334 111.206 42.0078 108.136C41.5821 105.065 43.6969 102.227 46.7313 101.796C55.0657 100.613 67.6808 98.078 78.0852 92.0057C88.2495 86.0737 95.8924 77.0837 95.8924 62.5224C95.8924 43.5751 80.713 28.2151 61.9883 28.2151C43.2636 28.2151 28.0842 43.5751 28.0842 62.5224C28.0842 72.792 35.5377 85.099 49.3514 87.0598C52.3858 87.4905 54.5006 90.3288 54.075 93.3992C53.6493 96.4696 50.8444 98.6096 47.81 98.1789C27.5656 95.3054 16.9883 77.3596 16.9883 62.5224C16.9883 37.3741 37.1355 16.9873 61.9883 16.9873Z" fill="white"/>
          <path d="M55.6424 54.2577C56.0629 54.2577 56.5359 54.3914 57.0483 54.6856L68.3617 60.8509L77.8879 55.274C79.4779 54.3646 80.7656 56.0364 79.7145 57.3872L70.0437 69.8246C69.518 70.5066 68.9661 70.7875 68.3617 70.7875C67.9281 70.7875 67.4813 70.6271 66.9556 70.3596L55.6555 64.1943L46.1291 69.731C44.6838 70.5868 43.0808 69.2629 44.329 67.6314L53.9737 55.2206C54.4993 54.5385 55.6424 54.2577 55.6424 54.2577Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_dddddd_359_4" x="0.000774384" y="-0.000202179" width="123.975" height="142.975" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="0.202232"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_359_4"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="0.404464"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_359_4" result="effect2_dropShadow_359_4"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="1.41563"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect2_dropShadow_359_4" result="effect3_dropShadow_359_4"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.83125"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect3_dropShadow_359_4" result="effect4_dropShadow_359_4"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="4.85357"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect4_dropShadow_359_4" result="effect5_dropShadow_359_4"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="8.49375"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect5_dropShadow_359_4" result="effect6_dropShadow_359_4"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_359_4" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
