import { toPng } from 'html-to-image';

export interface DownloadPassOptions {
  passElement: HTMLElement;
  studentName?: string;
  targetWidth?: number;
  targetHeight?: number;
}

export interface DownloadResult {
  success: boolean;
  dataUrl?: string;
  fileName?: string;
  file?: File;
  error?: string;
  isMobileSaveRequired?: boolean;
}

export const sanitizeFileName = (name: string): string => {
  const clean = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return clean || 'ATTENDEE';
};

/**
 * Renders the attendee pass element to a high-resolution 1080x1440 PNG dataUrl
 * without triggering an anchor download.
 */
export const renderPassToDataUrl = async (
  passElement: HTMLElement,
  targetWidth = 1080,
  targetHeight = 1440
): Promise<string> => {
  if (!passElement) {
    throw new Error('Pass element reference not found.');
  }

  // 1. Wait for document fonts to be fully rendered
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  // 2. Wait for all images inside the pass element to complete loading
  const images = Array.from(passElement.querySelectorAll('img'));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
    )
  );

  // 3. Calculate appropriate scale/pixelRatio to hit exact 1080x1440 resolution
  const currentWidth = passElement.offsetWidth || 540;
  const computedPixelRatio = Math.max(2, targetWidth / currentWidth);

  // 4. Generate high-resolution PNG using html-to-image
  return await toPng(passElement, {
    canvasWidth: targetWidth,
    canvasHeight: targetHeight,
    pixelRatio: computedPixelRatio,
    quality: 1,
    backgroundColor: '#161C25',
    cacheBust: false,
    style: {
      borderRadius: '0px',
      margin: '0',
    },
  });
};

/**
 * Converts a PNG dataUrl to a standard File object.
 */
export const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

/**
 * Triggers an anchor download for the specified dataUrl.
 */
export const triggerFileDownload = (dataUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Master download function: renders high-res PNG and triggers direct file download.
 */
export const downloadGenesisPass = async ({
  passElement,
  studentName = 'AYUSH_KUMAR',
  targetWidth = 1080,
  targetHeight = 1440,
}: DownloadPassOptions): Promise<DownloadResult> => {
  if (!passElement) {
    return { success: false, error: 'Experience Card element reference not found.' };
  }

  try {
    const dataUrl = await renderPassToDataUrl(passElement, targetWidth, targetHeight);
    const safeName = sanitizeFileName(studentName);
    const fileName = `GENESIS_EXPERIENCE_CARD_${safeName}.png`;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Trigger download
    triggerFileDownload(dataUrl, fileName);

    return {
      success: true,
      dataUrl,
      fileName,
      isMobileSaveRequired: isIOS,
    };
  } catch (err) {
    console.error('Failed to export GENESIS Experience Card PNG:', err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while rendering the Experience Card.',
    };
  }
};
