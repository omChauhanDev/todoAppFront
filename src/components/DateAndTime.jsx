const DateAndTime = ({ currentDateTime }) => {
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const getFormattedDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[currentDateTime.getDay()];
    const date = currentDateTime.getDate();
    const month = months[currentDateTime.getMonth()];

    return `${day}, ${date}${getOrdinalSuffix(date)} ${month}`;
  };

  const getFormattedTime = () => {
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const formattedHours = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  return (
    <div className='flex w-full items-center justify-between text-white mb-2'>
      <h3 className='text-xl md:text-2xl'>{getFormattedDate()}</h3>
      <h3 className='text-xl md:text-2xl'>{getFormattedTime()}</h3>
    </div>
  );
};

export default DateAndTime;
