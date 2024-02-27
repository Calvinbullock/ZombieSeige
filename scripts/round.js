class Round {
  constructor(speed_m, count_m, damage_m) {
    this.speed_m = speed_m;
    this.count_m = count_m;
    this.damage_m = damage_m;
    this.current_round = 0;
  }

  newRound(Zombie) {
    this.current_round++;
    // Additional logic for starting a new round can be added here

    // check if any entity has hit points remaining
    const zombiesWithHP = Zombie.filter(Zombie => Zombie.hitPoints > 0);

    if (zombiesWithHP.length === 0)
    {
      console.log("All Zombies Slaughtered, but the smell of blood brings in more!");
      return true;
    }

    if (Zombie.length === 0)
    {
      console.log("All Zombies Slaughtered, but the smell of blood brings in more!");
      return true;
    }
    // If neither conditon met, return false to indicate no new round yet.
    return false;
  }
}

class Zombie
{
  constructor(hitPoints)
  {
    this.hitPoints = hitPoints;
  }
}

const Zombies =

[
  new Zombies(50),
  new Zombies(30),
  new Zombies(10)
];

const round = new Round(100, Zombies.lenght, 20);
let roundOver = round.newRound(Zombies);
if (roundOver)
{
  newRound();
}
else
{
  return false;
}