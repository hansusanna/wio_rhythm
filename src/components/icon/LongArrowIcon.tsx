// components/icons/LongArrowIcon.tsx
import React from 'react';
interface IconProps {
  color?: string;
  className?: string;
}

const LongArrowIcon: React.FC<IconProps> = ({
  color = 'currentColor',
  className,
}) => {
  return (
    <svg
      viewBox="0 0 145 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M113.511 0.792131C113.902 0.0618815 114.811 -0.213061 115.542 0.177873L143.875 15.3439C144.362 15.6049 144.667 16.114 144.667 16.6671C144.667 17.2202 144.362 17.7284 143.875 17.9894L115.542 33.1564C114.811 33.5473 113.902 33.2715 113.511 32.5412C113.12 31.8108 113.395 30.9018 114.126 30.5109L139.987 16.6662L114.126 2.8224C113.395 2.43139 113.12 1.52245 113.511 0.792131Z"
        fill={color}
      />
      <path
        d="M143.167 15.1667C143.995 15.1669 144.667 15.8384 144.667 16.6667C144.667 17.4951 143.995 18.1666 143.167 18.1667H1.5C0.671573 18.1667 0 17.4952 0 16.6667C0 15.8383 0.671573 15.1667 1.5 15.1667H143.167Z"
        fill={color}
      />
    </svg>
  );
};

export default LongArrowIcon;
