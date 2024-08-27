import { useState, useEffect } from "react";
import ThmButton from "../button";
import Header from "../header";

const IntroductionScreen = ({ next }: { next: () => void }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [animationTimeout, setAnimationTimeout] = useState<number | undefined>(
    undefined
  );
  const [isVisible, setIsVisible] = useState(false);

  const fadeAnimation = () => {
    setIsHeaderVisible(!isHeaderVisible);

    if (animationTimeout !== undefined) {
      clearTimeout(animationTimeout);
    }

    const newAnimationTimeout = window.setTimeout(() => {
      next();
    }, 600);

    setAnimationTimeout(newAnimationTimeout);
  };

  useEffect(() => {
    // Delay the appearance of the content to create an animation effect
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  return (
    <div className={`${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Header isVisible={isHeaderVisible} />
      <div
        className={`transform ${
          isVisible ? "scale-1" : "scale-0"
        } transition-transform duration-1000 `}
      >
        {
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <div className="flex mt-10 justify-center">
              <img
                src="https://assets.tryhackme.com/img/logo/tryhackme_logo_full.svg"
                alt="logo"
                className="w-[180px]"
              />
            </div>

            <div className="mt-10 flex items-center justify-center md:w-[40rem]">
              <div className="w-[90%] m-auto flex flex-col items-center justify-center">
                <h2 className="font-bold text-center text-2xl mb-2">
                  Welcome to the Introduction to Incident Response and
                  Management Challenge 3 Game!
                </h2>
                <ul>
                  <li className="list-disc mt-2">
                    🚀 Mission: Survive for 1 intense minute.
                  </li>
                  <li className="list-disc mt-2">
                    🏆 Strategy: Duck or jump by holding the up or down key.
                  </li>
                  <li className="list-disc mt-2">
                    ❌ Obstacles: Avoid obstacles to avoid score penalty.
                  </li>
                  <li className="list-disc mt-2">
                    💡 Clues: Collect clues for high scores.
                  </li>
                  <li className="list-disc mt-2">
                    ⏰ Time is ticking! Please make sure your score is positive
                    to get the flag.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 w-[10rem]  md:w-[15rem] lg:w-[20rem]">
              <ThmButton onClick={fadeAnimation}>Start</ThmButton>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default IntroductionScreen;
