/**
 * Converts display format (e.g., 1.2K, 2M) to raw number
 *
 * @param {string|number} display - The display format to parse
 * @returns {number} - The raw number value
 */
export const parseDisplayFormat = (display) => {
  if (typeof display === 'number') return display;
  const value = display.toString();
  const num = parseFloat(value.replace(/[^\d.]/g, ''));
  if (value.endsWith('M')) return num * 1000000;
  if (value.endsWith('K')) return num * 1000;
  return num;
};

/**
 * Converts raw number to display format (e.g., 1.2K, 2M)
 *
 * @param {number} number - The raw number to format
 * @returns {string} - The formatted display value
 */
export const toDisplayFormat = (number) => {
  if (number >= 1000000) {
    const millions = Math.floor(number / 100000) / 10;
    return millions.toFixed(1).replace('.0', '') + 'M';
  }
  if (number >= 1000) {
    return `${Math.floor(number/1000)}K`;
  }
  return number.toString();
};

/**
 * Alternative formatting function with better precision
 *
 * @param {number|string} number - The number to format
 * @returns {string} - The formatted display value
 */
export const formatNumber = (number) => {
  // Si le nombre est déjà formaté (contient K ou M), on le retourne tel quel
  if (typeof number === 'string' && (number.includes('K') || number.includes('M'))) {
    return number;
  }

  // Convertir en nombre si c'est une chaîne
  const num = typeof number === 'string' ? parseInt(number.replace(/[^0-9]/g, '')) : number;

  if (isNaN(num) || num < 0) return '0';

  if (num >= 1000000) {
    const millions = num / 1000000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  } else if (num >= 1000) {
    const thousands = num / 1000;
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
  }

  return num.toString();
};

/**
 * Parse formatted number back to raw number
 *
 * @param {string|number} formattedNumber - The formatted number
 * @returns {number} - The raw number
 */
export const parseNumber = (formattedNumber) => {
  if (typeof formattedNumber === 'number') return formattedNumber;

  const str = formattedNumber.toString().toLowerCase();
  const numPart = parseFloat(str);

  if (str.includes('m')) {
    return Math.floor(numPart * 1000000);
  } else if (str.includes('k')) {
    return Math.floor(numPart * 1000);
  }

  return parseInt(str) || 0;
};

/**
 * Gets the appropriate image source object based on type
 *
 * @param {number|string|object} source - The source to convert
 * @returns {number|object} - Formatted source ready for Image component
 */
export const getImageSource = (source) => {
  // If it's a number (require local)
  if (typeof source === 'number') {
    return source;
  }
  // If it's already a source object
  if (source && typeof source === 'object' && source.uri) {
    return source;
  }
  // If it's a string (URL)
  if (typeof source === 'string') {
    return { uri: source };
  }
  // Default value if no valid format
  return require('../../../../assets/default.png');
};

/**
 * Determines if a media source is a video file
 *
 * @param {string|object} mediaSource - The media source to check
 * @returns {boolean} - True if it's a video, false otherwise
 */
export const isVideoFile = (mediaSource) => {
  if (!mediaSource) return false;

  // Si c'est une string, vérifier l'extension
  if (typeof mediaSource === 'string') {
    const lowerSource = mediaSource.toLowerCase();
    return lowerSource.includes('.mp4') ||
        lowerSource.includes('.mov') ||
        lowerSource.includes('.avi') ||
        lowerSource.includes('.mkv') ||
        lowerSource.includes('.webm') ||
        lowerSource.includes('.m4v') ||
        lowerSource.includes('video');
  }

  // Si c'est un objet avec une propriété type
  if (typeof mediaSource === 'object') {
    return mediaSource.type === 'video' ||
        mediaSource.mimeType?.startsWith('video/') ||
        (mediaSource.uri && isVideoFile(mediaSource.uri));
  }

  return false;
};

/**
 * Gets media type from source
 *
 * @param {string|object} mediaSource - The media source
 * @returns {string} - 'video' or 'image'
 */
export const getMediaType = (mediaSource) => {
  return isVideoFile(mediaSource) ? 'video' : 'image';
};

/**
 * Formats media object for posting
 *
 * @param {object} media - The media object from camera/gallery
 * @returns {object} - Formatted media object
 */
export const formatMediaForPost = (media) => {
  if (!media) return null;

  return {
    uri: media.uri,
    type: media.type || getMediaType(media.uri),
    mimeType: media.mimeType || (isVideoFile(media.uri) ? 'video/mp4' : 'image/jpeg'),
    width: media.width,
    height: media.height,
    duration: media.duration // Pour les vidéos
  };
};