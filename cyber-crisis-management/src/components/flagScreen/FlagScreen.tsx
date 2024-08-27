import { useState, useEffect } from "react";
import CopyingFlag from "../popup/CopyingFlag";
import DamageShow from "../damage/DamageShow";
import { useGameContext } from "../../context/context";

const FlagScreen = () => {
  const { state } = useGameContext();
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (state.estateDamage < 50 && state.reputationDamage < 50) {
      setIsGameWon(true);
    }
  }, []);

  const rough = atob("VEhNe1RoZS5DcmlzaXMuaGFzLmJlZW4ubWFuYWdlZCF9");

  return (
    <>
      {
        <DamageShow
          children={isGameWon ? <CopyingFlag message={rough} /> : <></>}
          isGameWon={isGameWon}
        />
      }
    </>
  );
};

export default FlagScreen;
