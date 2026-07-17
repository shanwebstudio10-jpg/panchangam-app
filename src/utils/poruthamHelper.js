/**
 * தார பலம் — நட்சத்திர பொருத்தம்
 * முன்னோக்கி எண்ணிக்கை 9-ஆல் வகுத்தால் எஞ்சியது 3, 5, 7 ஆக இருந்தால் அசுபம்
 */
export function taraBalam(boyIdx, girlIdx) {
  const countForward = (a, b) => ((b - a + 27) % 27) + 1

  const c1 = countForward(boyIdx, girlIdx)   // பையன் → பெண்
  const c2 = countForward(girlIdx, boyIdx)   // பெண் → பையன்

  const badRemainders = [3, 5, 7]
  const good = !badRemainders.includes(c1 % 9) && !badRemainders.includes(c2 % 9)

  return { c1, c2, good }
}