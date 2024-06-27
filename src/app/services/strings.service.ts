const INITIAL_POSITION = 0
const NEXT_POSIOTION = 1
const SLICE_FROM = 1

export const capitalize = ({ word }: { word: string }) =>
  `${word.substring(INITIAL_POSITION, NEXT_POSIOTION).toUpperCase()}${word.substring(SLICE_FROM)}`;
