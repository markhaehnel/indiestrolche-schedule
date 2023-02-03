const delay = (delayMS: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMS));

export default delay;
