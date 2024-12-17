// Utility to generate dates for a given month and year
export const generateMonthDates = (year, month) => {
    const dates = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      dates.push({
        dayOfWeek: date.getDay(), // Day of the week (0 = Sun, 6 = Sat)
        date: day, // Actual date
        fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD format
      });
    }
  
    return dates;
  };
  