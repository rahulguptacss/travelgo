import React from 'react';
import type { SocialIconProps } from '../types';

export default function SocialIcon({
  icon,
  className = 'h-4 w-4',
}: SocialIconProps) {
  switch (icon.toLowerCase()) {
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm7 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.9C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.37C9.37 7.37 9.11 7.43 8.89 7.67C8.67 7.91 8.05 8.49 8.05 9.68C8.05 10.87 8.92 12.01 9.04 12.17C9.16 12.33 10.74 14.77 13.16 15.82C13.74 16.07 14.19 16.22 14.54 16.33C15.12 16.51 15.65 16.49 16.07 16.43C16.54 16.36 17.51 15.84 17.71 15.27C17.92 14.7 17.92 14.22 17.85 14.11C17.79 14 17.63 13.94 17.39 13.82C17.15 13.7 15.98 13.12 15.76 13.04C15.54 12.96 15.38 12.92 15.22 13.16C15.06 13.4 14.6 13.94 14.46 14.11C14.32 14.27 14.18 14.29 13.94 14.17C13.7 14.05 12.93 13.8 12.01 12.98C11.3 12.34 10.82 11.55 10.7 11.31C10.58 11.07 10.69 10.94 10.81 10.82C10.92 10.71 11.05 10.54 11.17 10.4C11.29 10.26 11.33 10.16 11.41 10C11.49 9.84 11.45 9.7 11.39 9.58C11.33 9.46 10.87 8.33 10.68 7.86C10.49 7.41 10.3 7.47 10.15 7.46C10.02 7.46 9.86 7.45 9.7 7.45L9.53 7.37Z" />
        </svg>
      );
    default:
      return null;
  }
}
