import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const SmoothScrollLink = ({ to, spy, smooth, offset, duration, delay, easing, children }) => {
  return (
    <Link
      activeClass="active"
      to={to}
      spy={spy}
      smooth={smooth}
      offset={offset}
      duration={duration}
      delay={delay}
      isDynamic={true}
      hashSpy={true}
      easing={easing || 'easeInOutQuart'}
    >
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
