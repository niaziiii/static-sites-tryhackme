import { useState, useEffect } from "react";
import ThmButton from "../../button";
import Header from "../../header";
import { FaShieldAlt } from "react-icons/fa";

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

            <div className="flex items-center justify-center gap-4 mt-10 text-2xl text-green">
              <FaShieldAlt />
              <h2 className="font-bold">Incident Lifecycle Game</h2>
              <FaShieldAlt />
            </div>
            <div className="mt-10 flex items-center justify-center md:w-[40rem]">
              <div className="w-[90%] m-auto">
                <h2 className="font-bold text-2xl mb-2">
                  Welcome to the Incident Lifecycle Game!
                </h2>
                <ul>
                  <li className="list-disc mt-2">
                    Your mission is to navigate through various phases of the
                    incident.
                  </li>
                  <li className="list-disc mt-2">
                    Make strategic choices to minimize damage to the estate and
                    reputation.
                  </li>
                  <li className="list-disc mt-2">
                    Remember, you have a limited credit for each phase, so
                    choose wisely to optimize your score!
                  </li>
                  <li className="list-disc mt-2">
                  Make sure to think about the options before selecting! Once you select, you will not be able to make changes!
                  </li>
                  <li className="list-disc mt-2">
                  Based on the incident, damage will be added to your estate and reputation. Pick the correct actions to minimize your estate damage and choose communication strategies to minimize reputation damage.
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
