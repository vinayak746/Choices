export const allMBTITypes = [
  "INFJ",
  "ENFP",
  "INTP",
  "ENTP",
  "ISFJ",
  "ESFJ",
  "ISTJ",
  "ESTJ",
  "INFP",
  "ENFJ",
  "INTJ",
  "ENTJ",
  "ISFP",
  "ESFP",
  "ISTP",
  "ESTP",
];

export function validateMBTI(type) {
  return allMBTITypes.includes(type);
}
