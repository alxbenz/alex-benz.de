const scrollingOptions = {
  selector: '.section',
  currentScrollTop: window.pageYOffset || document.documentElement.scrollTop,
  currentSection: 0
};

export const scrollingHandler = event => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const oldScrollTop = scrollingOptions.currentScrollTop;
  const bottomOfViewport = window.pageYOffset + window.innerHeight;
  const middleOfViewport = window.pageYOffset + window.innerHeight / 2;
  const topOfViewport = scrollTop;
  const sections = getSections();

  // scrolling up
  if (scrollTop > oldScrollTop) {
    if (
      bottomOfViewport >= sections[scrollingOptions.currentSection].offsetBottom
    ) {
      scrollingOptions.currentSection === sections.length - 1
        ? ''
        : scrollingOptions.currentSection++;
    }
  }

  // scrolling down
  if (scrollTop < oldScrollTop) {
    if (topOfViewport <= sections[scrollingOptions.currentSection].offsetTop) {
      scrollingOptions.currentSection === 0
        ? ''
        : scrollingOptions.currentSection--;
    }
  }

  // get most visible section
  sections.map(section => {
    if (
      middleOfViewport < section.offsetBottom &&
      middleOfViewport > section.offsetTop
    ) {
      const viewportEvent = new Event('inViewport');
      section.element.dispatchEvent(viewportEvent);
    }
  });

  scrollingOptions.currentScrollTop = scrollTop;
};

const getSections = () => {
  const sectionEls = document.querySelectorAll(scrollingOptions.selector);
  const sectionArray = Array.from(sectionEls).map(sectionEl => {
    return getSectionOffset(sectionEl);
  });

  return sectionArray;
};

export const getSectionOffset = sectionEl => {
  const bodyRect = document.body.getBoundingClientRect();
  const sectionRect = sectionEl.getBoundingClientRect();
  const offsetTop = sectionRect.top - bodyRect.top;
  const offsetBottom = sectionRect.bottom - bodyRect.top;

  return {
    offsetTop,
    offsetBottom,
    element: sectionEl
  };
};

export const scrollTo = (to, duration) => {
  const element = document.scrollingElement || document.documentElement;
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };
  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(
      easeInOutQuad(currentTime, start, change, duration)
    );
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};
