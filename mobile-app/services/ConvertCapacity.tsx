const getTableCapacityFromSelectedSeats = (capacity: number) => {
  switch (capacity) {
    case 1:
    case 2:
      return 2;
    case 3:
    case 4:
      return 4;
    case 5:
    case 6:
      return 6;
    case 7:
    case 8:
      return 8;
    default:
      return;
  }
};

export default getTableCapacityFromSelectedSeats;
