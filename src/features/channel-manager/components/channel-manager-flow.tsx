"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import {
  Calendar,
  BarChart3,
  DollarSign,
  Package,
  Building2,
  Zap,
  RefreshCw,
  ArrowLeftRight,
  Lock,
  Gift,
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const rnd = (min: number, max: number) => min + Math.random() * (max - min);

interface AnimParams { delay: number; duration: number; repeatDelay: number }

const LEFT_ANIM: AnimParams[] = Array.from({ length: 6 }, () => ({
  delay: rnd(0.5, 5),
  duration: rnd(1.8, 3.5),
  repeatDelay: rnd(1.5, 4),
}));
const RIGHT_ANIM: AnimParams[] = Array.from({ length: 6 }, () => ({
  delay: rnd(0.8, 5.5),
  duration: rnd(1.8, 3.5),
  repeatDelay: rnd(1.5, 4),
}));
const VERTICAL_ANIM: AnimParams = {
  delay: rnd(1, 3),
  duration: rnd(1.6, 2.8),
  repeatDelay: rnd(3, 6),
};

// Return-trip durations — slightly faster than outbound for a snappier feedback feel
const RIGHT_RETURN_DUR = Array.from({ length: 6 }, () => rnd(1.1, 1.8));
const LEFT_RETURN_DUR  = Array.from({ length: 6 }, () => rnd(1.1, 1.7));

// ─── Logo SVG components ──────────────────────────────────────────────────────
interface LogoProps { className?: string; style?: React.CSSProperties }

const FocoLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 771 771" fill="none" className={className} style={style}>
    <path fillRule="evenodd" clipRule="evenodd" d="M268.811 546.855L137.837 680.73C53.5854 610.027 0 503.966 0 385.401C0 172.586 172.587 0 385.401 0C525.146 0 647.587 74.3902 715.147 185.811L383.368 186.202C381.603 186.202 379.638 186.272 376.694 186.363C270.783 190.992 186.253 278.278 186.253 385.401C186.253 450.368 217.366 508.062 265.499 544.413C266.593 545.239 267.699 546.051 268.811 546.855Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M385.29 770.801C598.105 770.801 770.692 598.215 770.692 385.401C770.692 331.066 759.45 279.379 739.171 232.541H513.023C556.667 269.132 584.55 324.014 584.55 385.401C584.55 495.39 495.391 584.55 385.401 584.55C341.856 584.55 301.585 570.563 268.81 546.855L137.837 680.73L137.886 680.77C204.852 736.949 291.175 770.801 385.401 770.801H385.29Z" fill="white" fillOpacity={0.5} />
  </svg>
);

const BookingLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} style={style}>
    <path d="M23.4653 53.1893H12.7178V40.3345C12.7178 37.595 13.7715 36.1198 16.1317 35.8248H23.5074C24.6682 35.7286 25.836 35.8868 26.9294 36.2884C28.0227 36.69 29.0153 37.3252 29.838 38.1498C30.6606 38.9744 31.2934 39.9686 31.6923 41.0629C32.0912 42.1572 32.2465 43.3254 32.1475 44.486C32.1475 49.9651 28.839 53.2315 23.5074 53.2315L23.4653 53.1893ZM12.6968 18.4392V15.0675C12.6968 12.1172 13.9612 10.6842 16.7007 10.5156H22.222C26.9424 10.5156 29.8084 13.3395 29.8084 18.102C29.8084 21.6845 27.8696 25.8992 22.4327 25.8992H12.7389L12.6968 18.4392ZM37.2262 31.294L35.2875 30.1982L36.9734 28.7231C38.9543 27.0372 42.2417 23.2018 42.2417 16.6058C42.2417 6.49059 34.4024 -0.0421753 22.2852 -0.0421753H6.90158C5.16446 0.0175065 3.51746 0.745632 2.30421 1.99029C1.09096 3.23496 0.405163 4.90002 0.389893 6.6381V63.9578H22.5591C36.0461 63.9578 44.7284 56.6243 44.7284 45.2446C44.7284 39.1333 41.9256 33.865 37.1841 31.2308" fill="white" />
    <path d="M48.2266 56.2661C48.2266 51.9881 51.6615 48.5321 55.9184 48.5321C60.1752 48.5321 63.6523 51.9881 63.6523 56.2661C63.6523 60.544 60.1963 64 55.9184 64C51.6405 64 48.2266 60.544 48.2266 56.2661Z" fill="white" />
  </svg>
);
const ExpediaLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 85 85" fill="none" className={className} style={style}>
    <path d="M15.7674 3.11458e-05C14.5723 4.13504e-05 13.8211 0.274681 13.1882 0.907571L0.371789 13.724C0.133776 13.962 6.12344e-05 14.285 6.73467e-09 14.6215C-7.14255e-05 15.3222 0.568108 15.8903 1.26879 15.8903H56.8286L22.6718 50.0465C21.9987 50.7196 21.6071 51.1112 21.6072 52.4322L21.6071 61.419C21.6072 61.9633 21.8547 62.4349 22.2099 62.7901C22.5651 63.1453 23.0362 63.3924 23.5805 63.3924H32.5679C33.8889 63.3924 34.2799 63.0013 34.953 62.3282L69.1097 28.1715V83.7312C69.1097 84.4319 69.6778 85.0001 70.3785 85C70.715 85 71.0381 84.8663 71.276 84.6282L84.0924 71.8118C84.7253 71.1789 85.0001 70.4278 85 69.2326L85 8.56452C85 7.43977 84.7784 6.32606 84.3479 5.28695C83.9175 4.24783 83.2866 3.30368 82.4912 2.50839C81.6959 1.71311 80.7517 1.08225 79.7126 0.651864C78.6735 0.221475 77.5597 -3.33783e-05 76.435 3.77251e-09L15.7674 3.11458e-05Z" fill="white" />
    <path d="M4.88219 65.8898H17.2103C18.2415 65.8898 19.0717 66.72 19.0717 67.7513V80.1565C19.0717 81.1877 18.2415 82.018 17.2103 82.018H4.88219C3.85095 82.018 3.02075 81.1877 3.02075 80.1565V67.7513C3.02075 66.72 3.85095 65.8898 4.88219 65.8898Z" fill="white" />
  </svg>
);
const AirbnbLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 60 64" fill="none" className={className} style={style}>
    <path fillRule="evenodd" clipRule="evenodd" d="M58.6158 45.487L57.6498 43.182L56.1748 39.912L56.1128 39.85C51.6319 30.0842 46.9138 20.429 41.9628 10.893L41.7648 10.509L40.2408 7.43599C39.6096 6.17838 38.8362 4.99732 37.9358 3.91599C36.9577 2.6834 35.7114 1.69005 34.2917 1.01148C32.872 0.332914 31.3163 -0.0130194 29.7428 -1.25612e-05C28.1786 0.00531754 26.6343 0.351643 25.2176 1.01483C23.8009 1.67803 22.5458 2.64213 21.5398 3.83999C20.6613 4.93734 19.8894 6.11602 19.2348 7.35999L17.4998 10.755C12.5438 20.37 7.75981 30.097 3.33681 39.712L3.27481 39.836C2.89081 40.889 2.38281 41.966 1.86181 43.12C1.53981 43.822 1.21781 44.59 0.895813 45.425C0.0786119 47.6323 -0.185082 50.0062 0.127813 52.339C0.472752 54.6817 1.42206 56.8941 2.8822 58.7582C4.34235 60.6224 6.26296 62.074 8.45481 62.97C10.098 63.6607 11.8644 64.0105 13.6468 63.998C14.2021 63.9883 14.7563 63.9469 15.3068 63.874C17.5671 63.5858 19.7459 62.8443 21.7128 61.694C24.7008 59.9123 27.3827 57.6615 29.6558 55.028C31.9428 57.6474 34.6223 59.8961 37.5988 61.694C39.5656 62.8446 41.7445 63.5861 44.0048 63.874C44.5548 63.947 45.1098 63.988 45.6648 63.998C47.4478 64.016 49.2148 63.666 50.8568 62.97C53.0487 62.074 54.9693 60.6224 56.4294 58.7582C57.8896 56.8941 58.8389 54.6817 59.1838 52.339C59.656 50.0467 59.4538 47.6668 58.6018 45.487H58.6158ZM29.7418 48.82C26.2848 44.458 24.0418 40.37 23.2738 36.9C22.9598 35.623 22.8938 34.3 23.0758 32.997C23.2028 32.032 23.5558 31.111 24.1038 30.297C24.745 29.4052 25.593 28.6823 26.575 28.1903C27.5569 27.6982 28.6436 27.4517 29.7418 27.472C31.9778 27.386 34.1038 28.446 35.3798 30.285C35.9299 31.088 36.2821 32.0098 36.4078 32.975C36.5915 34.2767 36.5243 35.6015 36.2098 36.878C35.4418 40.273 33.2098 44.313 29.7418 48.798V48.82ZM55.3038 51.82C54.8038 55.157 52.6038 57.986 49.4678 59.255C47.9361 59.9028 46.2636 60.1459 44.6108 59.961C42.8906 59.7485 41.2327 59.1834 39.7408 58.301C36.9913 56.6412 34.5271 54.5494 32.4428 52.106C36.6678 46.914 39.2428 42.193 40.1998 37.943C40.6167 36.1572 40.7256 34.3134 40.5218 32.491C40.2838 30.924 39.6898 29.431 38.7868 28.129C36.7248 25.187 33.3338 23.463 29.7418 23.532C26.1698 23.486 22.7998 25.182 20.7088 28.079C19.8058 29.382 19.2118 30.873 18.9738 32.441C18.7031 34.261 18.8128 36.1175 19.2958 37.893C20.2618 42.118 22.8888 46.926 27.0528 52.118C24.9829 54.5758 22.5161 56.6697 19.7548 58.313C18.2633 59.2145 16.6009 59.7968 14.8728 60.023C13.2213 60.2058 11.55 59.9848 10.0028 59.379C6.87581 58.12 4.65581 55.292 4.16581 51.954C3.96305 50.2792 4.16257 48.5802 4.74781 46.998C4.94581 46.354 5.25581 45.758 5.57781 44.954C6.02381 43.926 6.54381 42.834 7.05281 41.754L7.11481 41.63C11.5388 32.09 16.2718 22.35 21.2148 12.858L21.4008 12.4L22.9368 9.44999C23.4355 8.43304 24.0553 7.48012 24.7828 6.61199C25.4146 5.87019 26.2 5.27444 27.0846 4.8659C27.9692 4.45736 28.9319 4.24578 29.9063 4.24578C30.8807 4.24578 31.8435 4.45736 32.7281 4.8659C33.6127 5.27444 34.398 5.87019 35.0298 6.61199C35.7224 7.47653 36.3089 8.42092 36.7768 9.42499L38.3128 12.375L38.4988 12.759C43.3688 22.312 48.1268 32.039 52.5388 41.593V41.655C53.0468 42.683 53.5048 43.835 54.0138 44.855C54.3358 45.623 54.6578 46.268 54.8438 46.899C55.3759 48.4938 55.5286 50.1908 55.2898 51.855L55.3038 51.82Z" fill="white" />
  </svg>
);
const DecolarLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 86 88" fill="none" className={className} style={style}>
    <path opacity={0.35} d="M86 44C86 66.4286 69.2567 84.9411 47.6158 87.6558C45.8116 87.8831 43.975 88 42.1092 88H0V0H42.1092C43.975 0 45.8116 0.1169 47.6158 0.344206C69.2567 3.05889 86 21.5714 86 44Z" fill="white" />
    <path d="M44 44C44 74.3616 18.1801 88 0 88V0C18.1801 0 44 13.6384 44 44Z" fill="white" />
  </svg>
);
const B2bLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 131 95" fill="none" className={className} style={style}>
    <path d="M37.75 13.53C39.1528 13.53 40.29 12.3928 40.29 10.99C40.29 9.58721 39.1528 8.45001 37.75 8.45001C36.3472 8.45001 35.21 9.58721 35.21 10.99C35.21 12.3928 36.3472 13.53 37.75 13.53Z" fill="white" />
    <path d="M29.9299 23.24C31.3327 23.24 32.4699 22.1028 32.4699 20.7C32.4699 19.2972 31.3327 18.16 29.9299 18.16C28.5271 18.16 27.3899 19.2972 27.3899 20.7C27.3899 22.1028 28.5271 23.24 29.9299 23.24Z" fill="white" />
    <path d="M31.76 42.93C30.36 42.93 29.22 41.79 29.22 40.39C29.22 38.99 30.36 37.85 31.76 37.85C33.16 37.85 34.3 38.99 34.3 40.39C34.3 41.79 33.16 42.93 31.76 42.93Z" fill="white" />
    <path d="M40.0598 53.01C41.4626 53.01 42.5998 51.8728 42.5998 50.47C42.5998 49.0672 41.4626 47.93 40.0598 47.93C38.657 47.93 37.5198 49.0672 37.5198 50.47C37.5198 51.8728 38.657 53.01 40.0598 53.01Z" fill="white" />
    <path d="M36.49 30.29C36.49 28.89 37.63 27.75 39.03 27.75C40.43 27.75 41.57 28.89 41.57 30.29C41.57 31.69 40.43 32.83 39.03 32.83C37.63 32.82 36.49 31.69 36.49 30.29Z" fill="white" />
    <path d="M103.38 15.64C103.1 11.65 99.7299 8.47 95.6899 8.47H85.6899V6.38C85.6899 2.89 82.7999 0 79.3099 0H65.2099C61.7299 0 58.8299 2.89 58.8299 6.38V8.47H44.5399C44.1299 8.45 44.0099 8.46 43.8899 8.48C42.7299 8.58 41.8099 9.52 41.7299 10.68C41.7099 10.99 41.7299 11.3 41.7999 12.54C42.8399 13.53 44.0899 13.53H49.2199C49.7199 13.58 50.1199 13.71 50.9799 14.07C51.5799 14.91 51.5799 15.89V16.06C51.5799 17.04 50.9799 17.89 50.1199 18.24C49.8399 18.36 49.2199 18.42H36.2699C34.9699 18.42 33.8999 19.49 33.8999 20.79V20.96C33.8999 21.94 34.5099 22.78 35.3599 23.14C35.6299 23.26 36.2699 23.32H51.3199C51.9499 23.38 52.4399 23.57 52.7999 23.81C53.3399 24.23 53.6899 24.86 53.6899 25.57V25.73C53.6899 26.75 52.9799 27.61 51.9999 27.89H45.3699C44.0699 27.89 42.9999 28.96 42.9999 30.26V30.43C42.9999 31.41 43.6099 32.25 44.4599 32.61C44.7299 32.73 45.3699 32.79H51.5099C51.9999 32.93 52.8599 33.29 53.4599 34.14C53.4599 35.11V35.28C53.4599 36.43 52.6299 37.4 51.5399 37.61H38.4699C36.6999 37.9 35.7299 39.04 35.7299 40.38V40.58C35.7299 41.72 36.4299 42.71 37.4199 43.13C37.7399 43.27 38.4699 43.34H51.6999C52.9999 43.34 54.0599 44.41 54.0599 45.71V45.88C54.0599 46.86 53.4599 47.7 52.5999 48.06C52.0099 48.24H50.1199C48.8799 48.25 47.6399 48.28 46.4099 48.34C45.3099 48.58 45.0999 48.66 44.7699 48.88C44.1799 49.33 43.9799 50.85C44.0999 52.1 45.1299 52.9 46.7699 52.95H47.2199H95.6999C96.4099 52.94 96.9499 52.87 97.3399 52.78C97.7899 52.67 98.0099 52.6 98.4599 52.44C98.8099 52.29 99.1099 52.15 99.7499 51.79C100.21 51.47 100.41 51.32 100.97 50.88C101.46 50.38 101.91 49.77 102.26 49.25C102.42 48.99 102.67 48.5 102.86 48.03C103.04 47.53 103.14 47.17 103.25 46.66C103.35 46.02 103.37 45.79L103.41 38.12L103.38 15.64ZM80.9999 8.45H63.5499V5.54C63.5499 4.61 64.2799 3.86 65.2199 3.86H79.3199C80.2599 3.86 80.9999 4.6 80.9999 5.54V8.45Z" fill="white" />
    <path d="M26.79 78.67C28.6 78.78 30.15 79.18 31.44 79.85C32.73 80.52 33.72 81.39 34.39 82.43C35.06 83.48 35.4 84.71 35.4 86.11C35.4 88.69 34.31 90.72 32.13 92.18C29.95 93.64 27.01 94.38 23.3 94.38H0V64.24H21.58C25.28 64.24 28.23 64.94 30.41 66.35C32.59 67.76 33.68 69.65 33.68 72.03C33.68 73.09 33.42 74.14 32.9 75.17C32.38 76.2 31.57 77.02 30.47 77.62C29.37 78.24 28.14 78.58 26.79 78.67ZM8.71 70.36V76.26H20.12C21.7 76.26 22.9 76.04 23.74 75.59C24.57 75.15 24.99 74.38 24.99 73.29C24.56 71.78 23.75 70.93 22.99 70.7C22.23 70.47 21.27 70.36 20.13 70.36H8.71ZM21.45 88.27C23.06 88.27 24.28 88.03 25.13 87.54C25.98 87.05 26.4 86.23 26.4 85.09C26.4 83.94 25.98 83.13 25.15 82.66C24.32 82.19 23.08 81.95 21.45 81.95H8.7V88.28H21.45V88.27Z" fill="white" />
    <path d="M39.0201 70.06C40.6301 68.08 42.8801 66.46 45.7801 65.21C48.6801 63.96 51.8501 63.34 55.3001 63.34C57.6501 63.34 59.8001 63.61 61.7401 64.14C63.6801 64.67 65.3101 65.37 66.6301 66.25C67.9501 67.13 68.9001 68.13 69.4701 69.26C70.0401 70.39 70.3301 71.54 70.3301 72.68C70.3301 74.23 69.9101 75.62 69.0601 76.84C68.2101 78.06 66.9701 79.17 65.3301 80.16C61.5501 82.05 58.9101 82.85C56.3501 83.65 52.3401 85.35C50.5201 86.21 49.3801 87.02 48.9201 87.76H70.9301V94.39H38.5901V90.6C38.9901 87.67 40.5001 85.04 43.1101 82.7C45.7201 80.36 49.2401 78.53 53.6601 77.21C55.8701 76.52 57.4901 75.98 58.5301 75.57C60.3101 74.74 60.7701 74.28C61.2301 73.82 61.4601 73.35 61.4601 72.86C61.4601 71.91 60.8101 71.17 59.5001 70.62C58.1901 70.07 56.6601 69.8 54.9101 69.8C52.9001 69.8 50.9401 70.22 49.0301 71.07C47.1201 71.92 45.3801 73.12 43.8001 74.67L39.0201 70.06Z" fill="white" />
    <path d="M103.24 78.67C105.05 78.78 106.6 79.18 107.89 79.85C109.18 80.52 110.17 81.39 110.84 82.43C111.51 83.48 111.85 84.71 111.85 86.11C111.85 88.69 110.76 90.72 108.58 92.18C106.4 93.64 103.46 94.38 99.75 94.38H76.45V64.24H98.03C101.73 64.24 104.68 64.94 106.86 66.35C109.04 67.76 110.13 69.65 110.13 72.03C110.13 73.09 109.87 74.14 109.35 75.17C108.83 76.2 108.02 77.02 106.92 77.62C105.81 78.24 104.59 78.58 103.24 78.67ZM85.1499 70.36V76.26H96.56C98.14 76.26 99.3399 76.04 100.18 75.59C101.01 75.15 101.43 74.38 101.43 73.29C101 71.78 100.19 70.93 99.4299 70.7C98.6699 70.47 97.7099 70.36 96.5699 70.36H85.1499ZM97.8999 88.27C99.5099 88.27 100.73 88.03 101.58 87.54C102.43 87.05 102.85 86.23 102.85 85.09C102.85 83.94 102.43 83.13 101.6 82.66C100.77 82.19 99.5299 81.95 97.8999 81.95H85.1499V88.28H97.8999V88.27Z" fill="white" />
    <path d="M125.38 94.39C128.434 94.39 130.91 91.9141 130.91 88.86C130.91 85.8058 128.434 83.33 125.38 83.33C122.326 83.33 119.85 85.8058 119.85 88.86C119.85 91.9141 122.326 94.39 125.38 94.39Z" fill="white" />
  </svg>
);
const CvcLogo = ({ className, style }: LogoProps) => (
  <svg viewBox="0 0 103 93" fill="none" className={className} style={style}>
    <path d="M82.2189 68.3178C81.0606 67.7513 79.5597 67.2898 78.0997 67.059C76.448 66.8004 74.7757 67.4018 73.6312 68.6675C63.0968 80.3251 50.431 86.7446 37.9503 86.7446C26.7239 86.7446 17.1423 79.6537 12.941 68.1989C12.6051 67.2829 11.7004 66.8562 10.734 67.0871C10.0075 67.8074C12.8861 82.0802 23.4409 91.6679 37.5459 92.8428C54.7901 94.2763 72.3219 85.8356 82.7466 70.4088C83.2469 69.6676 82.9728 68.6884 82.2189 68.3178Z" fill="white" />
    <path d="M89.7516 30C94.3883 30 98.3457 31.2427 101.499 34.2921C101.832 34.6112 101.825 35.1341 101.472 35.4398L96.4814 39.8132C96.1418 40.0101 95.9546 40.0101C95.5596 39.9422 95.4002 39.7998C93.8963 38.4753 92.1634 37.9185 90.0912 37.9185C85.5514 37.9185 82.5436 41.2327 82.5436 45.4704C82.5436 50.1698 85.5514 54.1357 90.6248 54.1357C92.801 54.1357 94.8458 53.2869 96.4259 51.8472C96.9804 51.63 97.4932 51.8133L102.712 56.1597C103.086 56.4787 103.093 57.0086 102.747 57.3345C99.3714 60.4652 94.9913 62 90.1813 62C80.5892 62 73 55.5484 73 46.0203C73.007 36.927 80.5753 30 89.7516 30Z" fill="white" />
    <path d="M69.205 31C69.7871 31 70.1706 31.5967 69.924 32.1188L57.6794 58.0811C56.5495 60.4746 53.3788 62 51.4612 62C48.7904 62 46.3594 60.461 45.2363 58.0606L33.0738 32.1188C32.8273 31.5967 33.2313 31.0067 33.7929 31.0067H41.8874C42.1956 31.0067 42.4969 31.1966 42.6202 31.4882L50.9407 51.0632C51.0434 51.3073 51.5023 51.4295C51.9613 51.3073 52.064 51.0565L60.3435 31.4815C60.4667 31.1899 60.7749 31 61.0762 31H69.205Z" fill="white" />
    <path d="M16.7517 30C21.3884 30 25.3459 31.2427 28.4993 34.2921C28.832 34.6112 28.8251 35.1341 28.4716 35.4398L23.4814 39.8132C23.1418 40.0101 22.9547 40.0101C22.5596 39.9422 22.4002 39.7998C20.8963 38.4753 19.1636 37.9185 17.0913 37.9185C12.5516 37.9185 9.54366 41.2327 9.54366 45.4704C9.54366 50.1698 12.5516 54.1357 17.6249 54.1357C19.8012 54.1357 21.8458 53.2869 23.4259 51.8472C23.9804 51.63 24.4934 51.8133L29.7122 56.1597C30.0864 56.4787 30.0933 57.0086 29.7468 57.3345C26.3716 60.4652 21.9913 62 17.1814 62C7.58919 62 0 55.5484 0 46.0203C0.00696559 36.927 7.56842 30 16.7517 30Z" fill="white" />
    <path d="M18.7811 23.7329C19.9394 24.2776 21.4404 24.7213 22.9002 24.9433C24.5521 25.1919 26.2244 24.6136 27.3689 23.3967C37.9031 12.1875 50.5689 6.01465 63.0496 6.01465C74.2762 6.01465 83.8577 12.833 88.0591 23.8472C88.395 24.7282 89.2996 25.1382 90.266 24.9163C90.9925 24.2237C88.114 10.4997 77.5591 1.28084 63.454 0.151174C46.21 -1.22727 28.6779 6.8888 18.2534 21.7223C17.7531 22.435 18.0272 23.3765 18.7811 23.7329Z" fill="white" />
  </svg>
);

// ─── Node data ────────────────────────────────────────────────────────────────
interface NodeData {
  id: string;
  label: string;
  Icon?: React.ComponentType<{ className?: string }>;
  Logo?: React.ComponentType<LogoProps>;
}

const leftNodes: NodeData[] = [
  { id: "reservas", label: "Reservas", Icon: Calendar },
  { id: "disponibilidade", label: "Disponibilidade", Icon: BarChart3 },
  { id: "tarifas", label: "Tarifas", Icon: DollarSign },
  { id: "inventario", label: "Inventário", Icon: Package },
  { id: "restricoes", label: "Restrições", Icon: Lock },
  { id: "pacotes", label: "Pacotes promocionais", Icon: Gift },
];
const rightNodes: NodeData[] = [
  { id: "booking", label: "Booking.com", Logo: BookingLogo },
  { id: "expedia", label: "Expedia", Logo: ExpediaLogo },
  { id: "airbnb", label: "Airbnb", Logo: AirbnbLogo },
  { id: "decolar", label: "Decolar.com", Logo: DecolarLogo },
  { id: "b2b", label: "B2B Reservas", Logo: B2bLogo },
  { id: "cvc", label: "CVC", Logo: CvcLogo },
];

// ─── Connection Line ──────────────────────────────────────────────────────────
interface ConnectionLineProps {
  pathData: string;
  anim: AnimParams;
  onArrival: () => void;
  onEmit?: () => void;
}

function ConnectionLine({ pathData, anim, onArrival, onEmit }: ConnectionLineProps) {
  const traceRef = useRef<SVGPathElement>(null);
  const particleGroupRef = useRef<SVGGElement>(null);
  const totalLengthRef = useRef(0);
  const onArrivalRef = useRef(onArrival);
  onArrivalRef.current = onArrival;
  const onEmitRef = useRef(onEmit);
  onEmitRef.current = onEmit;

  const pathLengthMV = useMotionValue(0);
  const traceOpacity = useMotionValue(0);
  const particleOpacity = useMotionValue(0);

  useEffect(() => {
    if (traceRef.current) totalLengthRef.current = traceRef.current.getTotalLength();
  }, [pathData]);

  useEffect(() => {
    return pathLengthMV.on("change", (v) => {
      const path = traceRef.current;
      const group = particleGroupRef.current;
      if (!path || !group || totalLengthRef.current === 0) return;
      const { x, y } = path.getPointAtLength(v * totalLengthRef.current);
      group.setAttribute("transform", `translate(${x},${y})`);
    });
  }, []);

  useEffect(() => {
    let active = true;
    const loop = async () => {
      try {
        await sleep(anim.delay * 1000);
        while (active) {
          pathLengthMV.set(0);
          traceOpacity.set(1);
          particleOpacity.set(0);
          if (onEmitRef.current) onEmitRef.current();
          animate(particleOpacity, 1, { duration: 0.12 });
          await animate(pathLengthMV, 1, { duration: anim.duration, ease: "linear" });
          if (!active) break;
          onArrivalRef.current();
          animate(traceOpacity, 0, { duration: 0.42 });
          await animate(particleOpacity, 0, { duration: 0.2 });
          await sleep(anim.repeatDelay * 1000);
        }
      } catch { /* unmounted */ }
    };
    loop();
    return () => { active = false; };
  }, [pathData]);

  if (!pathData) return null;

  return (
    <g>
      {/* Base trace — always visible, ultra-subtle guide */}
      <path d={pathData} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Luminous trace — pathLength animates 0→1 (drawn incrementally).
          CSS drop-shadow is used instead of an SVG filter so the glow renders
          correctly for both wide bezier curves and the zero-width vertical line. */}
      <motion.path
        ref={traceRef}
        d={pathData}
        fill="none"
        stroke="rgba(215,238,255,0.82)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          pathLength: pathLengthMV,
          opacity: traceOpacity,
          filter:
            "drop-shadow(0 0 4px rgba(215,238,255,0.78)) drop-shadow(0 0 9px rgba(147,210,255,0.40))",
        }}
      />

      {/* Particle — sits at the growing tip via getPointAtLength */}
      <g ref={particleGroupRef}>
        <motion.circle
          cx={0} cy={0} r={3.5}
          fill="rgba(220,242,255,0.96)"
          style={{
            opacity: particleOpacity,
            filter:
              "drop-shadow(0 0 5px rgba(215,238,255,0.92)) drop-shadow(0 0 12px rgba(147,210,255,0.50))",
          }}
        />
      </g>
    </g>
  );
}

// ─── Return Pulse ─────────────────────────────────────────────────────────────
// One-shot SVG particle fired imperatively via fire().
// Warm-white tint (vs cyan-white outbound) visually marks the return direction.
interface ReturnPulseHandle { fire: () => void }

const ReturnPulse = forwardRef<ReturnPulseHandle, {
  pathData: string;
  onArrival: () => void;
  duration?: number;
}>(function ReturnPulse({ pathData, onArrival, duration = 1.5 }, ref) {
  const traceRef       = useRef<SVGPathElement>(null);
  const groupRef       = useRef<SVGGElement>(null);
  const totalRef       = useRef(0);
  const firingRef      = useRef(false);
  const onArrivalRef   = useRef(onArrival);
  onArrivalRef.current = onArrival;

  const pathLengthMV   = useMotionValue(0);
  const traceOpacity   = useMotionValue(0);
  const particleOpacity = useMotionValue(0);

  useEffect(() => {
    if (traceRef.current) totalRef.current = traceRef.current.getTotalLength();
  }, [pathData]);

  useEffect(() => {
    return pathLengthMV.on("change", (v) => {
      const path = traceRef.current;
      const g    = groupRef.current;
      if (!path || !g || totalRef.current === 0) return;
      const { x, y } = path.getPointAtLength(v * totalRef.current);
      g.setAttribute("transform", `translate(${x},${y})`);
    });
  }, []);

  useImperativeHandle(ref, () => ({
    fire: async () => {
      if (!pathData || firingRef.current) return;
      firingRef.current = true;
      try {
        // Reset
        pathLengthMV.set(0);
        traceOpacity.set(1);
        particleOpacity.set(0);
        // Travel
        animate(particleOpacity, 1, { duration: 0.1 });
        await animate(pathLengthMV, 1, { duration, ease: "linear" });
        // Contact
        onArrivalRef.current();
        // Fade-out
        animate(traceOpacity, 0, { duration: 0.35 });
        await animate(particleOpacity, 0, { duration: 0.18 });
        pathLengthMV.set(0);
        traceOpacity.set(0);
      } catch { /* component unmounted mid-flight */ }
      finally { firingRef.current = false; }
    },
  }));

  if (!pathData) return null;

  return (
    <g>
      {/* Warm-white luminous trace (return direction) */}
      <motion.path
        ref={traceRef}
        d={pathData}
        fill="none"
        stroke="rgba(255,235,200,0.80)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          pathLength: pathLengthMV,
          opacity: traceOpacity,
          filter:
            "drop-shadow(0 0 4px rgba(255,210,140,0.76)) drop-shadow(0 0 8px rgba(255,180,60,0.36))",
        }}
      />
      {/* Tip particle */}
      <g ref={groupRef}>
        <motion.circle
          cx={0} cy={0} r={3}
          fill="rgba(255,245,210,0.96)"
          style={{
            opacity: particleOpacity,
            filter:
              "drop-shadow(0 0 5px rgba(255,220,150,0.90)) drop-shadow(0 0 10px rgba(255,190,70,0.46))",
          }}
        />
      </g>
    </g>
  );
});

// ─── Contact Effects Overlay ──────────────────────────────────────────────────
function ContactEffectsOverlay({
  contactId, width, height, borderRadius, traceBorder = true,
}: { contactId: number; width: number; height: number; borderRadius: number; traceBorder?: boolean }) {
  if (width === 0 || height === 0) return null;

  const minSide = Math.min(width, height);
  const r = Math.min(borderRadius, minSide / 2);

  // A card is a TRUE CIRCLE only when width ≈ height AND fully rounded.
  // Pills (width >> height with rounded-full) must use the rect path even if
  // r === height/2, because their border is NOT circular — it's a stadium shape.
  const isCircle = Math.abs(width - height) <= 4 && r >= minSide / 2 - 1;
  const circleR = minSide / 2;

  // Perimeter of the shape being traced
  const perimeter = isCircle
    ? 2 * Math.PI * circleR
    : 2 * (width + height) - 8 * r + 2 * Math.PI * r;

  const dashLen = Math.min(28, perimeter * 0.11);

  // SVG canvas: 4 px larger than the card so the stroke sits on the border
  const svgW = width + 4;
  const svgH = height + 4;
  const ox = 2; // horizontal offset inside SVG
  const oy = 2; // vertical offset inside SVG

  // ── Rounded-rectangle path using M / L / A ──────────────────────────────────
  // Draws clockwise starting from the top-left arc endpoint.
  // For pills (r = height/2) the L segments between arcs collapse to zero
  // length naturally, producing the exact stadium/pill boundary.
  const W = ox + width;
  const H = oy + height;
  const rectPath = [
    `M ${ox + r},${oy}`,            // top edge start
    `L ${W - r},${oy}`,             // top edge
    `A ${r},${r} 0 0,1 ${W},${oy + r}`,       // top-right arc
    `L ${W},${H - r}`,              // right edge
    `A ${r},${r} 0 0,1 ${W - r},${H}`,        // bottom-right arc
    `L ${ox + r},${H}`,             // bottom edge
    `A ${r},${r} 0 0,1 ${ox},${H - r}`,       // bottom-left arc
    `L ${ox},${oy + r}`,            // left edge
    `A ${r},${r} 0 0,1 ${ox + r},${oy}`,      // top-left arc → back to start
  ].join(" ");

  const dash = `${dashLen} ${perimeter + dashLen + 1}`;
  const traceInitial = { strokeDashoffset: 0, opacity: 0 };
  const traceAnimate = { strokeDashoffset: -(dashLen + perimeter), opacity: [0, 1, 1, 0] };
  const traceTransition = {
    duration: 0.95,
    ease: "linear" as const,
    opacity: { times: [0, 0.05, 0.88, 1] },
  };

  const strokeProps = {
    fill: "none" as const,
    stroke: "rgba(190,225,255,0.72)",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    // CSS drop-shadow works for all shapes (circles, pills, wide rects)
    style: { filter: "drop-shadow(0 0 3px rgba(190,225,255,0.80)) drop-shadow(0 0 7px rgba(147,210,255,0.45))" },
    strokeDasharray: dash,
    initial: traceInitial,
    animate: traceAnimate,
    transition: traceTransition,
  };

  return (
    <AnimatePresence>
      {contactId > 0 && (
        <motion.div key={contactId} className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 20 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, delay: 0.88 }}>

          {/* Surface shine — sweeps across the card */}
          <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: r }}>
            <motion.div
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
                x: "-100%",
              }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            />
          </div>

          {/* Border trace — skipped when traceBorder={false} (hub card) */}
          {traceBorder && (
            <svg style={{
              position: "absolute", top: -2, left: -2,
              width: svgW, height: svgH,
              overflow: "visible", pointerEvents: "none",
            }}>
              {isCircle ? (
                <motion.circle
                  cx={svgW / 2} cy={svgH / 2} r={circleR + 1}
                  {...strokeProps}
                />
              ) : (
                <motion.path d={rectPath} {...strokeProps} />
              )}
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Source Pill ──────────────────────────────────────────────────────────────
const SourcePill = forwardRef<HTMLDivElement, NodeData & { delay?: number }>(
  function SourcePill({ label, Icon, delay = 0 }, ref) {
    return (
      <motion.div ref={ref}
        initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.45, delay }}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-default select-none"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-white/30 flex-shrink-0 group-hover:text-white/50 transition-colors duration-150" />}
        <span className="text-[13px] text-white/50 whitespace-nowrap tracking-wide group-hover:text-white/65 transition-colors duration-150">{label}</span>
      </motion.div>
    );
  }
);

// ─── Destination Pill ─────────────────────────────────────────────────────────
interface PillHandle { element: HTMLDivElement | null; triggerContact: () => void }

const DestPill = forwardRef<PillHandle, NodeData & { delay?: number }>(
  function DestPill({ label, Logo, Icon, delay = 0 }, ref) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [contactId, setContactId] = useState(0);
    const [logoActive, setLogoActive] = useState(false);
    const [dims, setDims] = useState({ width: 0, height: 0 });

    useEffect(() => {
      if (!cardRef.current) return;
      const measure = () => {
        const { width, height } = cardRef.current!.getBoundingClientRect();
        setDims({ width, height });
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(cardRef.current);
      return () => ro.disconnect();
    }, []);

    useEffect(() => {
      if (contactId === 0) return;
      setLogoActive(true);
      const t = setTimeout(() => setLogoActive(false), 1200);
      return () => clearTimeout(t);
    }, [contactId]);

    useImperativeHandle(ref, () => ({
      element: cardRef.current,
      triggerContact: () => setContactId((n) => n + 1),
    }));

    return (
      <motion.div ref={cardRef}
        initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.45, delay }}
        className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-default select-none"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}
      >
        <motion.div className="flex-shrink-0 flex items-center h-3.5"
          animate={{ opacity: logoActive ? 1 : 0.28, filter: logoActive ? "drop-shadow(0 0 5px rgba(255,255,255,0.50))" : "none" }}
          transition={{ duration: logoActive ? 0.18 : 0.55 }}
        >
          {Logo ? <Logo className="h-3.5 w-auto max-w-[34px]" /> : Icon && <Icon className="w-3.5 h-3.5 text-white" />}
        </motion.div>
        <span className="text-[13px] text-white/50 whitespace-nowrap tracking-wide group-hover:text-white/65 transition-colors duration-150">{label}</span>
        <ContactEffectsOverlay contactId={contactId} width={dims.width} height={dims.height} borderRadius={9999} />
      </motion.div>
    );
  }
);

// ─── Hotel Card (source — emits vertical pulse) ───────────────────────────────
interface HotelHandle { element: HTMLDivElement | null; triggerEmit: () => void }

const HotelCard = forwardRef<HotelHandle, object>(function HotelCard(_props, ref) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [emitId, setEmitId] = useState(0);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const measure = () => {
      const { width, height } = cardRef.current!.getBoundingClientRect();
      setDims({ width, height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  useImperativeHandle(ref, () => ({
    element: cardRef.current,
    triggerEmit: () => setEmitId((n) => n + 1),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <div
        ref={cardRef}
        className="relative flex items-center px-5 py-5 rounded-full select-none"
        style={{
          border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        <Building2 className="w-6 h-6 text-white/35 flex-shrink-0" />

        {/* Emit pulse: subtle outward ring when data leaves */}
        <ContactEffectsOverlay contactId={emitId} width={dims.width} height={dims.height} borderRadius={9999} />
      </div>
    </motion.div>
  );
});

// ─── Hub (updated: Foco card overlay + expanded HubHandle) ───────────────────
interface HubHandle {
  element: HTMLDivElement | null;
  focoElement: HTMLDivElement | null;
  triggerContact: () => void;
  triggerFocoContact: () => void;
}

const Hub = forwardRef<HubHandle, object>(function Hub(_props, ref) {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const focoCardRef = useRef<HTMLDivElement>(null);

  const [contactId, setContactId] = useState(0);
  const [focoContactId, setFocoContactId] = useState(0);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [focoDims, setFocoDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const measure = () => {
      const { width, height } = cardRef.current!.getBoundingClientRect();
      setDims({ width, height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!focoCardRef.current) return;
    const measure = () => {
      const { width, height } = focoCardRef.current!.getBoundingClientRect();
      setFocoDims({ width, height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(focoCardRef.current);
    return () => ro.disconnect();
  }, []);

  useImperativeHandle(ref, () => ({
    element: outerRef.current,
    focoElement: focoCardRef.current,
    triggerContact: () => setContactId((n) => n + 1),
    triggerFocoContact: () => setFocoContactId((n) => n + 1),
  }));

  return (
    <motion.div
      ref={outerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.12 }}
      className="relative flex-shrink-0"
    >
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ inset: "-65%", background: "radial-gradient(ellipse at center, rgba(59,130,246,0.13) 0%, transparent 65%)" }} />

      {/* ── Contact impact glow: large diffuse flash on any particle arrival ── */}
      <AnimatePresence>
        {contactId > 0 && (
          <motion.div
            key={contactId}
            className="absolute pointer-events-none"
            style={{
              inset: "-90px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(56,189,248,0.32) 0%, rgba(59,130,246,0.16) 35%, transparent 70%)",
              filter: "blur(22px)",
              zIndex: -1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.0, ease: "easeOut", times: [0, 0.12, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      {[1.35, 1.75].map((scale, i) => (
        <motion.div key={i} className="absolute inset-0 rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
          animate={{ scale: [1, scale], opacity: [0.4, 0] }}
          transition={{ duration: 3.2, delay: i * 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* ── Foco overlay card: sits on top of hub, half outside the hub border ── */}
      <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
        <div
          ref={focoCardRef}
          className="relative flex items-center gap-2.5 px-4 py-4 rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.14)",
            background: "linear-gradient(145deg, rgba(59,130,246,0.14) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.07) inset, 0 4px 24px rgba(59,130,246,0.20)",
          }}
        >
          {/* Logo wrapper — rotates 360° + slight scale-bounce on each particle arrival.
              key={focoContactId} triggers a remount so the animation always plays
              from 0° regardless of how many contacts have occurred. */}
          <motion.div
            key={focoContactId}
            animate={
              focoContactId > 0
                ? { rotate: [0, 360], scale: [1, 1.12, 1] }
                : {}
            }
            transition={{ duration: 0.88, ease: "easeInOut" }}
            style={{ display: "inline-flex", transformOrigin: "center" }}
          >
            <FocoLogo className="h-16 w-16" />
          </motion.div>
          <ContactEffectsOverlay contactId={focoContactId} width={focoDims.width} height={focoDims.height} borderRadius={500} />
        </div>
      </div>

      {/* Hub glass card — pt-10 clears space below the Foco overlay */}
      <div
        ref={cardRef}
        className="relative flex flex-col items-center gap-4 px-10 pt-20 pb-8 rounded-2xl"
        style={{
          border: "1px solid rgba(255,255,255,0.09)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.07) inset",
        }}
      >
        {/* Three-slot icons */}
        <div className="flex items-center gap-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(59,130,246,0.12)", boxShadow: "0 0 14px rgba(59,130,246,0.20)" }}>
            <Zap className="w-4 h-4 text-blue-300/65" />
          </div>
          <div className="flex flex-col gap-[3px] px-1">
            <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
            <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" }}>
            <RefreshCw className="w-[15px] h-[15px] text-white/30" />
          </motion.div>
          <div className="flex flex-col gap-[3px] px-1">
            <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
            <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(14,165,233,0.10)", boxShadow: "0 0 14px rgba(14,165,233,0.18)" }}>
            <ArrowLeftRight className="w-4 h-4 text-sky-300/60" />
          </div>
        </div>

        {/* Label row */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-white/70 uppercase tracking-[0.55em]">Channel Manager</span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-[5px] rounded-full"
          style={{ border: "1px solid rgba(74,222,128,0.12)", background: "rgba(74,222,128,0.05)" }}>
          <motion.div className="w-1 h-1 rounded-full bg-green-400/70"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
          <span className="text-[9px] text-green-400/55 uppercase tracking-[0.18em] font-medium">Ao vivo</span>
        </div>

        <ContactEffectsOverlay contactId={contactId} width={dims.width} height={dims.height} borderRadius={16} traceBorder={false} />
      </div>
    </motion.div>
  );
});

// ─── Mobile pill ──────────────────────────────────────────────────────────────
function MobilePill({ label, Logo, Icon }: NodeData) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full"
      style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" }}>
      <div className="flex-shrink-0 flex items-center h-3" style={{ opacity: 0.35 }}>
        {Logo ? <Logo className="h-3 w-auto max-w-[28px]" /> : Icon && <Icon className="w-3 h-3 text-white" />}
      </div>
      <span className="text-xs text-white/45 whitespace-nowrap">{label}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ChannelManagerFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hotelRef = useRef<HotelHandle | null>(null);
  const hubRef = useRef<HubHandle | null>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const rightRefs = useRef<(PillHandle | null)[]>([null, null, null, null, null, null]);

  // Return-trip pulse refs — fired imperatively when outbound particles arrive
  const rightReturnPulseRefs = useRef<(ReturnPulseHandle | null)[]>([null, null, null, null, null, null]);
  const leftReturnPulseRefs  = useRef<(ReturnPulseHandle | null)[]>([null, null, null, null, null, null]);
  const verticalReturnRef    = useRef<ReturnPulseHandle | null>(null);
  // Debounce: prevents cascading when multiple return particles arrive at hub concurrently
  const lastReturnBatchRef   = useRef<number>(0);

  const [leftPaths, setLeftPaths] = useState<string[]>([]);
  const [rightPaths, setRightPaths] = useState<string[]>([]);
  const [verticalPath, setVerticalPath] = useState("");
  // Reversed paths for return-trip pulses
  const [rightReturnPaths, setRightReturnPaths] = useState<string[]>([]);
  const [leftReturnPaths,  setLeftReturnPaths]  = useState<string[]>([]);
  const [verticalReturnPath, setVerticalReturnPath] = useState("");
  const [svgDims, setSvgDims] = useState({ width: 1000, height: 620 });

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const hub = hubRef.current?.element;
    if (!container || !hub) return;

    const cRect = container.getBoundingClientRect();
    const hRect = hub.getBoundingClientRect();
    const local = (r: DOMRect) => ({
      left: r.left - cRect.left,
      right: r.right - cRect.left,
      midY: r.top - cRect.top + r.height / 2,
    });
    const h = local(hRect);

    // Outbound left paths (left node → hub)
    setLeftPaths(leftRefs.current.map((el) => {
      if (!el) return "";
      const n = local(el.getBoundingClientRect());
      const mx = (n.right + h.left) / 2;
      return `M ${n.right},${n.midY} C ${mx},${n.midY} ${mx},${h.midY} ${h.left},${h.midY}`;
    }));
    // Return left paths (hub → left node) — mirrored control points
    setLeftReturnPaths(leftRefs.current.map((el) => {
      if (!el) return "";
      const n = local(el.getBoundingClientRect());
      const mx = (n.right + h.left) / 2;
      return `M ${h.left},${h.midY} C ${mx},${h.midY} ${mx},${n.midY} ${n.right},${n.midY}`;
    }));

    // Outbound right paths (hub → channel)
    setRightPaths(rightRefs.current.map((handle) => {
      const el = handle?.element;
      if (!el) return "";
      const n = local(el.getBoundingClientRect());
      const mx = (h.right + n.left) / 2;
      return `M ${h.right},${h.midY} C ${mx},${h.midY} ${mx},${n.midY} ${n.left},${n.midY}`;
    }));
    // Return right paths (channel → hub) — mirrored control points
    setRightReturnPaths(rightRefs.current.map((handle) => {
      const el = handle?.element;
      if (!el) return "";
      const n = local(el.getBoundingClientRect());
      const mx = (h.right + n.left) / 2;
      return `M ${n.left},${n.midY} C ${mx},${n.midY} ${mx},${h.midY} ${h.right},${h.midY}`;
    }));

    // Vertical path: Hotel bottom-center → Foco card top-center (straight line)
    const hotelEl = hotelRef.current?.element;
    const focoEl = hubRef.current?.focoElement;
    if (hotelEl && focoEl) {
      const hotelRect = hotelEl.getBoundingClientRect();
      const focoRect = focoEl.getBoundingClientRect();
      const cx = focoRect.left - cRect.left + focoRect.width / 2;
      const sy = hotelRect.bottom - cRect.top;
      const ey = focoRect.top - cRect.top;
      setVerticalPath(`M ${cx},${sy} L ${cx},${ey}`);
      // Return: Foco → Hotel (same x, reversed direction)
      setVerticalReturnPath(`M ${cx},${ey} L ${cx},${sy}`);
    }

    setSvgDims({ width: cRect.width, height: cRect.height });
  }, []);

  useEffect(() => {
    const t = setTimeout(recalc, 220);
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [recalc]);

  // Fired when any return particle arrives at the hub.
  // Debounced: only one cascade per 800 ms window (multiple channels may arrive near-simultaneously).
  const handleReturnBatch = useCallback(() => {
    const now = Date.now();
    if (now - lastReturnBatchRef.current < 800) return;
    lastReturnBatchRef.current = now;

    // Flash the hub and spin the Foco logo
    hubRef.current?.triggerContact();
    hubRef.current?.triggerFocoContact();

    // Cascade: fire warm-white return particles to all left nodes (slight stagger)
    leftReturnPulseRefs.current.forEach((ref, i) => {
      setTimeout(() => ref?.fire(), i * 45);
    });
    // And send one back up to the Hotel card
    setTimeout(() => verticalReturnRef.current?.fire(), 30);
  }, []);

  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 55% at 50% 56%, rgba(30,58,138,0.16) 0%, transparent 70%)",
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] text-white/30 uppercase tracking-[0.22em] font-medium mb-5">
            Sincronização em Tempo Real
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#fff] mb-4 leading-tight">
            Conexão mais <span className="text-blue-500">premiada</span>{" "} do Brasil. Dados fluindo em <span className="text-blue-500">perfeita sincronia</span>{" "}
          </h2>
          <p className="text-gray-500 text-lg max-w-6xl mx-auto">
            Nosso Channel manager centraliza e sincroniza automaticamente todas as informações do seu hotel com os principais canais de venda.
          </p>
        </motion.div>

        {/* ── Desktop diagram ── */}
        <div ref={containerRef} className="relative hidden lg:block">

          {/* SVG: covers full container (Hotel area + horizontal flow) */}
          <svg aria-hidden="true" className="absolute inset-0 pointer-events-none"
            width={svgDims.width} height={svgDims.height} style={{ overflow: "visible" }}>

            {/* ── Outbound: Hotel → Foco (vertical) ── */}
            {verticalPath && (
              <ConnectionLine
                key="vertical"
                pathData={verticalPath}
                anim={VERTICAL_ANIM}
                onEmit={() => hotelRef.current?.triggerEmit()}
                onArrival={() => {
                  hubRef.current?.triggerFocoContact();
                  hubRef.current?.triggerContact();
                }}
              />
            )}

            {/* ── Outbound: left nodes → hub ── */}
            {leftPaths.map((d, i) => d && (
              <ConnectionLine key={`l${i}`} pathData={d} anim={LEFT_ANIM[i]}
                onArrival={() => hubRef.current?.triggerContact()} />
            ))}

            {/* ── Outbound: hub → right channels ── */}
            {rightPaths.map((d, i) => d && (
              <ConnectionLine key={`r${i}`} pathData={d} anim={RIGHT_ANIM[i]}
                onArrival={() => {
                  rightRefs.current[i]?.triggerContact();
                  // After 120 ms, fire the warm-white return particle from this channel back to hub
                  setTimeout(() => rightReturnPulseRefs.current[i]?.fire(), 120);
                }}
              />
            ))}

            {/* ── Return: right channels → hub (warm-white) ── */}
            {rightReturnPaths.map((d, i) => d && (
              <ReturnPulse
                key={`rr${i}`}
                ref={(handle) => { rightReturnPulseRefs.current[i] = handle; }}
                pathData={d}
                duration={RIGHT_RETURN_DUR[i]}
                onArrival={handleReturnBatch}
              />
            ))}

            {/* ── Return: hub → left nodes (warm-white) ── */}
            {leftReturnPaths.map((d, i) => d && (
              <ReturnPulse
                key={`lr${i}`}
                ref={(handle) => { leftReturnPulseRefs.current[i] = handle; }}
                pathData={d}
                duration={LEFT_RETURN_DUR[i]}
                onArrival={() => { /* particle arrival is the visual */ }}
              />
            ))}

            {/* ── Return: Foco → Hotel (vertical, warm-white) ── */}
            {verticalReturnPath && (
              <ReturnPulse
                key="vr"
                ref={verticalReturnRef}
                pathData={verticalReturnPath}
                duration={1.2}
                onArrival={() => hotelRef.current?.triggerEmit()}
              />
            )}
          </svg>

          {/* ── 3-column row: left | center (Hotel→Foco→Hub) | right ── */}
          {/* items-start so left/right align to the top of the center column.  */}
          {/* Left/right use mt-auto-ish offset to stay level with the Hub.     */}
          <div className="flex items-start justify-between gap-6">

            {/* Left — data sources (offset down past the Hotel+gap area) */}
            <div className="flex flex-col gap-2.5 z-10" style={{ paddingTop: 88 }}>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.18em] text-center mb-0.5">Entradas</p>
              {leftNodes.map((node, i) => (
                <SourcePill key={node.id} {...node} delay={i * 0.07}
                  ref={(el) => { leftRefs.current[i] = el; }} />
              ))}
            </div>

            {/* Center — flex-col items-center: Hotel above Foco/Hub (perfectly centered) */}
            <div className="flex flex-col items-center flex-shrink-0 z-10">
              {/* Hotel card */}
              <HotelCard ref={hotelRef} />
              {/* Gap: previous 39 px + 20% increase → 47 px.                     */}
              {/* Foco is absolutely offset top:-50 inside Hub, so the visible     */}
              {/* Hotel→Foco distance = this gap + hub_top_offset − 50.            */}
              <div style={{ height: 110 }} />
              {/* Hub — contains Foco at top:-50 as absolute overlay */}
              <Hub ref={hubRef} />
            </div>

            {/* Right — channel destinations (same offset as left) */}
            <div className="flex flex-col gap-2.5 z-10" style={{ paddingTop: 88 }}>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.18em] text-center mb-0.5">Canais</p>
              {rightNodes.map((node, i) => (
                <DestPill key={node.id} {...node} delay={i * 0.06 + 0.1}
                  ref={(handle) => { rightRefs.current[i] = handle; }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="lg:hidden flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="w-full">
            <div className="flex justify-center mb-5">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.025)" }}>
                <Building2 className="w-3.5 h-3.5 text-white/35" />
                <span className="text-[13px] text-white/45">Hotel</span>
              </div>
            </div>
            <p className="text-[9px] text-white/20 uppercase tracking-[0.18em] text-center mb-3">Entradas</p>
            <div className="grid grid-cols-2 gap-2">
              {leftNodes.map((n) => <MobilePill key={n.id} {...n} />)}
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-[5px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.div key={i} className="w-[3px] h-[3px] rounded-full bg-white/20"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 1.6, delay: i * 0.25, repeat: Infinity }} />
            ))}
          </div>

          {/* Mobile Hub (simplified) */}
          <div className="relative flex-shrink-0">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-2 mx-auto"
              style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(59,130,246,0.10)", backdropFilter: "blur(16px)", width: "fit-content" }}>
              <FocoLogo className="h-5 w-5" />
              <span className="text-[10px] text-white/50 uppercase tracking-[0.18em]">Foco</span>
            </div>
            <div className="flex flex-col items-center gap-3 px-8 py-5 rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)" }}>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.15)" }}>
                  <Zap className="w-3.5 h-3.5 text-blue-300/65" />
                </div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <RefreshCw className="w-3 h-3 text-white/30" />
                </motion.div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(14,165,233,0.12)" }}>
                  <ArrowLeftRight className="w-3.5 h-3.5 text-sky-300/60" />
                </div>
              </div>
              <span className="text-[9px] text-white/25 uppercase tracking-[0.15em]">Channel Manager</span>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ border: "1px solid rgba(74,222,128,0.12)" }}>
                <motion.div className="w-1 h-1 rounded-full bg-green-400/70"
                  animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} />
                <span className="text-[9px] text-green-400/55 uppercase tracking-[0.15em]">Ao vivo</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.div key={i} className="w-[3px] h-[3px] rounded-full bg-white/20"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 1.6, delay: i * 0.25 + 0.4, repeat: Infinity }} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.12 }} className="w-full">
            <p className="text-[9px] text-white/20 uppercase tracking-[0.18em] text-center mb-3">Canais</p>
            <div className="grid grid-cols-2 gap-2">
              {rightNodes.map((n) => <MobilePill key={n.id} {...n} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
