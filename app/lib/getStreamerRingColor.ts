const getStreamerRingColor = (streamerName: string): string => {
  switch (streamerName.toLowerCase()) {
    case "marcusbmr": {
      return "ring-green-600";
    }
    case "utzstauder": {
      return "ring-amber-500";
    }
    case "internetshawna": {
      return "ring-red-700";
    }
    default: {
      return "ring-base-100";
    }
  }
};

export { getStreamerRingColor };
