class Round 
{
    constructor(speed_m, count_m, damage_m) 
    {
      this.speed_m = speed_m;
      this.count_m = count_m;
      this.damage_m = damage_m;
      this.current_round = 0;
    }
  
    newRound() {
      this.current_round++;
      // Additional logic for starting a new round can be added here
    }
}
