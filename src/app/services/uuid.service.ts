const UUID_TEMPLATE = "10000000-1000-4000-8000-100000000000";
const REGEX_REPLACING = /[018]/g; // Regular expression to match any of the characters '0', '1', or '8'
const UINT8ARRAY_LENGTH = 1;
const UINT8ARRAY_POSITION = 0;
const HEXADECIMAL = 16
const MASK_OF_BITS = 15
const LEN_OF_BITS = 4

export function uuidv4() {
  return UUID_TEMPLATE.replace(
    REGEX_REPLACING,
    c => {
      // Generate a random byte
      const randomByte = crypto.getRandomValues(new Uint8Array(UINT8ARRAY_LENGTH))[UINT8ARRAY_POSITION];
      // Mask to get the last 4 bits of the random byte
      const randomHex = randomByte & MASK_OF_BITS;
      // Bitwise shift based on the character value divided by 4
      const shiftValue = randomHex >> +c / LEN_OF_BITS;
      // Bitwise XOR with the numeric value of the character
      const xorValue = +c ^ shiftValue;
      // Convert the result to a hexadecimal string
      return xorValue.toString(HEXADECIMAL);
    }
  );
}
