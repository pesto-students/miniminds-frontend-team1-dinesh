import { useEffect, useState, useRef } from "react";
import Card from "@/components/Card";
import { useLocalStorage } from "usehooks-ts";

const uniqueElementsArray = [
  {
    type: "Pikachu",
    image: `https://res.cloudinary.com/dh687c0pq/image/upload/v1678273563/Pikachu_zni4d0.webp`,
  },
  {
    type: "ButterFree",
    image:
      "https://res.cloudinary.com/dh687c0pq/image/upload/v1678273581/Butterfree_ewpl9v.png",
  },
  {
    type: "Charmander",
    image:
      "https://res.cloudinary.com/dh687c0pq/image/upload/v1678273542/charmander_hrspkv.png",
  },
  {
    type: "Squirtle",
    image:
      "https://res.cloudinary.com/dh687c0pq/image/upload/v1678273591/squirtle_z8gwkd.png",
  },
  {
    type: "Pidgetto",
    image:
      "https://res.cloudinary.com/dh687c0pq/image/upload/v1678273597/pidgeotto_i9qbwf.png",
  },
  {
    type: "Bulbasaur",
    image:
      "https://res.cloudinary.com/dh687c0pq/image/upload/v1678273533/Bulbasaur_lbrit5.png",
  },
];

function shuffleCards(array: any[]) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
export default function JoinPage() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
  );
  const [openCards, setOpenCards] = useState<any[]>([]);
  const [clearedCards, setClearedCards] = useState<any>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useLocalStorage(
    "bestScore",
    Number.POSITIVE_INFINITY
  );
  const timeout: any = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
      setShowModal(true);
      const highScore: number = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore.toString());
    }
  };
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev: any) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index: number) => {
    console.log({ openCards });

    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
    console.log({ clearedCards });
  };

  useEffect(() => {
    let timeout: any = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index: any) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: any) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
  };

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <div className="md:h-screen my-8 md:my-0 w-full overflow-y-scroll overflow-x-hidden flex justify-center items-center flex-col">
      <header>
        <h3 className="my-4 text-lg text-center">Play the Flip card game</h3>
        <div className="mt-2 mb-6 text-center">
          Select two cards with same content consequtively to make them vanish
        </div>
      </header>
      <div className="border mx-4 border-gray-600 rounded-lg  p-3 shadow-md grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer className="mt-4 border border-gray-600 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex gap-4">
          <div className="font-bold text-lg">
            <span className="text-base font-semibold">Moves:</span> {moves}
          </div>
          {bestScore && (
            <div className="font-bold text-lg">
              <span className="text-base font-semibold">Best Score:</span>{" "}
              {bestScore}
            </div>
          )}
        </div>
        {/* <div className="restart">
          <button onClick={handleRestart}>Restart</button>
        </div> */}
      </footer>
      {/* <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hurray!!! You completed the challenge
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game in {moves} moves. Your best score is{" "}
            {bestScore} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
