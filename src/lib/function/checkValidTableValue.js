export function checkValidTableValue(value) {
  /*
    - 0번 테이블,
    - 숫자가 아닌 값,
    - 글자가 들어간 숫자값(진수)
  */
  const isNotValide =
    parseInt(value) === 0 ||
    parseInt(value) === 'NaN' ||
    /[a-z]/i.test(value);

  return isNotValide;
}