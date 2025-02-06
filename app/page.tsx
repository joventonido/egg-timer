import EggTimer from "../components/EggTimer";
import OptionBoxes from "../components/OptionBoxes";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Choose Your Egg</h1>
      <OptionBoxes />
    </div>
  );
}

// 5 minutes: set white and runny yolk – just right for dipping into.
// 6 minutes: liquid yolk – a little less oozy.
// 7 minutes: almost set – deliciously sticky.
// 8 minutes: softly set – this is what you want to make Scotch eggs.
// 10 minutes: the classic hard-boiled egg – mashable but not dry and chalky.
