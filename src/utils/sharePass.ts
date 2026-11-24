export interface CaptionConfig {
  studentName: string;
  collegeName?: string;
  eventDate?: string;
  eventVenue?: string;
}

/**
 * Returns the official personalized LinkedIn caption.
 */
export const getLinkedInCaption = (studentName?: string): string => {
  const cleanName = studentName && studentName.trim() && studentName.trim().toUpperCase() !== 'ATTENDEE'
    ? studentName.trim()
    : '';

  const nameLine = cleanName
    ? `I'm ${cleanName}, and I'm excited to be part of GENESIS 2026 – Discover AWS. Unlock the Cloud!`
    : `I'm excited to be part of GENESIS 2026 – Discover AWS. Unlock the Cloud!`;

  return `${nameLine}

My GENESIS Experience Card is ready! Looking forward to exploring cloud technology, connecting with fellow tech enthusiasts, and celebrating this experience at KCC Institute of Technology & Management, Greater Noida.

Let's make GENESIS 2026 unforgettable!

Follow AWS Student Builder Group – KCC ITM:
https://www.linkedin.com/company/aws-sbg-kcc

#GENESIS2026 #AWSSBG #KCCITM #AWS #CloudComputing #AWSCommunity #TechCommunity`;
};

/**
 * Returns the official personalized Instagram caption.
 */
export const getInstagramCaption = (studentName?: string): string => {
  const cleanName = studentName && studentName.trim() && studentName.trim().toUpperCase() !== 'ATTENDEE'
    ? studentName.trim()
    : '';

  const nameLine = cleanName
    ? `I'm ${cleanName}, and I'm excited to be part of GENESIS 2026! 🚀`
    : `I'm excited to be part of GENESIS 2026! 🚀`;

  return `${nameLine}

My GENESIS Experience Card is ready. Looking forward to an amazing experience exploring AWS, cloud technology and innovation at KCC ITM, Greater Noida.

Let's celebrate GENESIS 2026 together!

Follow our community:
@aws.sbg.kccitm

AWS Student Builder Group – KCC ITM

#GENESIS2026 #AWSSBG #KCCITM #AWS #CloudComputing #AWSCommunity #TechCommunity`;
};

/**
 * General fallback default caption
 */
export const getDefaultGenesisCaption = (studentName?: string): string => {
  return getLinkedInCaption(studentName);
};

/**
 * Copies plain text to clipboard across modern and legacy browser contexts.
 * Returns true on success, false if permission denied or unavailable.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for non-secure contexts or older browser environments
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.warn('Clipboard write permission denied or unavailable:', err);
    return false;
  }
};

/**
 * Converts a PNG dataUrl string to a standard File object with 1080x1440 image integrity.
 */
export const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

/**
 * Official social platform URLs
 */
export const LINKEDIN_FEED_URL = 'https://www.linkedin.com/feed/';
export const INSTAGRAM_WEB_URL = 'https://www.instagram.com/';
export const LINKEDIN_COMPANY_URL = 'https://www.linkedin.com/company/aws-sbg-kcc';

/**
 * Checks whether the browser and device support native file sharing.
 */
export const canShareFiles = (file?: File): boolean => {
  if (
    typeof navigator !== 'undefined' &&
    'canShare' in navigator &&
    typeof navigator.canShare === 'function' &&
    'share' in navigator
  ) {
    try {
      if (file) {
        return navigator.canShare({ files: [file] });
      }
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

/**
 * Invokes native file sharing if supported by browser/device.
 * Returns true if shared successfully, false if unsupported or cancelled.
 */
export const shareNativeDevice = async ({
  file,
  title = 'GENESIS 2026',
  text,
}: {
  file: File;
  title?: string;
  text: string;
}): Promise<boolean> => {
  if (typeof navigator !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function') {
    try {
      if (canShareFiles(file)) {
        await navigator.share({
          title,
          text,
          files: [file],
        });
        return true;
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.warn('Native file sharing was not completed:', err);
      }
      return false;
    }
  }
  return false;
};
