function getDayOfWeek(day) {
  switch (day) {
    case "Sunday":
      return [0];
    case "Monday":
      return [1];
    case "Tuesday":
      return [2];
    case "Wednesday":
      return [3];
    case "Thursday":
      return [4];
    case "Friday":
      return [5];
    case "Saturday":
      return [6];
    case "Week_days":
      return [1, 2, 3, 4, 5];
    case "Weekend_days":
      return [6, 0];
    case "All_days":
      return [0, 1, 2, 3, 4, 5, 6];

    default:
      throw new Error(`Unknown day: ${day}`);
  }
}

module.exports = {
  getDayOfWeek,
};
