export const createRing = (element, id) => {
  const options = {
    container: element.getAttribute('container') || '.section',
    stroke: element.getAttribute('stroke') || 8,
    radius: element.getAttribute('radius') || 60,
    percentage: element.getAttribute('percentage') || 100,
    title: element.getAttribute('title'),
    durationInMs: element.getAttribute('durationInMs') || 1000,
    delayInMs: element.getAttribute('delayInMs') || 0
  };

  options.normalizedRadius = options.radius - options.stroke * 2;
  options.circumference = options.normalizedRadius * 2 * Math.PI;

  element.innerHTML = `
  <div id="${id}">
    <p class="progressRing__title">${options.title}</p>
    <p class="progressRing__percentage"></p>
    <svg
        height="${options.radius * 2}"
        width="${options.radius * 2}"
    >
        <circle
        stroke-dasharray="${options.circumference} ${options.circumference}"
        style="stroke-dashoffset:${options.circumference}"
        stroke-width="${options.stroke}"
        r="${options.normalizedRadius}"
        cx="${options.radius}"
        cy="${options.radius}"
        />
    </svg>
  </div>
  <style>
    #${id} circle {
      transition: stroke-dashoffset ${options.durationInMs}ms ease-in ${
    options.delayInMs
  }ms;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  </style>
`;

  const listener = e => {
    element
      .closest(options.container)
      .removeEventListener('inViewport', listener);
    setProgress(element, options);
  };

  element.closest(options.container).addEventListener('inViewport', listener);
};

export const setProgress = (element, options) => {
  const offset =
    options.circumference - (options.percentage / 100) * options.circumference;
  const circleEl = element.querySelector('circle');
  const percentageEl = element.querySelector('.progressRing__percentage');
  const intervalDuration = Math.round(
    options.durationInMs / options.percentage
  );
  let currentPercentage = 0;

  window.setTimeout(() => {
    let interval = setInterval(() => {
      percentageEl.innerHTML = currentPercentage;
      currentPercentage++;
      if (currentPercentage > options.percentage) {
        clearInterval(interval);
      }
    }, intervalDuration);
  }, options.delayInMs);

  circleEl.style.strokeDashoffset = offset;
};
